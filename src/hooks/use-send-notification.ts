'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from './use-toast';
import { sendNotification } from '@/lib/actions/send-notification.action';

export const useSendNotification = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (form: FormData) => sendNotification(form),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });

      toast({
        description: 'تم إرسال الإشعار بنجاح 🔔',
      });
    },

    onError: (error: any) => {
      toast({
        variant: 'destructive',
        description: error.message || 'حدث خطأ ما، حاول مرة أخرى',
      });
    },
  });
};
