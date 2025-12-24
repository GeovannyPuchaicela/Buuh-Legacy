import { supabaseAdmin } from "@/lib/supabase";
import { Mail, Phone, Calendar, Clock } from "lucide-react";

// Fuerza a Next.js a no guardar caché de esta página (siempre datos frescos)
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // 1. Obtenemos los leads ordenados por fecha (más nuevo primero)
  const { data: leads, error } = await supabaseAdmin
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-red-500 font-roboto">
        Error de conexión: {error.message}
      </div>
    );
  }

  // Cálculos simples para las estadísticas
  const totalLeads = leads?.length || 0;
  const realismCount = leads?.filter((l: any) => l.style === 'realism').length || 0;

  return (
    <div className="min-h-screen bg-white text-neutral-900 p-8 md:p-12 font-roboto">
      
      {/* --- HEADER --- */}
      <header className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-end border-b border-neutral-200 pb-6">
        <div>
          <h1 className="text-5xl font-oswald text-black mb-2">Comisiones</h1>
          <p className="text-neutral-400 uppercase tracking-[0.2em] text-xs">
            Panel de Control de Artistas
          </p>
        </div>
        
        <div className="flex gap-8 mt-6 md:mt-0">
          <div className="text-right">
            <span className="block text-3xl font-oswald">{totalLeads}</span>
            <span className="text-[10px] uppercase tracking-widest text-neutral-400">Total</span>
          </div>
          <div className="text-right">
            <span className="block text-3xl font-oswald">{realismCount}</span>
            <span className="text-[10px] uppercase tracking-widest text-neutral-400">Realismo</span>
          </div>
        </div>
      </header>

      {/* --- GRID DE SOLICITUDES --- */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {leads?.map((lead: any) => (
          <article 
            key={lead.id} 
            className="group relative bg-white border border-neutral-200 p-8 hover:border-black transition-colors duration-300 flex flex-col justify-between min-h-[300px]"
          >
            {/* Cabecera de la Tarjeta */}
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 border 
                  ${lead.style === 'realism' ? 'border-neutral-900 text-neutral-900' : 'border-neutral-300 text-neutral-400'}`}>
                  {lead.style}
                </span>
                <span className="text-neutral-300 text-xs flex items-center gap-1">
                  <Clock size={12} />
                  {new Date(lead.created_at).toLocaleDateString()}
                </span>
              </div>

              <h2 className="text-2xl font-oswald mb-1 group-hover:underline decoration-1 underline-offset-4">
                {lead.full_name}
              </h2>
              <p className="text-xs text-neutral-400 uppercase tracking-widest mb-6">
                {lead.is_adult ? '+18 Verificado' : 'Edad sin verificar'}
              </p>

              <div className="mb-6">
                <p className="text-sm text-neutral-600 leading-relaxed line-clamp-4 italic border-l-2 border-neutral-100 pl-4">
                  "{lead.description}"
                </p>
              </div>
            </div>

            {/* Footer de la Tarjeta (Contacto) */}
            <div className="pt-6 border-t border-neutral-100 flex flex-col gap-3">
              <a href={`mailto:${lead.email}`} className="flex items-center gap-3 text-sm hover:text-neutral-500 transition-colors">
                <div className="w-8 h-8 flex items-center justify-center border border-neutral-200 rounded-full">
                   <Mail size={14} />
                </div>
                {lead.email}
              </a>
              <a href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`} target="_blank" className="flex items-center gap-3 text-sm hover:text-green-600 transition-colors">
                <div className="w-8 h-8 flex items-center justify-center border border-neutral-200 rounded-full">
                   <Phone size={14} />
                </div>
                {lead.phone}
              </a>
            </div>
          </article>
        ))}

        {/* Estado Vacío */}
        {leads?.length === 0 && (
          <div className="col-span-full py-20 text-center border border-dashed border-neutral-300 bg-neutral-50">
            <p className="font-oswald text-xl text-neutral-400">No hay solicitudes pendientes.</p>
          </div>
        )}

      </main>
    </div>
  );
}