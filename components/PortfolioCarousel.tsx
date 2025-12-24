'use client';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

type Props = {
  title: string;
  images: string[];
};

export default function PortfolioCarousel({ title, images }: Props) {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' });

  return (
    <section className="py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 px-4 border-l-4 border-yellow-500 ml-4">
        {title}
      </h2>
      
      {/* Container del Carrusel */}
      <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex">
          {images.map((src, index) => (
            <div className="flex-[0_0_85%] md:flex-[0_0_40%] min-w-0 pl-4 relative aspect-[3/4]" key={index}>
              <div className="relative w-full h-full rounded-lg overflow-hidden border border-gray-800">
                <Image 
                  src={src} 
                  alt={`Tatuaje ${title} ${index + 1}`} 
                  fill
                  sizes="(max-width: 768px) 85vw, 40vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  unoptimized={true} // <--- AGREGA ESTA LÍNEA AQUÍ
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}