import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@remix-run/react";
import { PRODUCT_TYPES, BUDGET_RANGES, MAKE_WEBHOOK_URL } from "~/consts";
import { useLanguage } from "~/contexts/LanguageContext";

interface FormData {
  contactName: string;
  email: string;
  phone: string;
  companyName: string;
  productType: string;
  budgetRange: string;
  projectDescription: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
}

const TOTAL_STEPS = 4;

export function HeroLeadForm() {
  const { t, language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    contactName: "",
    email: "",
    phone: "",
    companyName: "",
    productType: "",
    budgetRange: "",
    projectDescription: "",
    acceptTerms: false,
    acceptPrivacy: false,
  });

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.contactName.trim() !== "" && formData.email.includes("@");
      case 2:
        return formData.productType !== "";
      case 3:
        return formData.projectDescription.trim() !== "";
      case 4:
        return formData.acceptTerms && formData.acceptPrivacy;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS && canProceed()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!canProceed()) return;
    
    setIsSubmitting(true);
    try {
      const selectedBudget = BUDGET_RANGES.find(b => b.value === formData.budgetRange);
      
      const response = await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "hero_multistep_form",
          estimatedBudget: selectedBudget?.baseAmount || 0,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'Lead', {
            content_name: formData.productType,
            content_category: 'MVP Request',
            value: selectedBudget?.baseAmount || 0,
            currency: 'EUR',
          });
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/5 dark:bg-white/5 light:bg-black/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center"
      >
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white dark:text-white light:text-gray-900 mb-2">
          {t("form.successTitle")}
        </h3>
        <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">
          {t("form.successMessage")}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="bg-white/5 dark:bg-white/5 light:bg-black/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-6">
        {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              index + 1 <= currentStep
                ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                : "bg-white/20"
            }`}
          />
        ))}
      </div>

      {/* Step indicator */}
      <p className="text-xs text-gray-400 mb-4">
        {t("heroForm.step")} {currentStep} {t("heroForm.of")} {TOTAL_STEPS}
      </p>

      <AnimatePresence mode="wait">
        {/* Step 1: Contact Info */}
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-white dark:text-white light:text-gray-900">
              {t("heroForm.step1Title")}
            </h3>
            <input
              type="text"
              placeholder={t("form.contactNamePlaceholder")}
              value={formData.contactName}
              onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
            />
            <input
              type="email"
              placeholder={t("form.emailPlaceholder")}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
            />
            <input
              type="tel"
              placeholder={t("form.phonePlaceholder")}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
            />
          </motion.div>
        )}

        {/* Step 2: Product Type */}
        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-white dark:text-white light:text-gray-900">
              {t("heroForm.step2Title")}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {PRODUCT_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, productType: type.value })}
                  className={`p-3 rounded-xl text-sm text-left transition-all ${
                    formData.productType === type.value
                      ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
            <div className="pt-2">
              <p className="text-xs text-gray-400 mb-2">{t("heroForm.budgetOptional")}</p>
              <select
                value={formData.budgetRange}
                onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
              >
                <option value="" className="bg-gray-900">{t("form.budgetRangePlaceholder")}</option>
                {BUDGET_RANGES.map((range) => (
                  <option key={range.value} value={range.value} className="bg-gray-900">
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        )}

        {/* Step 3: Project Description */}
        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-white dark:text-white light:text-gray-900">
              {t("heroForm.step3Title")}
            </h3>
            <input
              type="text"
              placeholder={t("form.companyNamePlaceholder")}
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
            />
            <textarea
              placeholder={t("form.projectDescriptionPlaceholder")}
              rows={4}
              value={formData.projectDescription}
              onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 resize-none"
            />
          </motion.div>
        )}

        {/* Step 4: Terms */}
        {currentStep === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-white dark:text-white light:text-gray-900">
              {t("heroForm.step4Title")}
            </h3>
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded border-white/20 bg-white/10 text-yellow-500 focus:ring-yellow-500/50"
                />
                <span className="text-sm text-gray-300">
                  {t("form.acceptTerms")}{" "}
                  <Link to="/terms" className="text-yellow-500 hover:underline">
                    {t("form.termsLink")}
                  </Link>
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.acceptPrivacy}
                  onChange={(e) => setFormData({ ...formData, acceptPrivacy: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded border-white/20 bg-white/10 text-yellow-500 focus:ring-yellow-500/50"
                />
                <span className="text-sm text-gray-300">
                  {t("form.acceptPrivacy")}{" "}
                  <Link to="/privacy" className="text-yellow-500 hover:underline">
                    {t("form.privacyLink")}
                  </Link>
                </span>
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="flex gap-3 mt-6">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 py-3 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-all"
          >
            {t("heroForm.back")}
          </button>
        )}
        {currentStep < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold hover:from-yellow-400 hover:to-orange-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t("heroForm.next")}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canProceed() || isSubmitting}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold hover:from-yellow-400 hover:to-orange-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? t("form.sending") : t("heroForm.submit")}
          </button>
        )}
      </div>
    </div>
  );
}
