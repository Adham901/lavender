'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../use-toast';
import {
  bulkUpdateOrdersStatus,
  BulkUpdateOrdersStatusPayload,
} from '@/lib/actions/orders/orders.action';

export function useBulkUpdateOrdersStatus() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (payload: BulkUpdateOrdersStatusPayload) => {
      const result = await bulkUpdateOrdersStatus(payload);

      // ✅ Check if result indicates failure
      if (!result.success) {
        throw result;
      }

      return result.data;
    },

    onSuccess: () => {
      toast({
        title: 'تم تحديث حالة الطلبات',
        description: 'تمت العملية بنجاح',
      });

      // ✅ Invalidate orders query to trigger refetch
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },

    onError: (error: any) => {
      toast({
        title: 'خطأ',
        description: error.message || 'حدث خطأ أثناء التحديث',
        variant: 'destructive',
      });
    },
  });
}
