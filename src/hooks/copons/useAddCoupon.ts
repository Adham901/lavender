'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../use-toast';
import { addCoupon } from '@/lib/actions/copons/add-coupon.action';

export const useAddCoupon = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: {
      code: string;
      type: 'percentage' | 'fixed';
      value: number | string;
      min_order_amount: number | string;
      max_discount: number | string;
      usage_limit: number;
      per_user_limit: number;
      starts_at: string;
      expires_at: string;
      is_active: 0 | 1 | boolean;
    }) => addCoupon(data),

    onSuccess: (res) => {
      // تحديث كاش الكوبونات
      queryClient.invalidateQueries({ queryKey: ['coupons'] });

      toast({
        description: res?.message || 'تمت إضافة الكوبون بنجاح 🎉',
      });
    },

    onError: (error: any) => {
      toast({
        variant: 'destructive',
        description: error?.message || 'حدث خطأ أثناء إضافة الكوبون',
      });
    },
  });
};
