// app/(auth)/login/page.tsx
'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Sprout } from 'lucide-react'; // Import ikon

import { LoginSchema, TLoginSchema } from '@/validators/auth';
import { loginUser } from '@/actions/auth-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false); // State untuk toggle password

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: TLoginSchema) => {
    setError(null);
    startTransition(async () => {
      const result = await loginUser(data);
      if (result.success) {
        router.push('/articles');
        router.refresh();
      } else {
        setError(result.message);
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="items-center text-center">
          {/* Ganti dengan Logo Anda */}
          <div className="flex items-center gap-2 mb-4">
            <Sprout className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold tracking-tight">LogoIpsum</span>
          </div>
          {/* Judul dihilangkan agar fokus pada logo */}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Username</Label>
              <Input
                {...register('email')}
                id="email"
                type="email"
                placeholder="Username"
                className="py-6" // Membuat input lebih tinggi
              />
              {errors.email && <p className="text-sm text-red-500 pt-1">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  {...register('password')}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="py-6 pr-10" // Padding kanan untuk ikon
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-red-500 pt-1">{errors.password.message}</p>}
            </div>

            {error && <p className="text-sm text-center text-red-500">{error}</p>}

            <Button type="submit" className="w-full py-6 text-base" disabled={isPending}>
              {isPending ? 'Loading...' : 'Login'}
            </Button>

            <p className="text-center text-sm text-slate-600 dark:text-slate-400">
              Don't have an account?{' '}
              <Link href="/register" className="font-medium text-blue-600 hover:underline">
                Register
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
