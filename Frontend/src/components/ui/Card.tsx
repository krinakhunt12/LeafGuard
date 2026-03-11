import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    animate?: boolean;
}

export const Card = ({ children, className, animate = true }: CardProps) => {
    return (
        <div
            className={cn(
                'bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden',
                animate && 'animate-fade-in',
                className
            )}
        >
            {children}
        </div>
    );
};

export const CardHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={cn('p-6', className)}>{children}</div>
);

export const CardContent = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={cn('p-6 pt-0', className)}>{children}</div>
);

export const CardFooter = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={cn('p-6 bg-slate-50 border-t border-slate-100', className)}>{children}</div>
);
