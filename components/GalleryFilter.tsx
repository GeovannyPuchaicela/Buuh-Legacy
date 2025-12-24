'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const images = [
  { id: 1, src: "/images/tattoo1.jpg", cat: "Realismo" },
  { id: 2, src: "/images/tattoo2.jpg", cat: "Fine Line" },
  { id: 3, src: "/images/tattoo3.jpg", cat: "Tradicional" },
  { id: 4, src: "/images/tattoo4.jpg", cat: "Realismo" },
  { id: 5, src: "/images/tattoo5.jpg", cat: "Fine Line" },
  { id: 6, src: "/images/tattoo6.jpg", cat: "Realismo" },
  { id: 7, src: "/images/tattoo7.jpg", cat: "Fine Line" },
  { id: 8, src: "/images/tattoo8.jpg", cat: "Realismo" },
  { id: 9, src: "/images/tattoo9.jpg", cat: "Fine Line" },
];

const categories = ["Todos", "Realismo", "Fine Line", "Tradicional"];

export default function GalleryFilter() {
  const [filter, setFilter] = useState("Todos");

  const filteredImages = filter === "Todos" 
    ? images 
    : images.filter(img => img.cat === filter);

  return (
    <section id="galeria" className="py-16 md:py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* === ENCABEZADO Y FILTROS (CORREGIDO) === */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 border-b border-gray-100 pb-6">
          
          {/* Título: Ajustado tamaño para móvil */}
          <h2 className="text-3xl md:text-4xl font-oswald font-bold uppercase text-black mb-6 md:mb-0 leading-tight">
            Portafolio
          </h2>
          
          {/* Contenedor de Botones: Scroll horizontal perfecto en móvil */}
          <div className="w-full md:w-auto flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                // whitespace-nowrap evita que "Fine Line" se rompa en dos lineas
                // flex-shrink-0 evita que los botones se aplasten
                className={`whitespace-nowrap flex-shrink-0 text-xs md:text-sm font-bold uppercase tracking-wider px-5 py-2 md:px-4 md:py-2 border transition-all rounded-full
                  ${filter === cat ? 'border-black bg-black text-white' : 'border-gray-200 text-gray-500 hover:border-black hover:text-black'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* === GRID DE IMÁGENES === */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence>
            {filteredImages.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-[3/4] group overflow-hidden bg-gray-50 cursor-pointer rounded-lg"
              >
                <Image 
                  src={img.src} 
                  alt={img.cat} 
                  fill 
                  className="object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" 
                  unoptimized
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Estilo extra para ocultar la barra de scroll fea pero permitir deslizar */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}