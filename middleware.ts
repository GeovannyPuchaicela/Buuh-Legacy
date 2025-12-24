import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // 1. Verificamos si la ruta que intentan visitar empieza por "/admin"
  if (req.nextUrl.pathname.startsWith('/admin')) {
    
    // 2. Buscamos la cabecera de autorización básica
    const basicAuth = req.headers.get('authorization');

    if (basicAuth) {
      // 3. Decodificamos el usuario y contraseña que envió el navegador
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      // 4. Comparamos con las variables de entorno (Tus claves secretas)
      if (user === process.env.ADMIN_USER && pwd === process.env.ADMIN_PASSWORD) {
        // Si coinciden, DEJAMOS PASAR a la página
        return NextResponse.next();
      }
    }

    // 5. Si no hay credenciales o son incorrectas, devolvemos error 401
    // Esto hace que el navegador muestre la ventanita de login nativa
    return new NextResponse('Autenticación Requerida', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  // Para cualquier otra ruta (como la home), dejamos pasar sin preguntar
  return NextResponse.next();
}

// Configuración: Solo ejecutamos esto en la ruta /admin
export const config = {
  matcher: '/admin/:path*',
};