import { z } from 'zod';

// -------------------------
// Add Product Schema
// -------------------------

export const addProductSchema = z
  .object({
    name: z.string().min(1, 'اسم المنتج مطلوب'),
    description: z.string().optional(),

    price: z.coerce
      .number()
      .min(1, 'السعر مطلوب')
      .refine((val) => val > 0, 'السعر يجب أن يكون أكبر من 0'),

    oldPrice: z.coerce.number().default(0),

    costPrice: z.coerce
      .number()
      .min(1, 'سعر الجملة مطلوب')
      .refine((val) => val >= 0, 'سعر الجملة غير صالح'),

    quantity: z.coerce
      .number()
      .min(1, 'الكمية مطلوبة')
      .refine((val) => val >= 0, 'الكمية غير صالحة'),

    status: z.coerce.number().refine((val) => val === 0 || val === 1, 'الحالة مطلوبة'),

    category: z.string().min(1, 'الفئة مطلوبة'),

    unitType: z.coerce.number().min(0, 'الوحدة مطلوبة'),

    isFreeShipping: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (data.oldPrice === 0) return true;
      return data.oldPrice > data.price;
    },
    {
      message: 'السعر قبل الخصم يجب أن يكون أعلى من السعر الحالي',
      path: ['oldPrice'],
    }
  );

// -------------------------
// Edit Product Schema
// -------------------------

export const editProductSchema = z
  .object({
    name: z.string().min(1, 'اسم المنتج مطلوب').optional(),

    description: z.string().optional(),

    price: z.coerce
      .number()
      .optional()
      .refine((val) => (val === undefined ? true : val > 0), 'السعر يجب أن يكون أكبر من 0'),

    oldPrice: z.coerce.number().optional().default(0),

    costPrice: z.coerce
      .number()
      .optional()
      .refine((val) => (val === undefined ? true : val >= 0), 'سعر الجملة غير صالح'),

    quantity: z.coerce
      .number()
      .optional()
      .refine((val) => (val === undefined ? true : val >= 0), 'الكمية غير صالحة'),

    status: z.coerce.number().optional(),

    category: z.string().optional(),

    unitType: z.coerce.number().optional(),

    isFreeShipping: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (data.oldPrice === 0) return true;

      // لازم price يكون موجود عشان نقارن
      if (data.price === undefined) return true;

      return data.oldPrice > data.price;
    },
    {
      message: 'السعر قبل الخصم يجب أن يكون أعلى من السعر الحالي',
      path: ['oldPrice'],
    }
  );
