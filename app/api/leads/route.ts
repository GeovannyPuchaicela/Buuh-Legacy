// Ruta: app/api/leads/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Cliente con permisos de admin (Service Role)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! 
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, style, description } = body;

    // 1. Insertar en Supabase
    const { error: dbError } = await supabaseAdmin
      .from('leads')
      .insert([{ 
        full_name: fullName, 
        email, 
        phone, 
        style, 
        description 
      }]);

    if (dbError) throw new Error(dbError.message);

    // 2. Enviar Email (Opcional por ahora si no has validado dominio en Resend)
    // Nota: Si falla el email, no bloqueamos la respuesta, solo lo logueamos.
    try {
        await resend.emails.send({
        from: 'onboarding@resend.dev', // Solo funciona enviando a TU propio email registrado
        to: ['cg.puchaicela@gmail.com'], // CAMBIA ESTO POR TU EMAIL REAL
        subject: `Nuevo Lead: ${style} - ${fullName}`,
        html: `<p>Cliente: ${fullName}<br>Estilo: ${style}<br>Idea: ${description}</p>`
        });
    } catch (emailError) {
        console.error("Error enviando email:", emailError);
    }

    return NextResponse.json({ success: true, message: 'Guardado con éxito' });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}