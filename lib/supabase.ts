import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY! // Asegúrate de que esta variable exista en .env.local

// Cliente Público (Para el frontend, auth, etc.)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Cliente Admin (SOLO para el servidor - Server Components / API Routes)
// Este tiene permisos para saltarse las reglas de seguridad (RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)