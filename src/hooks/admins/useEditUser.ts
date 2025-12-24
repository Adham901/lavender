'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../use-toast';
import { editUser } from '@/lib/actions/Admins/editUser.action';

export const useEditUser = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, form }: { id: number; form: FormData | Record<string, any> }) => {
      const result = await editUser(id, form);

      // ✅ نرمي الخطأ لو success = false
      if (!result.success) throw result;

      return result.data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });

      toast({
        description: 'تم تعديل المستخدم بنجاح 🎉',
      });

      return data;
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
        description: 'حدث خطأ أثناء تعديل المستخدم',
      });
    },
  });
};
