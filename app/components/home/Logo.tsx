import { motion } from "framer-motion";
import { useSearchParams } from "@remix-run/react";
import { SITE_NAME } from "~/consts";

export function LogoComponent() {
  const [searchParams] = useSearchParams();
  const query = searchParams.toString();
  const homeHref = query ? `/?${query}` : "/";

  return (
    <div className="flex justify-center items-center pt-8 px-4">
      <a href={homeHref}>
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          {/* TODO: Añadir logo SVG personalizado aquí */}
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-white font-bold text-xl md:text-2xl tracking-tight">
            {SITE_NAME}
          </span>
        </motion.div>
      </a>
    </div>
  );
}
