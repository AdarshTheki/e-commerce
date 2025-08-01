import React, { useId } from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    const id = useId();
    return (
      <div className="flex flex-col gap-0.5 w-full">
        {props.name && (
          <label
            htmlFor={props.name || id}
            className="capitalize text-sm font-medium text-gray-700">
            {props.name}
          </label>
        )}
        <input
          id={props.name || id}
          placeholder={cn('Please enter', props.name)}
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border py-2 px-4 border-gray-400',
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
