import { motion } from "framer-motion";
import { useSearchParams } from "@remix-run/react";
import { SITE_NAME, SITE_COMPANY } from "~/consts";
import { ThemeToggle } from "~/components/ui/ThemeToggle";
import { LanguageToggle } from "~/components/ui/LanguageToggle";
import { useLanguage } from "~/contexts/LanguageContext";

export function Header() {
  const [searchParams] = useSearchParams();
  const query = searchParams.toString();
  const homeHref = query ? `/?${query}` : "/";
  const { t } = useLanguage();

  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Promo Banner */}
      {/* <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 text-black py-2 px-4"
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
          <span className="text-sm font-medium">
            {t("promo.banner")}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-black/20 px-2 py-0.5 rounded-full font-semibold">
              {t("promo.bannerExpiry")}
            </span>
            <button
              onClick={scrollToForm}
              className="text-xs bg-black text-yellow-400 px-3 py-1 rounded-full font-bold hover:bg-black/80 transition-colors"
            >
              {t("promo.bannerCta")}
            </button>
          </div>
        </div>
      </motion.div> */}

      {/* Main Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 py-4 bg-[#0D0D0E]/95 dark:bg-[#0D0D0E]/95 light:bg-white/95 backdrop-blur-sm lg:bg-transparent lg:dark:bg-transparent lg:light:bg-transparent lg:backdrop-blur-none"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href={homeHref} className="flex items-center gap-3">
            {/* TODO: Añadir logo SVG personalizado aquí */}
            <div className="w-9 h-9 bg-white dark:bg-white light:bg-black rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-black dark:text-black light:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-white dark:text-white light:text-black font-bold text-lg tracking-tight hidden sm:block">
              {SITE_NAME} <span className="font-normal text-xs text-gray-400 dark:text-gray-400 light:text-gray-500">by {SITE_COMPANY}</span>
            </span>
          </a>

          <div className="flex items-center gap-3">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </motion.header>
    </>
  );
}
