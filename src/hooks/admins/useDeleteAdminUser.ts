'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../use-toast';
import { deleteAdminUser } from '@/lib/actions/Admins/delete-user.action';

export const useDeleteAdminUser = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: number) => deleteAdminUser(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });

      toast({
        description: 'تم حذف المستخدم بنجاح 🗑️',
      });
    },

    onError: (error: any) => {
      toast({
        variant: 'destructive',
        description: error.message || 'حدث خطأ أثناء حذف المستخدم',
      });
    },
  });
};
