import { type InputHTMLAttributes, forwardRef } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, id, className = '', ...props }, ref) => {
    const input = (
      <input
        ref={ref}
        id={id}
        type="checkbox"
        className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${className}`}
        {...props}
      />
    );

    if (!label) return input;

    return (
      <label htmlFor={id} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
        {input}
        {label}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
