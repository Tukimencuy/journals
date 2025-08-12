// src/app/(auth)/register/page.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, TRegisterSchema } from '@/validators/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: TRegisterSchema) => {
    try {
      const response = await api.post('/register', data);
      console.log('Registrasi berhasil:', response.data);
      alert('Registrasi berhasil! Silakan login.');

      // Redirect ke halaman login setelah sukses register
      router.push('/login');
    } catch (error: any) {
      console.error('Registrasi gagal:', error);
      setError('root', {
        type: 'manual',
        message: error.response?.data?.message || 'Registrasi gagal, coba lagi.',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>Buat akun baru untuk memulai.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama</Label>
              <Input {...register('name')} id="name" type="text" placeholder="John Doe" />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input {...register('email')} id="email" type="email" placeholder="m@example.com" />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input {...register('password')} id="password" type="password" />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>
            {errors.root && <p className="text-sm text-red-500">{errors.root.message}</p>}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Loading...' : 'Buat Akun'}
            </Button>

            <p className="text-center text-sm text-gray-600">
              Sudah punya akun?{' '}
              <Link href="/login" className="font-medium text-blue-600 hover:underline">
                Login di sini
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
