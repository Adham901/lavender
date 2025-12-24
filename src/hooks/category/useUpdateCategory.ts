'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../use-toast';
import { updateCategory } from '@/lib/actions/category/update-category.action';

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, form }: { id: number; form: FormData }) => updateCategory(id, form),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });

      toast({
        description: 'تم تعديل القسم بنجاح 🎉',
      });

      return data;
    },

    onError: (error: any) => {
      toast({
        variant: 'destructive',
        description: error.message || 'حدث خطأ أثناء تعديل القسم',
      });
    },
  });
};
