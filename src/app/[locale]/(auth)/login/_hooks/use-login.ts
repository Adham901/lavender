'use client';

import { LoginValues } from '@/lib/schemes/auth.schema';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';

export default function useLogin() {
  const router = useRouter();
  const pathname = usePathname(); // ممكن نستخدمه لمعرفة locale الحالي
  const locale = pathname.split('/')[1]; // ناخد قيمة [locale] من المسار

  const { error, isPending, mutate } = useMutation({
    mutationFn: async (values: LoginValues) => {
      const response = await signIn('credentials', {
        ...values,
        redirect: false, // false عشان نتحكم بالـ redirect
      });

      if (response?.error) {
        throw new Error(response.error);
      }

      // بعد نجاح اللوجين نعمل redirect للصفحة المطلوبة
      router.push(`/${locale}/main`);
    },
  });

  return { error, isPending, login: mutate };
}
