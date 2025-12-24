'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../use-toast';
import { addSubSlider } from '@/lib/actions/slider/add-sub-slider.action';

export const useAddSubSlider = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (form: FormData) => addSubSlider(form),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sub-sliders'] });

      toast({
        description: 'تم إضافة السلايدر بنجاح 🎉',
      });
    },

    onError: (error: any) => {
      toast({
        variant: 'destructive',
        description: error.message || 'حدث خطأ أثناء إضافة السلايدر',
      });
    },
  });
};
