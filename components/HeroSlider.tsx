'use client';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

const slides = [
  "/images/hero1.jpg",
  "/images/hero2.jpg",
  "/images/hero3.jpg"
];

export default function HeroSlider() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

  return (
    <section id="inicio" className="relative h-screen w-full overflow-hidden bg-white">
      <div className="absolute inset-0 z-0" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((src, idx) => (
            <div key={idx} className="relative flex-[0_0_100%] h-full">
               <Image src={src} alt="Hero" fill className="object-cover grayscale brightness-75 contrast-125" unoptimized priority />
               {/* Overlay muy sutil solo para que se lea el texto */}
               <div className="absolute inset-0 bg-black/20" />
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-4">
        <h1 className="font-oswald text-7xl md:text-9xl font-bold uppercase tracking-tighter text-white mb-2 mix-blend-overlay">
          Buuh Legacy
        </h1>
        <p className="font-roboto text-xl md:text-2xl text-white font-light tracking-[0.2em] uppercase">
          Estudio de Tatuaje
        </p>
      </div>
    </section>
  );
}