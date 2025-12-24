// Ruta: components/LocationMap.tsx
export default function LocationMap() {
  return (
    <section className="py-12 bg-zinc-900 text-white">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-8 items-center">
        
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold text-yellow-500">Ubicación</h2>
          <p className="text-gray-300 text-lg">
            Visítanos en el corazón de la ciudad. Un espacio privado, higiénico y exclusivo.
          </p>
          <ul className="space-y-2 text-gray-400">
            <li>📍 Av. De Los Shyris y El Telégrafo (Ref. Edificio Sense)</li>
            <li>Lunes a Sábado: 10:00 AM - 8:00 PM</li>
            <li>buuhlegacy@gmail.com</li>
          </ul>
        </div>

        <div className="flex-1 w-full h-[400px] rounded-xl overflow-hidden shadow-2xl border border-gray-700">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.791522209772!2d-78.48496462526555!3d-0.1872895354992525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a688e67e5bd%3A0x3c06dcf02b3b8596!2sAv.%20de%20los%20Shyris%20%26%20El%20Tel%C3%A9grafo%2C%20Quito%20170102!5e0!3m2!1ses!2sec!4v1714578950000!5m2!1ses!2sec" 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} // Hack CSS para mapa oscuro
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>

      </div>
    </section>
  );
}