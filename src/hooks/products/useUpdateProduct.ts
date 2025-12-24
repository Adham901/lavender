'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../use-toast';
import { updateProduct } from '@/lib/actions/products/updateProduct.action';

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, form }: { id: number; form: FormData }) => {
      const result = await updateProduct(id, form);

      // ❗ لو success false → نرمي الريسبونس كله
      if (!result.success) {
        throw result;
      }

      return result.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });

      toast({
        description: 'تم تعديل المنتج بنجاح 🎉',
      });
    },

    onError: (error: any) => {
      // ❗ Validation Errors
      if (error?.errors && typeof error.errors === 'object') {
        const firstKey = Object.keys(error.errors)[0];
        const msg = Array.isArray(error.errors[firstKey])
          ? error.errors[firstKey][0]
          : String(error.errors[firstKey]);

        toast({
          variant: 'destructive',
          description: msg,
        });
        return;
      }

      // ❗ API message
      if (error?.message) {
        toast({
          variant: 'destructive',
          description: error.message,
        });
        return;
      }

      // fallback
      toast({
        variant: 'destructive',
        description: 'حدث خطأ أثناء تعديل المنتج',
      });
    },
  });
};
