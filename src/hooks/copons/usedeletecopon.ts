'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../use-toast';
import { deleteCoupon } from '@/lib/actions/copons/delete-copons.action';

export const useDeleteCoupon = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: number) => deleteCoupon(id),

    onSuccess: () => {
      // إعادة جلب بيانات الكوبونات بعد الحذف
      queryClient.invalidateQueries({ queryKey: ['coupons'] });

      toast({
        description: 'تم حذف الكوبون بنجاح 🗑️',
      });
    },

    onError: (error: any) => {
      toast({
        variant: 'destructive',
        description: error.message || 'حدث خطأ أثناء حذف الكوبون',
      });
    },
  });
};
