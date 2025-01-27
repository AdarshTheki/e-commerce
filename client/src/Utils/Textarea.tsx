import React, { TextareaHTMLAttributes } from 'react';
import Label from './Label';

interface CustomTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    label: string;
    text?: string;
    className?: string;
}

const CustomTextarea: React.FC<CustomTextareaProps> = ({
    label,
    name,
    className = '',
    ...props
}) => {
    return (
        <div>
            <Label text={label} htmlFor={name} />
            <textarea
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}
                {...props}
            />
        </div>
    );
};

export default CustomTextarea;
