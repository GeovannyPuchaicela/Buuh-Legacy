'use client';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import IntroAnimation from './IntroAnimation';

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Bloqueamos el scroll mientras está la intro
    if (showIntro) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0); // Forzar ir arriba
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showIntro]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showIntro && (
          <IntroAnimation 
            key="intro" 
            onComplete={() => setShowIntro(false)} 
          />
        )}
      </AnimatePresence>

      {/* Contenido Principal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }} // Si hay intro, opacidad 0. Si no, 1.
        transition={{ duration: 1, delay: 0.5 }} // Aparece suavemente después de que sube el telón
      >
        {children}
      </motion.div>
    </>
  );
}