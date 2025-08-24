import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  const id = React.useId();

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
        {...props}
      />
    </div>
  );
}

export default Input;
