import { useState, useMemo } from "react";
import { Link } from "@remix-run/react";
import { PRODUCT_TYPES, BUDGET_RANGES, MAKE_WEBHOOK_URL } from "~/consts";
import { Checkbox } from "~/components/ui/checkbox";
import Button from "~/components/atoms/Button";
import { useLanguage } from "~/contexts/LanguageContext";

interface FormData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  productType: string;
  productTypeOther: string;
  budgetRange: string;
  projectDescription: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
}

interface FieldErrors {
  companyName?: string;
  contactName?: string;
  email?: string;
  phone?: string;
  productType?: string;
  budgetRange?: string;
}

export function LeadForm() {
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    productType: "",
    productTypeOther: "",
    budgetRange: "",
    projectDescription: "",
    acceptTerms: false,
    acceptPrivacy: false,
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\d\s\-+()]{6,}$/;
    return phoneRegex.test(phone);
  };

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'companyName':
        return value.trim() ? undefined : t("form.errorCompanyName");
      case 'contactName':
        return value.trim() ? undefined : t("form.errorContactName");
      case 'email':
        return validateEmail(value) ? undefined : t("form.errorEmail");
      case 'phone':
        return validatePhone(value) ? undefined : t("form.errorPhone");
      case 'productType':
        return value ? undefined : t("form.errorProductType");
      case 'budgetRange':
        return value ? undefined : t("form.errorBudgetRange");
      default:
        return undefined;
    }
  };

  const validateAllFields = (): boolean => {
    const errors: FieldErrors = {};
    
    const companyError = validateField('companyName', formData.companyName);
    if (companyError) errors.companyName = companyError;
    
    const contactError = validateField('contactName', formData.contactName);
    if (contactError) errors.contactName = contactError;
    
    const emailError = validateField('email', formData.email);
    if (emailError) errors.email = emailError;
    
    const phoneError = validateField('phone', formData.phone);
    if (phoneError) errors.phone = phoneError;
    
    const productError = validateField('productType', formData.productType);
    if (productError) errors.productType = productError;
    
    const budgetError = validateField('budgetRange', formData.budgetRange);
    if (budgetError) errors.budgetRange = budgetError;
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setFieldErrors(prev => ({ ...prev, [name]: error }));
  };

  const estimatedBudget = useMemo(() => {
    if (!formData.productType || !formData.budgetRange) return null;
    
    const productType = PRODUCT_TYPES.find(p => p.value === formData.productType);
    const budgetRange = BUDGET_RANGES.find(b => b.value === formData.budgetRange);
    
    if (!productType || !budgetRange) return null;
    
    return Math.round(budgetRange.baseAmount * productType.budgetMultiplier);
  }, [formData.productType, formData.budgetRange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: keyof FormData) => (checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validate all fields
    if (!validateAllFields()) {
      return;
    }
    
    if (!formData.acceptTerms || !formData.acceptPrivacy) {
      setError(t("form.errorTerms"));
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        estimatedBudget,
        productTypeLabel: t(`productTypes.${formData.productType}`),
        budgetRangeLabel: t(`budgetRanges.${formData.budgetRange}`),
        language,
        submittedAt: new Date().toISOString(),
      };

      const response = await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Error");
      }

      // Meta Pixel Lead Event
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead', {
          content_name: formData.productType,
          content_category: 'MVP Request',
          value: estimatedBudget || 0,
          currency: 'EUR',
        });
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(t("form.errorGeneric"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/10 dark:border-white/10 light:border-black/10 rounded-2xl p-8 md:p-12 text-center">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-4">{t("form.successTitle")}</h3>
        <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 mb-6">
          {t("form.successMessage")}
        </p>
        
        {/* MVP Note */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 md:p-6 text-left mb-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-gray-300 dark:text-gray-300 light:text-gray-600">
              {t("form.successMvpNote")}
            </p>
          </div>
        </div>

        {/* Review Discount Offer */}
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-4 md:p-6 text-left">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-yellow-500/30 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <div>
              <p className="text-base font-bold text-yellow-400 mb-1">
                {t("form.successReviewOffer")}
              </p>
              <p className="text-sm text-gray-300 dark:text-gray-300 light:text-gray-600 mb-2">
                {t("form.successReviewOfferText")}
              </p>
              <p className="text-xs text-yellow-500/80 font-medium">
                ⏰ {t("form.successReviewOfferExpiry")}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const inputClassName = (hasError: boolean) => `w-full h-12 px-4 rounded-lg border ${hasError ? 'border-red-500' : 'border-white/20 dark:border-white/20 light:border-black/20'} bg-white/5 dark:bg-white/5 light:bg-black/5 text-white dark:text-white light:text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 ${hasError ? 'focus:ring-red-500/50' : 'focus:ring-white/30 dark:focus:ring-white/30 light:focus:ring-black/30'}`;
  const selectClassName = (hasError: boolean) => `w-full h-12 px-4 rounded-lg border ${hasError ? 'border-red-500' : 'border-white/20 dark:border-white/20 light:border-black/20'} bg-white/5 dark:bg-white/5 light:bg-black/5 text-white dark:text-white light:text-gray-900 focus:outline-none focus:ring-2 ${hasError ? 'focus:ring-red-500/50' : 'focus:ring-white/30 dark:focus:ring-white/30 light:focus:ring-black/30'}`;
  const labelClassName = "block text-sm font-medium text-gray-300 dark:text-gray-300 light:text-gray-700 mb-2";
  const errorClassName = "text-red-500 text-xs mt-1";

  return (
    <form onSubmit={handleSubmit} className="bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/10 dark:border-white/10 light:border-black/10 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="companyName" className={labelClassName}>
            {t("form.companyName")}
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClassName(!!fieldErrors.companyName && touched.companyName)}
            placeholder={t("form.companyNamePlaceholder")}
          />
          {fieldErrors.companyName && touched.companyName && (
            <p className={errorClassName}>{fieldErrors.companyName}</p>
          )}
        </div>

        <div>
          <label htmlFor="contactName" className={labelClassName}>
            {t("form.contactName")}
          </label>
          <input
            type="text"
            id="contactName"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClassName(!!fieldErrors.contactName && touched.contactName)}
            placeholder={t("form.contactNamePlaceholder")}
          />
          {fieldErrors.contactName && touched.contactName && (
            <p className={errorClassName}>{fieldErrors.contactName}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className={labelClassName}>
            {t("form.email")}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClassName(!!fieldErrors.email && touched.email)}
            placeholder={t("form.emailPlaceholder")}
          />
          {fieldErrors.email && touched.email && (
            <p className={errorClassName}>{fieldErrors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className={labelClassName}>
            {t("form.phone")}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClassName(!!fieldErrors.phone && touched.phone)}
            placeholder={t("form.phonePlaceholder")}
          />
          {fieldErrors.phone && touched.phone && (
            <p className={errorClassName}>{fieldErrors.phone}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="productType" className={labelClassName}>
          {t("form.productType")}
        </label>
        <div className="flex gap-4">
          <select
            id="productType"
            name="productType"
            value={formData.productType}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`flex-1 ${selectClassName(!!fieldErrors.productType && touched.productType)} ${
              formData.productType === "other" ? "md:flex-none md:w-1/2" : ""
            }`}
          >
            <option value="" className="bg-[#0D0D0E] dark:bg-[#0D0D0E] light:bg-white">{t("form.productTypePlaceholder")}</option>
            {PRODUCT_TYPES.map((type) => (
              <option key={type.value} value={type.value} className="bg-[#0D0D0E] dark:bg-[#0D0D0E] light:bg-white">
                {t(`productTypes.${type.value}`)}
              </option>
            ))}
          </select>
          
          {formData.productType === "other" && (
            <input
              type="text"
              name="productTypeOther"
              value={formData.productTypeOther}
              onChange={handleChange}
              className={`flex-1 ${inputClassName(false)}`}
              placeholder={t("form.productTypeOtherPlaceholder")}
            />
          )}
        </div>
        {fieldErrors.productType && touched.productType && (
          <p className={errorClassName}>{fieldErrors.productType}</p>
        )}
      </div>

      <div>
        <label htmlFor="budgetRange" className={labelClassName}>
          {t("form.budgetRange")}
        </label>
        <select
          id="budgetRange"
          name="budgetRange"
          value={formData.budgetRange}
          onChange={handleChange}
          onBlur={handleBlur}
          className={selectClassName(!!fieldErrors.budgetRange && touched.budgetRange)}
        >
          <option value="" className="bg-[#0D0D0E] dark:bg-[#0D0D0E] light:bg-white">{t("form.budgetRangePlaceholder")}</option>
          {BUDGET_RANGES.map((range) => (
            <option key={range.value} value={range.value} className="bg-[#0D0D0E] dark:bg-[#0D0D0E] light:bg-white">
              {t(`budgetRanges.${range.value}`)}
            </option>
          ))}
        </select>
        {fieldErrors.budgetRange && touched.budgetRange && (
          <p className={errorClassName}>{fieldErrors.budgetRange}</p>
        )}
      </div>

      <div>
        <label htmlFor="projectDescription" className={labelClassName}>
          {t("form.projectDescription")}
        </label>
        <textarea
          id="projectDescription"
          name="projectDescription"
          value={formData.projectDescription}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-white/20 dark:border-white/20 light:border-black/20 bg-white/5 dark:bg-white/5 light:bg-black/5 text-white dark:text-white light:text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30 dark:focus:ring-white/30 light:focus:ring-black/30 resize-none"
          placeholder={t("form.projectDescriptionPlaceholder")}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Checkbox
            id="acceptTerms"
            checked={formData.acceptTerms}
            onCheckedChange={handleCheckboxChange("acceptTerms")}
            className="mt-1"
          />
          <label htmlFor="acceptTerms" className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-600 cursor-pointer">
            {t("form.acceptTerms")}{" "}
            <Link to="/terms" className="text-white dark:text-white light:text-gray-900 underline hover:no-underline">
              {t("form.termsLink")}
            </Link>
          </label>
        </div>

        <div className="flex items-start gap-3">
          <Checkbox
            id="acceptPrivacy"
            checked={formData.acceptPrivacy}
            onCheckedChange={handleCheckboxChange("acceptPrivacy")}
            className="mt-1"
          />
          <label htmlFor="acceptPrivacy" className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-600 cursor-pointer">
            {t("form.acceptPrivacy")}{" "}
            <Link to="/privacy" className="text-white dark:text-white light:text-gray-900 underline hover:no-underline">
              {t("form.privacyLink")}
            </Link>
          </label>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm">
          {error}
        </div>
      )}

      <Button
        variant="primary"
        isLoading={isSubmitting}
        isDisabled={isSubmitting}
        className="w-full h-14 text-lg font-semibold"
        props={{ type: "submit" } as any}
      >
        {isSubmitting ? t("form.submitting") : t("form.submit")}
      </Button>

      <p className="text-center text-xs text-gray-500 dark:text-gray-500 light:text-gray-400">
        {t("form.submitNote")}
      </p>
    </form>
  );
}
