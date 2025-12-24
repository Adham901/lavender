import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap capitalize rounded-[0.625rem] text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-purple-600 text-white hover:bg-purple-700 border border-purple-600 ' +
          'dark:bg-purple-500 dark:hover:bg-purple-600 dark:border-purple-500 ' +
          'disabled:bg-zinc-300 disabled:text-zinc-500 disabled:border-zinc-300 ' +
          'dark:disabled:bg-zinc-700 dark:disabled:text-zinc-600 dark:disabled:border-zinc-600',

        destructive:
          'bg-purple-50 text-purple-700 hover:bg-purple-100 ' +
          'dark:text-purple-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 ' +
          'disabled:bg-zinc-300 disabled:text-zinc-500 ' +
          'dark:disabled:bg-zinc-700 dark:disabled:bg-zinc-600',

        outline:
          'border border-purple-600 text-purple-700 bg-white hover:bg-purple-50 ' +
          'dark:text-purple-300 dark:bg-zinc-800 dark:border-purple-300 dark:hover:bg-zinc-700 ' +
          'disabled:bg-zinc-100 disabled:text-zinc-400 disabled:border-zinc-300 ' +
          'dark:disabled:bg-zinc-800 dark:disabled:text-zinc-600 dark:disabled:border-zinc-600',

        secondary:
          'bg-zinc-50 text-zinc-800 border border-zinc-400 hover:bg-zinc-100 ' +
          'dark:bg-zinc-800 dark:text-zinc-50 dark:border-zinc-500 dark:hover:bg-zinc-700 ' +
          'disabled:bg-zinc-100 disabled:text-zinc-400 disabled:border-zinc-300 ' +
          'dark:disabled:bg-zinc-800 dark:disabled:text-zinc-600 dark:disabled:border-zinc-600',

        ghost:
          'bg-transparent text-purple-600 hover:bg-purple-50 ' +
          'dark:text-purple-300 dark:hover:bg-zinc-700 ' +
          'disabled:bg-zinc-100 disabled:text-zinc-400 ' +
          'dark:disabled:bg-zinc-700 dark:disabled:text-zinc-600',

        link: 'text-purple-600 underline-offset-4 hover:underline ' + 'dark:text-purple-400',

        subscribe:
          'rounded-full transition-none hover:none font-medium text-sm ' +
          'bg-purple-50 text-purple-700 dark:bg-purple-300 dark:text-zinc-800',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {children}
        {loading && <LoaderCircle className="ml-2 h-4 w-4 animate-spin" />}
      </Comp>
    );
  }
);

Button.displayName = 'Button';
export { Button, buttonVariants };
