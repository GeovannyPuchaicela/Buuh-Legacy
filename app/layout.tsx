import type { Metadata } from "next";
import { Italiana, Manrope } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper"; // <--- ESTO FALTABA

// Configuración de fuentes estilo "Revista de Lujo"
const headingFont = Italiana({ 
  weight: "400", 
  subsets: ["latin"], 
  variable: "--font-oswald" // Mantenemos este nombre para no romper el CSS existente
});

const bodyFont = Manrope({ 
  subsets: ["latin"], 
  variable: "--font-roboto"
});

export const metadata: Metadata = {
  title: "Buuh Legacy | Tattoo Studio",
  description: "Arte, pureza y legado.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${headingFont.variable} ${bodyFont.variable} bg-white text-neutral-900 antialiased selection:bg-black selection:text-white`}>
        {/* RECUPERAMOS EL WRAPPER QUE CONTROLA LA ANIMACIÓN */}
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}