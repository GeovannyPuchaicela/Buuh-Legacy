// Ruta: components/BookingForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// 1. Definimos el Schema de validación con Zod
const formSchema = z.object({
  fullName: z.string().min(3, "El nombre es muy corto"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(7, "Teléfono inválido"),
  isAdult: z.literal(true, {
    errorMap: () => ({ message: "Debes confirmar que eres mayor de edad" }),
  }),
  style: z.enum(["realism", "traditional", "fine_line", "other"]),
  // Campos condicionales (los hacemos opcionales en el schema base pero los validamos en UI)
  referenceUrl: z.string().optional(),
  description: z.string().min(10, "Cuéntanos un poco más sobre tu idea"),
});

type FormData = z.infer<typeof formSchema>;

export default function BookingForm() {
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const [loading, setLoading] = useState(false);

  // Observamos el estilo para mostrar campos condicionales
  const selectedStyle = watch("style");

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      if (response.ok && result.success) {
        alert('¡Cotización recibida! Te contactaremos pronto.');
        reset();
      } else {
        alert('Error: ' + result.error);
      }
    } catch (e) {
      alert('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg space-y-5 text-gray-900 bg-white p-8 rounded-xl shadow-2xl">
      <h3 className="text-2xl font-bold mb-4 text-center">Empieza tu Legado</h3>

      {/* Datos Personales */}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Nombre Completo</label>
          <input {...register("fullName")} className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-black outline-none" placeholder="Tu nombre" />
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
            <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input {...register("email")} type="email" className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-black outline-none" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
            <label className="block text-sm font-semibold mb-1">WhatsApp</label>
            <input {...register("phone")} className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-black outline-none" />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
        </div>
      </div>

      {/* Selector de Estilo */}
      <div>
        <label className="block text-sm font-semibold mb-1">¿Qué estilo buscas?</label>
        <select {...register("style")} className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-black outline-none">
          <option value="realism">Realismo (Retratos, Sombras)</option>
          <option value="fine_line">Fine Line (Líneas finas, Minimalista)</option>
          <option value="traditional">Tradicional / Old School</option>
          <option value="other">Otro / Cover Up</option>
        </select>
      </div>

      {/* Lógica Condicional: Mensaje específico según estilo */}
      {selectedStyle === 'realism' && (
        <div className="bg-gray-100 p-3 rounded text-sm text-gray-600">
          ℹ️ Para realismo, es vital que tengas una foto de referencia de alta calidad.
        </div>
      )}
      {selectedStyle === 'fine_line' && (
        <div className="bg-gray-100 p-3 rounded text-sm text-gray-600">
          ℹ️ Los tatuajes fine line requieren un tamaño mínimo para no borrarse con los años.
        </div>
      )}

      {/* Descripción */}
      <div>
        <label className="block text-sm font-semibold mb-1">Cuéntanos tu idea</label>
        <textarea 
            {...register("description")} 
            className="w-full border border-gray-300 p-2 rounded h-24 focus:ring-2 focus:ring-black outline-none" 
            placeholder="¿En qué parte del cuerpo? ¿Tamaño aproximado?"
        />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
      </div>

      {/* Checkbox de Mayoría de Edad (Legal) */}
      <div className="flex items-center gap-2">
        <input type="checkbox" {...register("isAdult")} id="isAdult" className="w-4 h-4" />
        <label htmlFor="isAdult" className="text-sm cursor-pointer select-none">
          Confirmo que soy mayor de 18 años.
        </label>
      </div>
      {errors.isAdult && <p className="text-red-500 text-xs">{errors.isAdult.message}</p>}

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-black text-white p-3 rounded font-bold hover:bg-zinc-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? 'Enviando...' : 'Solicitar Cita'}
      </button>
    </form>
  );
}