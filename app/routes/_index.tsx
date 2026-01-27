import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { getBasicMetas, getBusinessJsonLd } from "~/utils/metas";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from "~/consts";
import { getCacheControlHeader } from "~/utils/server";
import { HeroSection } from "~/components/home/HeroSection";
import { BenefitsSection } from "~/components/home/BenefitsSection";
import { ProcessSection } from "~/components/home/ProcessSection";
import { MvpInfoSection } from "~/components/home/MvpInfoSection";
import { ReviewsSection } from "~/components/home/ReviewsSection";
import { FormSection } from "~/components/home/FormSection";
import { Footer } from "~/components/home/Footer";
import { Header } from "~/components/home/Header";
import { FloatingContactButton } from "~/components/home/FloatingContactButton";
import { motion } from "framer-motion";

export async function loader({ request }: LoaderFunctionArgs) {
  const search = new URL(request.url).search;
  const utmSearchParams = Object.fromEntries(new URLSearchParams(search) ?? "");

  return json({
    utmSearchParams,
    headers: {
      "Cache-Control": getCacheControlHeader("THREE_DAYS"),
    },
  });
}

export const meta: MetaFunction = () => {
  return [
    ...getBasicMetas({
      title: `${SITE_TITLE} - ${SITE_NAME}`,
      description: SITE_DESCRIPTION,
    }),
    {
      "script:ld+json": [getBusinessJsonLd()],
    },
  ];
};

export default function HomePage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-[#0D0D0E] dark:bg-[#0D0D0E] light:bg-white text-gray-300 dark:text-gray-300 light:text-gray-700 transition-colors duration-300"
    >
      <Header />
      <HeroSection />
      <BenefitsSection />
      <ProcessSection />
      <MvpInfoSection />
      <ReviewsSection />
      <FormSection />
      <Footer />
      <FloatingContactButton />
    </motion.main>
  );
}
