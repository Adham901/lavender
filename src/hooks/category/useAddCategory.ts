'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../use-toast';
import { addCategory } from '@/lib/actions/category/add-category.action';

export const useAddCategory = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (form: FormData) => {
      const result = await addCategory(form);

      // ✅ Check if result indicates failure
      if (!result.success) {
        throw result; // Now throw the actual error object
      }

      return result.data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });

      toast({
        description: 'تم إضافة القسم بنجاح 🎉',
      });

      return data;
    },

    onError: (error: any) => {
      // ✅ Handle validation errors from backend
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

      // ✅ Handle message
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
        description: 'حدث خطأ أثناء إضافة القسم',
      });
    },
  });
};
