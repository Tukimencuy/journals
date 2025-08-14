// /middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Ambil token dari cookies
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  // Jika tidak ada token dan pengguna mencoba mengakses halaman yang dilindungi
  if (!token) {
    // Arahkan ke halaman login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Jika ada token dan pengguna mencoba mengakses halaman login/register,
  // arahkan mereka ke halaman utama (list artikel)
  if (token && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/articles', request.url));
  }

  // Jika semua kondisi aman, lanjutkan request
  return NextResponse.next();
}

// Tentukan rute mana yang akan dijalankan oleh middleware ini
export const config = {
  matcher: [
    /*
     * Cocokkan semua path KECUALI yang berikut:
     * - /api (rute API)
     * - /_next/static (file statis)
     * - /_next/image (file optimisasi gambar)
     * - favicon.ico (file ikon)
     * - Rute yang sudah ada di dalam (auth) group
     */
    '/((?!api|_next/static|_next/image|favicon.ico|login|register).*)',
    // matcher ini akan melindungi semua halaman kecuali /login dan /register
  ],
};
