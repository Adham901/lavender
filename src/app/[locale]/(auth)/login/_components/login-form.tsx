'use client';

import SubmissionMessage from '@/components/shared/submission-message';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { LoginValues, useLoginSchema } from '@/lib/schemes/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import useLogin from '../_hooks/use-login';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginForm() {
  const { loginSchema } = useLoginSchema();
  const searchParams = useSearchParams();
  const [showExpiredMessage, setShowExpiredMessage] = useState(false);

  // ✅ Check if session expired
  useEffect(() => {
    if (searchParams.get('expired') === 'true') {
      setShowExpiredMessage(true);
      // Auto-hide after 8 seconds
      const timer = setTimeout(() => setShowExpiredMessage(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const methods = useForm<LoginValues>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const { isPending, error, login } = useLogin();

  const onSubmit: SubmitHandler<LoginValues> = (values) => {
    login(values);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50 px-4">
      <div className="bg-white shadow-xl rounded-3xl w-full max-w-md px-8 py-5 text-center border border-purple-200">
        {/* ✅ Session Expired Alert */}
        {/* {showExpiredMessage && (
          <div className="mb-4 bg-amber-50 border-2 border-amber-300 rounded-xl p-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-start gap-3 text-right">
              <div className="flex-shrink-0 mt-0.5">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-amber-900 font-semibold text-sm mb-1">انتهت صلاحية الجلسة</h3>
                <p className="text-amber-700 text-xs leading-relaxed">
                  لأسباب أمنية، تم تسجيل خروجك تلقائياً. الرجاء تسجيل الدخول مرة أخرى للمتابعة.
                </p>
              </div>
              <button
                onClick={() => setShowExpiredMessage(false)}
                className="flex-shrink-0 text-amber-600 hover:text-amber-800 transition-colors"
                aria-label="إغلاق"
              >
                ×
              </button>
            </div>
          </div>
        )} */}

        {/* Logo */}
        <div className="flex justify-center ">
          <Image
            src="/assets/images/nourlogo.png"
            alt="Logo"
            width={200}
            height={200}
            className="object-contain drop-shadow-[0_0_5px_rgba(0,0,0,0.5)]"
          />
        </div>

        {/* Welcome text */}
        <h2 className="text-gray-900 text-lg mb-1 font-medium">أهلاً بك في</h2>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-1 tracking-wide">نور الصباح </h1>
        <h2 className="text-3xl font-extrabold text-purple-600 mb-1 tracking-wide">Dashdoard </h2>

        {/* Form */}
        <FormProvider {...methods}>
          <Form {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="text-right">
              {/* Username */}
              <FormField
                name="username"
                control={methods.control}
                render={({ field }) => (
                  <FormItem className="mb-6">
                    <FormLabel className="text-gray-800 font-medium">اسم المستخدم</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="اسم المستخدم"
                        type="text"
                        className="text-right rounded-xl border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 shadow-sm transition-all"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 mt-1" />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                name="password"
                control={methods.control}
                render={({ field }) => (
                  <FormItem className="mb-6">
                    <FormLabel className="text-gray-800 font-medium">كلمة المرور</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        placeholder="********"
                        type="password"
                        className="text-right rounded-xl border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 shadow-sm transition-all"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 mt-1" />
                  </FormItem>
                )}
              />

              {/* Error Message */}
              <SubmissionMessage>{error?.message}</SubmissionMessage>

              {/* Login Button */}
              <Button
                variant="default"
                type="submit"
                loading={isPending}
                disabled={
                  isPending || (!methods.formState.isValid && methods.formState.isSubmitted)
                }
                className="capitalize w-full mt-5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl py-4 text-lg font-semibold shadow-md transition-all"
              >
                تسجيل الدخول
              </Button>
            </form>
          </Form>
        </FormProvider>
      </div>
    </div>
  );
}
