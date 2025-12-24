'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      onComplete();
    }, 4000); // 4 segundos total
    return () => clearTimeout(timer);
  }, [onComplete]);

  const containerVariants = {
    exit: { 
      opacity: 0,
      scale: 1.05, 
      filter: "blur(15px)", // Desenfoque elegante al salir
      transition: { duration: 1, ease: "easeInOut" } 
    }
  };

  if (!isMounted) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-white flex items-center justify-center px-4"
      variants={containerVariants}
      exit="exit"
    >
      <div className="relative w-full max-w-[600px] py-16 flex flex-col items-center justify-center">
        
        {/* === EL MARCO (Frame) === */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Líneas Horizontales */}
            <motion.div 
                className="absolute top-0 left-0 h-[1px] bg-black" 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
            />
            <motion.div 
                className="absolute bottom-0 right-0 h-[1px] bg-black"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
            />
            {/* Esquinas Verticales */}
            <motion.div 
                className="absolute top-0 left-0 w-[1px] bg-black"
                initial={{ height: 0 }}
                animate={{ height: "30px" }}
                transition={{ duration: 0.6, delay: 1 }}
            />
             <motion.div 
                className="absolute bottom-0 right-0 w-[1px] bg-black"
                initial={{ height: 0 }}
                animate={{ height: "30px" }}
                transition={{ duration: 0.6, delay: 1 }}
            />
        </div>

        {/* === CONTENIDO CENTRAL === */}
        <div className="w-full text-center z-10 flex flex-col items-center">
            
            <svg viewBox="0 0 800 200" className="w-full h-auto mb-2">
            <motion.text
                x="50%"
                y="55%" // Ajuste óptico para la fuente Italiana
                textAnchor="middle"
                dominantBaseline="central"
                style={{ fontFamily: 'var(--font-oswald)' }} // Carga la nueva fuente
                fontSize="90" 
                fontWeight="400"
                letterSpacing="0.05em" // Spacing ajustado para elegancia
                stroke="black"
                strokeWidth="1" // Trazo fino
                fill="black" 
                initial={{ 
                    strokeDasharray: 500,
                    strokeDashoffset: 500,
                    fillOpacity: 0 
                }}
                animate={{ 
                    strokeDashoffset: 0,
                    fillOpacity: 1 
                }}
                transition={{
                    strokeDashoffset: { duration: 1.8, ease: "easeInOut", delay: 0.5 },
                    fillOpacity: { duration: 1.2, ease: "easeOut", delay: 2 }
                }}
            >
                BUUH LEGACY
            </motion.text>
            </svg>

            {/* Detalles inferiores */}
            <div className="flex justify-center items-center text-[10px] md:text-[12px] font-roboto font-medium tracking-[0.4em] text-neutral-400 overflow-hidden uppercase mt-[-10px]">
                <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 2.5, duration: 0.6 }}
                >
                    Quito
                </motion.span>

                <motion.div 
                    className="w-8 h-[1px] bg-neutral-300 mx-6"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 2.3, duration: 0.6 }}
                />

                <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 2.7, duration: 0.6 }}
                >
                    Ecuador
                </motion.span>
            </div>
        </div>

      </div>
    </motion.div>
  );
}