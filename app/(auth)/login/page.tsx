// src/app/(auth)/login/page.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, TLoginSchema } from '@/validators/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: TLoginSchema) => {
    try {
      // Logic untuk hit API login
      const response = await api.post('/login', data);

      // TODO: Simpan token dari response.data.token (misalnya di cookie)

      console.log('Login berhasil:', response.data);
      alert('Login berhasil!'); // Placeholder untuk success message

      // Redirect ke halaman list artikel setelah sukses [cite: 10]
      router.push('/articles');
    } catch (error: any) {
      // Contoh handling error
      console.error('Login gagal:', error);
      setError('root', {
        type: 'manual',
        message: error.response?.data?.message || 'Email atau password salah.',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Masukkan email dan password Anda untuk masuk.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              {isSubmitting ? 'Loading...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
