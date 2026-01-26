import { motion } from "framer-motion";
import { LeadForm } from "./LeadForm";
import { useLanguage } from "~/contexts/LanguageContext";

export function FormSection() {
  const { t } = useLanguage();

  return (
    <section id="lead-form" className="py-20 md:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-suisse font-bold text-3xl md:text-4xl lg:text-5xl text-white dark:text-white light:text-gray-900 mb-6">
            {t("form.title")} <span className="italic font-normal">{t("form.titleHighlight")}</span>
          </h2>
          <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-lg max-w-2xl mx-auto">
            {t("form.description")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <LeadForm />
        </motion.div>
      </div>
    </section>
  );
}
