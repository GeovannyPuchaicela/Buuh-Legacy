'use client';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo en Negro */}
        <div className={`text-2xl font-bold font-oswald tracking-widest uppercase transition-colors ${isScrolled ? 'text-black' : 'text-white mix-blend-difference'}`}>
          Buuh<span className="font-light">Legacy</span>
        </div>

        {/* Desktop Menu */}
        <div className={`hidden md:flex gap-8 text-sm font-bold tracking-wider uppercase transition-colors ${isScrolled ? 'text-black' : 'text-white mix-blend-difference'}`}>
          {['Inicio', 'Artistas', 'Galería', 'FAQ'].map((item) => (
            <Link key={item} href={`#${item.toLowerCase()}`} className="hover:text-gray-500 transition-colors">
              {item}
            </Link>
          ))}
          <Link href="#cotizar" className="bg-black text-white px-6 py-2 hover:bg-neutral-800 transition-colors">
            Reservar
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className={`md:hidden ${isScrolled ? 'text-black' : 'text-white'}`} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu (Fondo Blanco) */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 p-6 flex flex-col gap-4 shadow-xl">
          {['Inicio', 'Artistas', 'Galería', 'FAQ', 'Cotizar'].map((item) => (
            <Link key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-xl font-oswald uppercase text-black">
              {item}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}