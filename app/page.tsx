import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import GalleryFilter from "@/components/GalleryFilter";
import FaqSection from "@/components/FaqSection";
import BookingForm from "@/components/BookingForm";
import LocationMap from "@/components/LocationMap";
import { Instagram, Facebook, Phone } from "lucide-react";
import Image from "next/image";

const artists = [
  { 
    name: "Belki", 
    style: "Realismo", 
    img: "/images/belki.jpeg" // Ruta local
  },
  { 
    name: "Buuh", 
    style: "Blackwork", 
    img: "/images/buuh.jpeg" // Ruta local
  }
];

export default function Home() {
  return (
    <main className="bg-white min-h-screen text-black">
      <Navbar />
      <HeroSlider />

      {/* Artists Section - Fondo Blanco */}
      <section id="artistas" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
           <div className="mb-16 text-center">
             <h2 className="text-5xl md:text-6xl font-oswald font-bold uppercase mb-4 text-black">
               El Equipo
             </h2>
             <div className="w-24 h-1 bg-black mx-auto mb-6"></div> {/* Separador minimalista */}
             <p className="text-gray-500 font-roboto max-w-xl mx-auto font-light">
               Artistas residentes dedicados a la perfección técnica y visual.
             </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {artists.map((artist) => (
                <div key={artist.name} className="group relative h-[600px] overflow-hidden cursor-pointer">
                  <Image 
                    src={artist.img} 
                    alt={artist.name} 
                    fill 
                    className="object-cover grayscale transition-transform duration-1000 group-hover:scale-105"
                    unoptimized
                  />
                  {/* Tarjeta de información blanca flotante */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white p-6 shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <h3 className="text-3xl font-oswald font-bold uppercase text-black mb-1">{artist.name}</h3>
                    <p className="text-gray-500 font-bold tracking-widest uppercase text-xs">{artist.style}</p>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Galería - Pasamos props de estilo si el componente lo soporta, o editamos el componente directo (ver paso 6) */}
      <GalleryFilter />

      {/* Booking Section - Estilo Editorial */}
      <section id="cotizar" className="py-24 bg-neutral-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="order-2 lg:order-1">
             {/* El formulario tiene fondo blanco, en un fondo gris claro resalta elegante */}
             <BookingForm />
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-6xl font-oswald font-bold uppercase leading-none mb-8 text-black">
              Agenda <br/> Tu <span className="text-stroke-black">Cita</span>
            </h2>
            <p className="text-gray-600 mb-10 font-roboto text-lg font-light leading-relaxed">
              Nuestro proceso de diseño es colaborativo. Cuéntanos tu idea y la convertiremos en una pieza atemporal.
            </p>
            
            <div className="border-l-2 border-black pl-6 py-2">
               <p className="font-oswald text-xl uppercase mb-1">Contacto Directo</p>
               <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={18} /> <span>+593 99 123 4567</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      <FaqSection />
      <LocationMap />

      {/* Footer Blanco Minimalista */}
      <footer className="bg-white border-t border-gray-200 pt-20 pb-10 px-6 text-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="text-3xl font-oswald font-bold uppercase tracking-widest">
            Buuh<span className="font-light">Legacy</span>
          </div>
          
          <div className="flex gap-8 text-sm font-bold uppercase tracking-widest text-gray-500">
             <a href="#inicio" className="hover:text-black transition-colors">Inicio</a>
             <a href="#galeria" className="hover:text-black transition-colors">Galería</a>
             <a href="#cotizar" className="hover:text-black transition-colors">Contacto</a>
          </div>

          <div className="flex gap-4">
             <a href="https://www.instagram.com/buuhlegacy?igsh=MXZ3NGg5MWtyZzE2Mg==" className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition-all rounded-full"><Instagram size={18}/></a>
             <a href="#" className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition-all rounded-full"><Facebook size={18}/></a>
          </div>
        </div>
        <div className="text-center text-gray-400 text-xs uppercase tracking-widest">
          © {new Date().getFullYear()} Buuh Legacy Studio.
        </div>
      </footer>
    </main>
  );
}