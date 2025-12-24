'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../use-toast';
import { updateProductMedia } from '@/lib/actions/products/updateProductMedia.action';

export const useUpdateProductMedia = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, form }: any) => updateProductMedia(id, form),

    onSuccess: () => {
      toast({ description: 'تم تعديل الصورة بنجاح 🎉' });

      // ⭐ أهم جزء
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product-by-id'] });
    },

    onError: (err: any) => {
      toast({
        variant: 'destructive',
        description: err.message || 'حدث خطأ أثناء تعديل الصورة',
      });
    },
  });
};
