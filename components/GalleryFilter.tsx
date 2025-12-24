'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Usamos las imágenes locales que guardaste
const images = [
  { id: 1, src: "/images/tattoo1.jpg", cat: "Realismo" },
  { id: 2, src: "/images/tattoo2.jpg", cat: "Fine Line" },
  { id: 3, src: "/images/tattoo3.jpg", cat: "Tradicional" },
  { id: 4, src: "/images/tattoo4.jpg", cat: "Realismo" },
  { id: 5, src: "/images/tattoo5.jpg", cat: "Fine Line" },
  { id: 6, src: "/images/tattoo6.jpg", cat: "Tradicional" },
  { id: 7, src: "/images/tattoo7.jpg", cat: "Realismo" },
  { id: 8, src: "/images/tattoo8.jpg", cat: "Fine Line" },
  { id: 9, src: "/images/tattoo9.jpg", cat: "Tradicional" },

];

const categories = ["Todos", "Realismo", "Fine Line", "Tradicional"];

export default function GalleryFilter() {
  const [filter, setFilter] = useState("Todos");

  const filteredImages = filter === "Todos" 
    ? images 
    : images.filter(img => img.cat === filter);

  return (
    <section id="galeria" className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado del filtro */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-100 pb-6">
          <h2 className="text-4xl font-oswald font-bold uppercase text-black">
            Portafolio Selecto
          </h2>
          
          <div className="flex gap-4 mt-6 md:mt-0 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-sm font-bold uppercase tracking-wider px-4 py-2 border transition-all rounded-full
                  ${filter === cat ? 'border-black bg-black text-white' : 'border-gray-200 text-gray-500 hover:border-black hover:text-black'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de imágenes */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredImages.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                // 'group' es necesario para que el hover en el contenedor afecte a la imagen hija
                className="relative aspect-[3/4] group overflow-hidden bg-gray-50 cursor-pointer rounded-lg"
              >
                <Image 
                  src={img.src} 
                  alt={img.cat} 
                  fill 
                  // Aquí está la magia:
                  // 'grayscale' hace que empiece en blanco y negro.
                  // 'group-hover:grayscale-0' quita el filtro al pasar el mouse.
                  // 'group-hover:scale-105' hace un zoom suave.
                  className="object-cover transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" 
                  unoptimized
                />
                
                {/* HEMOS ELIMINADO EL BLOQUE <div> QUE CONTENÍA EL TEXTO "VER DETALLE".
                   Ahora la imagen está limpia.
                */}

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}