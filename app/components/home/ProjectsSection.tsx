import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "~/contexts/LanguageContext";
import { useState, useCallback } from "react";

const projects = [
  {
    id: 1,
    image: "/images/projects/fitness.png",
    titleEs: "FitTrack App",
    titleEn: "FitTrack App",
    descriptionEs:
      "Aplicación móvil de seguimiento fitness con planes personalizados, tracking de ejercicios y métricas de progreso en tiempo real.",
    descriptionEn:
      "Mobile fitness tracking app with personalized plans, exercise tracking and real-time progress metrics.",
    technologies: ["React Native", "Node.js", "MongoDB", "Firebase"],
    category: "Mobile App",
  },
  {
    id: 2,
    image: "/images/projects/fint-tech-project.png",
    titleEs: "FiTec",
    titleEn: "FiTec",
    descriptionEs:
      "Plataforma fintech de gestión financiera con análisis de gastos en tiempo real, integración bancaria y herramientas de ahorro automatizado.",
    descriptionEn:
      "Fintech financial management platform with real-time expense analysis, bank integration and automated savings tools.",
    technologies: ["Next.js", "Stripe", "PostgreSQL", "AWS"],
    category: "Fintech",
  },
  {
    id: 3,
    image: "/images/projects/nfts.png",
    titleEs: "NFT Market",
    titleEn: "NFT Market",
    descriptionEs:
      "Marketplace descentralizado de NFTs con soporte para múltiples blockchains, subastas en tiempo real y sistema de royalties para creadores.",
    descriptionEn:
      "Decentralized NFT marketplace with multi-chain support, real-time auctions and creator royalty system.",
    technologies: ["React", "Solidity", "Web3.js", "IPFS"],
    category: "Web3",
  },
];

function ProjectImage({
  src,
  alt,
  category,
}: {
  src: string;
  alt: string;
  category: string;
}) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative h-48 md:h-56 overflow-hidden bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-t-2xl">
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl opacity-30">📱</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover rounded-t-2xl transition-transform duration-300 ease-out group-hover:scale-105"
          onError={() => setHasError(true)}
        />
      )}
      <div className="absolute top-4 left-4 z-20">
        <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
          {category}
        </span>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, []);


  // Get visible projects (current + neighbors for blur effect)
  const getVisibleProjects = () => {
    const result = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + projects.length) % projects.length;
      result.push({ ...projects[index], position: i });
    }
    return result;
  };

  return (
    <section className="py-20 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-suisse font-bold text-3xl md:text-4xl lg:text-5xl text-white dark:text-white light:text-gray-900 mb-4">
            {t("projects.title")}
          </h2>
          <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-lg max-w-2xl mx-auto">
            {t("projects.subtitle")}
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute -left-4 md:left-0 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-colors"
            aria-label="Previous project"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute -right-4 md:right-0 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-colors"
            aria-label="Next project"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Projects Row */}
          <div className="flex justify-center items-center gap-6 px-12 md:px-16">
            <AnimatePresence mode="popLayout">
              {getVisibleProjects().map((project) => (
                <motion.div
                  key={`${project.id}-${project.position}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: project.position === 0 ? 1 : 0.4,
                    scale: project.position === 0 ? 1 : 0.9,
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`group flex-shrink-0 w-full max-w-sm bg-white/5 dark:bg-white/5 light:bg-black/5 rounded-2xl overflow-hidden border border-white/10 dark:border-white/10 light:border-black/10 ${
                    project.position === 0 ? "hover:border-yellow-500/50" : ""
                  } transition-colors duration-300`}
                >
                  {/* Project Image */}
                  <ProjectImage
                    src={project.image}
                    alt={language === "es" ? project.titleEs : project.titleEn}
                    category={project.category}
                  />

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white dark:text-white light:text-gray-900 mb-2">
                      {language === "es" ? project.titleEs : project.titleEn}
                    </h3>
                    <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm mb-4 line-clamp-2">
                      {language === "es"
                        ? project.descriptionEs
                        : project.descriptionEn}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-white/10 dark:bg-white/10 light:bg-black/10 text-gray-300 dark:text-gray-300 light:text-gray-700 text-xs px-3 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-yellow-500 w-6"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 mb-4">
            {t("projects.cta")}
          </p>
          <button
            onClick={() =>
              document
                .getElementById("lead-form")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold px-8 py-4 rounded-full hover:from-yellow-400 hover:to-orange-400 transition-all"
          >
            {t("projects.ctaButton")}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
