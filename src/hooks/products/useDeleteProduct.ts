'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../use-toast';
import { deleteProduct } from '@/lib/actions/products/deleteProduct.action';

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: number) => deleteProduct(id),

    onSuccess: (data) => {
      // إعادة جلب بيانات المنتجات بعد الحذف
      queryClient.invalidateQueries({ queryKey: ['products'] });

      toast({
        description: 'تم حذف المنتج بنجاح 🗑️',
      });

      return data;
    },

    onError: (error: any) => {
      toast({
        variant: 'destructive',
        description: error.message || 'حدث خطأ أثناء حذف المنتج',
      });
    },
  });
};
