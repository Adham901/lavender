'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../use-toast';
import { deleteSubSlider } from '@/lib/actions/slider/deleteSubSlider.action';

export const useDeleteSubSlider = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: number) => deleteSubSlider(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sub-sliders'] });

      toast({
        description: 'تم حذف السلايدر الفرعي بنجاح 🗑️',
      });
    },

    onError: (error: any) => {
      toast({
        variant: 'destructive',
        description: error.message || 'حدث خطأ أثناء حذف السلايدر الفرعي',
      });
    },
  });
};
