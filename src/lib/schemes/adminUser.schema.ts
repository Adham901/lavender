import { z } from 'zod';

export const addUserSchema = z
  .object({
    name: z.string().min(1, 'الاسم مطلوب'),

    username: z.string().min(1, 'اسم المستخدم مطلوب'),

    email: z.string().email('البريد الإلكتروني غير صالح').min(1, 'البريد الإلكتروني مطلوب'),

    phone: z
      .string()
      .regex(/^[0-9]{8,15}$/, 'رقم الهاتف يجب أن يحتوي على أرقام فقط بين 8 و 15 رقم'),

    address: z.string().optional(),

    password: z
      .string()
      .min(8, 'كلمة المرور يجب ألا تقل عن 8 أحرف')
      .regex(/[A-Z]/, 'يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل')
      .regex(/[a-z]/, 'يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل')
      .regex(/[0-9]/, 'يجب أن تحتوي كلمة المرور على رقم واحد على الأقل')
      .regex(/[^A-Za-z0-9]/, 'يجب أن تحتوي كلمة المرور على رمز خاص'),

    password_confirmation: z.string().min(1, 'تأكيد كلمة المرور مطلوب'),

    isActive: z.boolean(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'كلمتا المرور غير متطابقتين',
    path: ['password_confirmation'],
  });
export const editUserSchema = z.object({
  name: z.string().min(1, 'الاسم مطلوب').optional(),
  username: z.string().min(1, 'اسم المستخدم مطلوب').optional(),
  email: z.string().email('البريد الإلكتروني غير صالح').optional(),
  phone: z
    .string()
    .regex(/^[0-9]{8,15}$/, 'رقم الهاتف يجب أن يحتوي على أرقام فقط بين 8 و 15 رقم')
    .optional(),
  address: z.string().optional(),
  password: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true; // لو مش موجودة، تعتبر صحيحة
      return (
        val.length >= 8 &&
        /[A-Z]/.test(val) &&
        /[a-z]/.test(val) &&
        /[0-9]/.test(val) &&
        /[^A-Za-z0-9]/.test(val)
      );
    }, 'كلمة المرور يجب ألا تقل عن 8 أحرف وتحتوي على حرف كبير وصغير ورقم ورمز خاص'),

  isActive: z.boolean().optional(),
});
