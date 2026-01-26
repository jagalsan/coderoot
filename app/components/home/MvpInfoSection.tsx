import { motion } from "framer-motion";
import { useLanguage } from "~/contexts/LanguageContext";

export function MvpInfoSection() {
  const { t } = useLanguage();

  const benefits = [
    t("mvpInfo.benefits.0"),
    t("mvpInfo.benefits.1"),
    t("mvpInfo.benefits.2"),
    t("mvpInfo.benefits.3"),
  ];

  return (
    <section className="py-20 md:py-32 px-4 bg-white/[0.02] dark:bg-white/[0.02] light:bg-black/[0.02]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-blue-500/10 text-blue-400 dark:text-blue-400 light:text-blue-600 text-sm font-medium px-4 py-2 rounded-full border border-blue-500/20 mb-6">
            {t("mvpInfo.subtitle")}
          </span>
          <h2 className="font-suisse font-bold text-3xl md:text-4xl lg:text-5xl text-white dark:text-white light:text-gray-900 mb-6">
            {t("mvpInfo.title")}
          </h2>
          <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-lg max-w-3xl mx-auto">
            {t("mvpInfo.description")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Left: What is included */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-green-500/5 border border-green-500/20 rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-white dark:text-white light:text-gray-900 font-semibold text-xl">
                {t("mvpInfo.whatIs")}
              </h3>
            </div>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300 dark:text-gray-300 light:text-gray-600">{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: What is NOT included + Full product */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-white dark:text-white light:text-gray-900 font-semibold text-xl">
                  {t("mvpInfo.notIncluded")}
                </h3>
              </div>
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">
                {t("mvpInfo.notIncludedDesc")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-white dark:text-white light:text-gray-900 font-semibold text-xl">
                  {t("mvpInfo.fullProduct")}
                </h3>
              </div>
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">
                {t("mvpInfo.fullProductDesc")}
              </p>
            </motion.div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12 text-lg text-gray-500 dark:text-gray-500 light:text-gray-500 italic"
        >
          {t("mvpInfo.cta")}
        </motion.p>
      </div>
    </section>
  );
}
