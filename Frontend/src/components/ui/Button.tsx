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
            primary: 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95',
            secondary: 'bg-primary-light text-white hover:bg-primary shadow-lg shadow-primary-light/20 active:scale-95',
            outline: 'border-2 border-primary/30 text-primary-dark hover:bg-primary/5 hover:border-primary active:scale-95',
            ghost: 'text-primary-dark hover:bg-primary/10 active:scale-95',
        };

        const sizes: Record<string, string> = {
            sm: 'px-4 py-2 text-sm',
            md: 'px-6 py-3 text-base',
            lg: 'px-8 py-4 text-lg font-semibold',
            xl: 'px-10 py-5 text-xl font-bold',
            '2xl': 'px-12 py-6 text-2xl font-bold',
        };



        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={cn(
                    'inline-flex items-center justify-center rounded-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed font-display',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {isLoading ? (
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                ) : null}
                {children}
            </button>
        );
    }
);

