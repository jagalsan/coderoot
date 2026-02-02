import { motion } from "framer-motion";
import { useLanguage } from "~/contexts/LanguageContext";
import { HeroLeadForm } from "./HeroLeadForm";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="text-white dark:text-white light:text-gray-900 px-4 pt-24 sm:px-6 md:px-8 lg:py-16 lg:pt-32 overflow-hidden w-full mx-auto">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Left content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6"
          >
            <span className="bg-white/10 dark:bg-white/10 light:bg-black/5 text-white dark:text-white light:text-gray-800 text-sm font-medium px-4 py-2 rounded-full border border-white/20 dark:border-white/20 light:border-black/10">
              {t("hero.badge")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="font-suisse font-bold text-[32px] sm:text-4xl md:text-5xl lg:text-6xl leading-tight"
          >
            {t("hero.title")} <span className="italic font-normal">{t("hero.titleMvp")}</span> {t("hero.titleReady")}{" "}
            <br className="hidden sm:block" />
            {t("hero.titleIn")} <span className="italic font-normal">{t("hero.titleWeek")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="font-suisse text-[16px] md:text-[20px] text-gray-300 dark:text-gray-300 light:text-gray-600 font-light mt-6 max-w-xl mx-auto lg:mx-0"
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex flex-wrap gap-6 mt-8 justify-center lg:justify-start text-sm text-gray-400 dark:text-gray-400 light:text-gray-500"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>{t("hero.feature1")}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>{t("hero.feature2")}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>{t("hero.feature3")}</span>
            </div>
          </motion.div>
        </div>

        {/* Right content - Lead Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-full lg:w-[500px] flex-shrink-0"
        >
          <HeroLeadForm />
        </motion.div>
      </div>
    </section>
  );
}
