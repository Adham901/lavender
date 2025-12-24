'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../use-toast';
import { updateArea } from '@/lib/actions/areas/updateArea.action';

export const useUpdateArea = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, form }: { id: number; form: FormData }) => updateArea(id, form),

    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['areas'] });

      toast({
        description: res?.message || 'تم تعديل المنطقة بنجاح 🎉',
      });
    },

    onError: (error: any) => {
      toast({
        variant: 'destructive',
        description: error?.message || 'حدث خطأ أثناء تعديل المنطقة',
      });
    },
  });
};
