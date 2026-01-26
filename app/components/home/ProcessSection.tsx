import { motion } from "framer-motion";
import { useLanguage } from "~/contexts/LanguageContext";

const stepKeys = ["step1", "step2", "step3", "step4"];
const stepNumbers = ["01", "02", "03", "04"];

export function ProcessSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-32 px-4 bg-white/[0.02] dark:bg-white/[0.02] light:bg-black/[0.02]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-suisse font-bold text-3xl md:text-4xl lg:text-5xl text-white dark:text-white light:text-gray-900 mb-6">
            {t("process.title")}
          </h2>
          <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-lg max-w-2xl mx-auto">
            {t("process.description")}
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 dark:from-white/20 light:from-black/20 via-white/10 dark:via-white/10 light:via-black/10 to-transparent" />

          <div className="space-y-8 lg:space-y-0">
            {stepKeys.map((key, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`lg:flex lg:items-center lg:gap-8 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}>
                  <div className={`bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/10 dark:border-white/10 light:border-black/10 rounded-2xl p-6 md:p-8 ${
                    index % 2 === 0 ? "lg:ml-auto lg:mr-8" : "lg:mr-auto lg:ml-8"
                  } max-w-md`}>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-4xl font-bold text-white/20 dark:text-white/20 light:text-black/20">{stepNumbers[index]}</span>
                      <span className="text-sm text-white/60 dark:text-white/60 light:text-black/60 bg-white/10 dark:bg-white/10 light:bg-black/10 px-3 py-1 rounded-full">
                        {t(`process.${key}.duration`)}
                      </span>
                    </div>
                    <h3 className="text-white dark:text-white light:text-gray-900 font-semibold text-xl mb-3">
                      {t(`process.${key}.title`)}
                    </h3>
                    <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">
                      {t(`process.${key}.description`)}
                    </p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden lg:flex items-center justify-center w-4 h-4 bg-white dark:bg-white light:bg-gray-900 rounded-full relative z-10" />

                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
