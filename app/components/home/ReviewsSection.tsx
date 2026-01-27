import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "~/contexts/LanguageContext";

const reviews = [
  {
    id: 1,
    name: "Carlos Mendoza",
    role: "CEO",
    company: "FitTrack App",
    avatar: "CM",
    rating: 5,
    textEs: "Increíble experiencia. Teníamos una idea para una app de fitness y en 7 días teníamos un MVP funcionando que pudimos mostrar a inversores. Conseguimos nuestra primera ronda de financiación gracias a eso.",
    textEn: "Incredible experience. We had an idea for a fitness app and in 7 days we had a working MVP that we could show to investors. We got our first funding round thanks to that.",
  },
  {
    id: 2,
    name: "Laura García",
    role: "Founder",
    company: "EcoMarket",
    avatar: "LG",
    rating: 5,
    textEs: "Necesitábamos validar nuestra idea de marketplace sostenible rápidamente. El equipo de MVP Sprint entendió perfectamente lo que buscábamos y entregaron antes de tiempo. 100% recomendados.",
    textEn: "We needed to validate our sustainable marketplace idea quickly. The MVP Sprint team perfectly understood what we were looking for and delivered ahead of schedule. 100% recommended.",
  },
  {
    id: 3,
    name: "Miguel Ángel Torres",
    role: "CTO",
    company: "HealthConnect",
    avatar: "MT",
    rating: 5,
    textEs: "Como CTO, soy muy exigente con la calidad del código. Me sorprendió gratamente ver que el MVP tenía una arquitectura sólida y escalable. Ya estamos trabajando con ellos en el producto completo.",
    textEn: "As a CTO, I'm very demanding about code quality. I was pleasantly surprised to see that the MVP had a solid and scalable architecture. We're already working with them on the full product.",
  },
  {
    id: 4,
    name: "Ana Belén Ruiz",
    role: "Product Manager",
    company: "TravelBuddy",
    avatar: "AR",
    rating: 5,
    textEs: "La comunicación fue excelente durante todo el proceso. Cada día recibíamos actualizaciones y podíamos dar feedback. El resultado superó nuestras expectativas.",
    textEn: "Communication was excellent throughout the process. Every day we received updates and could give feedback. The result exceeded our expectations.",
  },
  {
    id: 5,
    name: "David Fernández",
    role: "Founder & CEO",
    company: "QuickPay Solutions",
    avatar: "DF",
    rating: 5,
    textEs: "Teníamos dudas sobre si era posible hacer algo funcional en una semana. No solo lo hicieron, sino que incluyeron features que ni habíamos pedido pero que tenían todo el sentido. Profesionales de verdad.",
    textEn: "We had doubts about whether it was possible to make something functional in a week. Not only did they do it, but they included features we hadn't even asked for but made complete sense. True professionals.",
  },
  {
    id: 6,
    name: "Patricia López",
    role: "Marketing Director",
    company: "StyleBox",
    avatar: "PL",
    rating: 5,
    textEs: "Desde marketing necesitábamos un MVP para testear el mercado antes de invertir en publicidad. MVP Sprint nos permitió validar nuestra propuesta de valor en tiempo récord. Ya tenemos los primeros 500 usuarios.",
    textEn: "From marketing, we needed an MVP to test the market before investing in advertising. MVP Sprint allowed us to validate our value proposition in record time. We already have the first 500 users.",
  },
];

export function ReviewsSection() {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isMounted]);

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const getVisibleReviews = () => {
    const prevIndex = (currentIndex - 1 + reviews.length) % reviews.length;
    const nextIndex = (currentIndex + 1) % reviews.length;
    return [
      { ...reviews[prevIndex], position: "left" },
      { ...reviews[currentIndex], position: "center" },
      { ...reviews[nextIndex], position: "right" },
    ];
  };

  const visibleReviews = getVisibleReviews();

  return (
    <section className="py-20 md:py-32 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-suisse font-bold text-3xl md:text-4xl lg:text-5xl text-white dark:text-white light:text-gray-900 mb-4">
            {t("reviews.title")}
          </h2>
          <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-lg max-w-2xl mx-auto">
            {t("reviews.description")}
          </p>
        </motion.div>

        <div className="relative">
          {/* Reviews Container */}
          <div className="flex items-center justify-center gap-4 md:gap-6">
            {visibleReviews.map((review, index) => {
              const isCenter = review.position === "center";
              const isLeft = review.position === "left";
              const isRight = review.position === "right";

              return (
                <motion.div
                  key={`${review.id}-${review.position}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: isCenter ? 1 : 0.4,
                    scale: isCenter ? 1 : 0.85,
                    filter: isCenter ? "blur(0px)" : "blur(4px)",
                    x: 0,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className={`
                    ${isCenter ? "z-20" : "z-10"}
                    ${isLeft || isRight ? "hidden md:block" : ""}
                    ${isCenter ? "w-full max-w-xl" : "w-full max-w-sm"}
                  `}
                >
                  <div className={`
                    bg-white/5 dark:bg-white/5 light:bg-black/5 
                    border border-white/10 dark:border-white/10 light:border-black/10 
                    rounded-2xl p-6 md:p-8
                    ${isCenter ? "" : "pointer-events-none"}
                  `}>
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className={`
                      text-gray-300 dark:text-gray-300 light:text-gray-600 
                      ${isCenter ? "text-base md:text-lg" : "text-sm"}
                      mb-6 leading-relaxed
                    `}>
                      "{language === "es" ? review.textEs : review.textEn}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                        {review.avatar}
                      </div>
                      <div>
                        <p className="text-white dark:text-white light:text-gray-900 font-semibold">
                          {review.name}
                        </p>
                        <p className="text-gray-500 dark:text-gray-500 light:text-gray-500 text-sm">
                          {review.role}, {review.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:translate-x-0 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 dark:bg-white/10 light:bg-black/10 hover:bg-white/20 dark:hover:bg-white/20 light:hover:bg-black/20 flex items-center justify-center transition-colors"
            aria-label="Previous review"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white dark:text-white light:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-0 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 dark:bg-white/10 light:bg-black/10 hover:bg-white/20 dark:hover:bg-white/20 light:hover:bg-black/20 flex items-center justify-center transition-colors"
            aria-label="Next review"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white dark:text-white light:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-white dark:bg-white light:bg-gray-900 w-6"
                    : "bg-white/30 dark:bg-white/30 light:bg-black/30 w-2 hover:bg-white/50"
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-8 mt-16 text-gray-500 dark:text-gray-500 light:text-gray-400"
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">+50 MVPs {language === "es" ? "entregados" : "delivered"}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">98% {language === "es" ? "clientes satisfechos" : "satisfied clients"}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">4.9/5 {language === "es" ? "valoración media" : "average rating"}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
