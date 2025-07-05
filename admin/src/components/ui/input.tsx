import React, { useId } from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
    ({ className, type, ...props }, ref) => {
        const id = useId();
        return (
            <div className="flex flex-col gap-1 w-full">
                {props.name && (
                    <label htmlFor={props.name || id} className="capitalize">
                        {props.name}
                    </label>
                )}
                <input
                    id={props.name || id}
                    placeholder={cn('Please enter', props.name)}
                    type={type}
                    className={cn(
                        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-500 placeholder:capitalize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
