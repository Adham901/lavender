'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../use-toast';
import { deleteCategory } from '@/lib/actions/category/delete-category.action';

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: number) => deleteCategory(id),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });

      toast({
        description: 'تم حذف القسم بنجاح 🗑️',
      });

      return data;
    },

    onError: (error: any) => {
      toast({
        variant: 'destructive',
        description: error.message || 'حدث خطأ أثناء حذف القسم',
      });
    },
  });
};
