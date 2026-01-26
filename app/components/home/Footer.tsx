import { Link } from "@remix-run/react";
import { SITE_NAME, SITE_COMPANY } from "~/consts";
import { useLanguage } from "~/contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 border-t border-white/10 dark:border-white/10 light:border-black/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-white dark:text-white light:text-gray-900 font-semibold text-lg">
              {SITE_NAME} <span className="font-normal text-xs text-gray-400 dark:text-gray-400 light:text-gray-500">by {SITE_COMPANY}</span>
            </p>
            <p className="text-gray-500 dark:text-gray-500 light:text-gray-500 text-sm mt-1">
              {t("footer.tagline")}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 dark:text-gray-400 light:text-gray-600">
            <Link to="/privacy" className="hover:text-white dark:hover:text-white light:hover:text-gray-900 transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link to="/terms" className="hover:text-white dark:hover:text-white light:hover:text-gray-900 transition-colors">
              {t("footer.terms")}
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 dark:border-white/5 light:border-black/5 text-center text-sm text-gray-500">
          <p>© {currentYear} {SITE_NAME}. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
}
