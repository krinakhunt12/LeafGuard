import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
        const variants = {
            primary:   'bg-primary text-white hover:bg-primary-dark active:scale-[0.98] transition-all duration-200',
            secondary: 'bg-primary-light text-white hover:bg-primary active:scale-[0.98] transition-all duration-200',
            outline:   'border border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-slate-900 hover:border-white active:scale-[0.98] transition-all duration-200',
            ghost:     'text-primary hover:bg-primary/8 active:scale-[0.98] transition-all duration-200',
        };

        const sizes: Record<string, string> = {
            sm:  'px-4 py-2 text-sm',
            md:  'px-5 py-2.5 text-sm',
            lg:  'px-7 py-3.5 text-base font-semibold',
            xl:  'px-9 py-4 text-lg font-semibold',
            '2xl': 'px-12 py-5 text-xl font-semibold',
        };

        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={cn(
                    'inline-flex items-center justify-center gap-2 rounded-xl font-display font-medium',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-1',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {isLoading ? (
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                ) : null}
                {children}
            </button>
        );
    }
);
