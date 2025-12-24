'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../use-toast';
import { addArea } from '@/lib/actions/areas/add-area.action';

export const useAddArea = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: { name: string; price: number | string }) => addArea(data),

    onSuccess: (res) => {
      // تحديث كاش مناطق الشحن
      queryClient.invalidateQueries({ queryKey: ['areas'] });

      toast({
        description: res?.message || 'تمت إضافة المنطقة بنجاح 🎉',
      });
    },

    onError: (error: any) => {
      toast({
        variant: 'destructive',
        description: error?.message || 'حدث خطأ أثناء إضافة المنطقة',
      });
    },
  });
};
