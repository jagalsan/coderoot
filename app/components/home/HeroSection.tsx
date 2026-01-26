import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "~/contexts/LanguageContext";
import { useState, useEffect } from "react";

const heroImages = [
  "/images/image_01.png",
  "/images/image_02.png",
];

export function HeroSection() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (heroImages.length <= 1) return;
    
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prev) => (prev + 1) % heroImages.length);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered]);
  
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="text-white dark:text-white light:text-gray-900 px-4 pt-24 sm:px-6 md:px-8 lg:py-16 lg:pt-32 overflow-hidden w-full mx-auto h-full min-h-[90vh] flex items-center">
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start"
          >
            <button
              onClick={scrollToForm}
              className="text-black dark:text-black light:text-white bg-white dark:bg-white light:bg-gray-900 text-[16px] md:text-[18px] rounded-full px-8 py-4 font-suisse font-semibold hover:bg-gray-100 dark:hover:bg-gray-100 light:hover:bg-gray-800 transition-colors"
            >
              {t("hero.cta")}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex flex-wrap gap-6 mt-10 justify-center lg:justify-start text-sm text-gray-400 dark:text-gray-400 light:text-gray-500"
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

        {/* Right content - Image carousel */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex-1 w-full max-w-lg lg:max-w-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative w-full max-w-[320px] mx-auto aspect-[9/16] rounded-3xl overflow-hidden border border-white/10 dark:border-white/10 light:border-black/10 shadow-2xl bg-white/5 dark:bg-white/5 light:bg-black/5">
            {/* Skeleton loader */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 dark:from-white/10 dark:to-white/5 light:from-black/5 light:to-black/10 animate-pulse" />
            
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={heroImages[currentIndex]}
                alt={`MVP Sprint showcase ${currentIndex + 1}`}
                initial={{ opacity: 0, filter: "blur(10px)", x: 50 }}
                animate={{ 
                  opacity: 1, 
                  filter: "blur(0px)", 
                  x: 0,
                  scale: isHovered ? 1.02 : 1
                }}
                exit={{ opacity: 0, filter: "blur(10px)", x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Navigation dots */}
            {heroImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-white w-6"
                        : "bg-white/50 hover:bg-white/80 w-2"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
