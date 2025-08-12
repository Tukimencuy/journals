// src/actions/auth-actions.ts
'use server'; // Menandakan ini adalah Server Action

import api from '@/lib/axios';
import { TLoginSchema } from '@/validators/auth';
import { cookies } from 'next/headers';

// Definisikan struktur data yang diharapkan dari API
interface LoginSuccessResponse {
  message: string;
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: 'User' | 'Admin';
  };
}

export async function loginUser(data: TLoginSchema) {
  try {
    const response = await api.post<LoginSuccessResponse>('/login', data);

    const { token, user } = response.data;

    // Simpan token di httpOnly cookie
    cookies().set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    // Simpan juga role pengguna untuk kemudahan di client
    cookies().set('user_role', user.role, {
      httpOnly: false, // Boleh diakses client
      path: '/',
    });

    return { success: true, message: 'Login berhasil!', role: user.role };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Email atau password salah.',
    };
  }
}
