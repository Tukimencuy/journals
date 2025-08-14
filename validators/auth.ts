// src/validators/auth.ts
import { z } from 'zod';

// ... Skema Login yang sudah ada ...
export const LoginSchema = z.object({
  email: z.string().email({ message: 'Format email tidak valid.' }),
  password: z.string().min(6, { message: 'Password minimal harus 6 karakter.' }),
});
export type TLoginSchema = z.infer<typeof LoginSchema>;

// Skema Baru untuk Register
export const RegisterSchema = z.object({
  name: z.string().min(3, { message: 'Nama minimal harus 3 karakter.' }),
  email: z.string().email({ message: 'Format email tidak valid.' }),
  password: z.string().min(6, { message: 'Password minimal harus 6 karakter.' }),
  // tambahkan role jika diperlukan oleh API, contoh:
  // role: z.enum(['User', 'Admin']).default('User'),
});

export type TRegisterSchema = z.infer<typeof RegisterSchema>;
