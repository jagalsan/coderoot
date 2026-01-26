import { Link } from "@remix-run/react";
import { MetaFunction } from "@remix-run/node";
import { SITE_NAME } from "~/consts";
import { getBasicMetas } from "~/utils/metas";
import { useLanguage } from "~/contexts/LanguageContext";

export const meta: MetaFunction = () => {
  return [
    ...getBasicMetas({
      title: `Términos y Condiciones - ${SITE_NAME}`,
      description: `Términos y condiciones de uso de ${SITE_NAME}`,
    }),
  ];
};

export default function TermsPage() {
  const { t, tArray } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0D0D0E] dark:bg-[#0D0D0E] light:bg-white text-gray-300 dark:text-gray-300 light:text-gray-700 p-6 py-12 transition-colors duration-300">
      <header className="max-w-2xl mx-auto mb-9">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            />
          </svg>
          <Link to="/" className="text-gray-400 dark:text-gray-400 light:text-gray-500 text-sm underline hover:text-white dark:hover:text-white light:hover:text-gray-900">
            {t("common.backToHome")}
          </Link>
        </div>
        <h1 className="text-4xl font-bold text-white dark:text-white light:text-gray-900 mt-4">{t("terms.title")}</h1>
      </header>

      <div className="max-w-2xl mx-auto [&>h3]:mt-10 [&>h3]:mb-4 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-white dark:[&>h3]:text-white light:[&>h3]:text-gray-900 [&>p]:my-2 [&>p]:text-gray-300 dark:[&>p]:text-gray-300 light:[&>p]:text-gray-600 [&>ul]:pl-6 [&>ul]:my-4 [&>ul>li]:list-disc">
        <p className="text-sm text-gray-500">{t("common.lastUpdated")}: Enero 2026</p>

        <h3>{t("terms.section1Title")}</h3>
        <p>{t("terms.section1Text")}</p>
        <p>{t("terms.section1Text2")}</p>

        <h3>{t("terms.section2Title")}</h3>
        <p>{t("terms.section2Text1")}</p>
        <p>{t("terms.section2Text2")}</p>

        <h3>{t("terms.section3Title")}</h3>
        <p>{t("terms.section3Text")}</p>
        <ul>
          {tArray("terms.section3List").map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <h3>{t("terms.section4Title")}</h3>
        <p>{t("terms.section4Text1")}</p>
        <p>{t("terms.section4Text2")}</p>

        <h3>{t("terms.section5Title")}</h3>
        <p>{t("terms.section5Text")}</p>

        <h3>{t("terms.section6Title")}</h3>
        <p>{t("terms.section6Text")}</p>

        <h3>{t("terms.section7Title")}</h3>
        <p>{t("terms.section7Text1")}</p>
        <p>{t("terms.section7Text2")}</p>

        <h3>{t("terms.section8Title")}</h3>
        <p>{t("terms.section8Text")}</p>

        <h3>{t("terms.section9Title")}</h3>
        <p>{t("terms.section9Text")}</p>

        <h3>{t("terms.section10Title")}</h3>
        <p>{t("terms.section10Text")}</p>

        <h3>{t("terms.section11Title")}</h3>
        <p>{t("terms.section11Text")}</p>

        <h3>{t("terms.section12Title")}</h3>
        <p>{t("terms.section12Text")}</p>

        <h3>{t("terms.section13Title")}</h3>
        <p>{t("terms.section13Text")}</p>

        <h3>{t("terms.section14Title")}</h3>
        <p>{t("terms.section14Text")}</p>
      </div>
    </div>
  );
}
