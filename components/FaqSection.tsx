'use client';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  { q: "¿Qué precio tiene un tatuaje?", a: "El costo final depende del tamaño, detalle y ubicación. Cotiza gratis en el formulario." },
  { q: "¿Cómo debo prepararme?", a: "Ven descansado, bien comido y sin haber consumido alcohol 24h antes. Hidrata tu piel los días previos." },
  { q: "¿Hacen Cover-ups?", a: "Sí, somos especialistas en tapar tatuajes antiguos. Necesitamos ver el tatuaje actual presencialmente." },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-white px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-oswald font-bold uppercase mb-10 text-center">Dudas <span className="text-yellow-600">Frecuentes</span></h2>
        
        <div className="space-y-4">
          {faqs.map((item, i) => (
            <div key={i} className="border border-neutral-700 bg-gray-50">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center p-6 text-left hover:bg-neutral-800 transition-colors"
              >
                <span className="font-bold text-lg">{item.q}</span>
                {openIndex === i ? <Minus className="text-yellow-500" /> : <Plus />}
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-black font-roboto leading-relaxed">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}