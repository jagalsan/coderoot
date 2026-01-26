import { useLanguage } from "~/contexts/LanguageContext";
import { Language } from "~/i18n/translations";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 dark:bg-white/10 dark:hover:bg-white/20 light:bg-black/10 light:hover:bg-black/20 transition-colors text-sm font-medium"
      aria-label={language === "es" ? "Switch to English" : "Cambiar a Español"}
    >
      <span className={language === "es" ? "opacity-100" : "opacity-50"}>ES</span>
      <span className="opacity-30">/</span>
      <span className={language === "en" ? "opacity-100" : "opacity-50"}>EN</span>
    </button>
  );
}
