'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../use-toast';
import { addUser } from '@/lib/actions/Admins/addUser.action';

export const useAddUser = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (form: FormData) => {
      const result = await addUser(form);

      if (!result.success) {
        throw result;
      }

      return result.data;
    },

    onSuccess: () => {
      // ✅ Invalidate admin-users query to trigger refetch
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });

      toast({
        description: 'تم إضافة المستخدم بنجاح 🎉',
      });
    },

    onError: (error: any) => {
      if (error?.errors && typeof error.errors === 'object') {
        const firstKey = Object.keys(error.errors)[0];
        const msg = Array.isArray(error.errors[firstKey])
          ? error.errors[firstKey][0]
          : String(error.errors[firstKey]);

        toast({
          variant: 'destructive',
          description: msg,
        });
        return;
      }

      if (error?.message) {
        toast({
          variant: 'destructive',
          description: error.message,
        });
        return;
      }

      toast({
        variant: 'destructive',
        description: 'حدث خطأ أثناء إضافة المستخدم',
      });
    },
  });
};
