'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../use-toast';
import { deleteArea } from '@/lib/actions/areas/deleteArea.action';

export const useDeleteArea = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: number) => deleteArea(id),

    onSuccess: () => {
      // إعادة جلب بيانات المناطق بعد الحذف
      queryClient.invalidateQueries({ queryKey: ['areas'] });

      toast({
        description: 'تم حذف المنطقة بنجاح 🗑️',
      });
    },

    onError: (error: any) => {
      toast({
        variant: 'destructive',
        description: error.message || 'حدث خطأ أثناء حذف المنطقة',
      });
    },
  });
};
