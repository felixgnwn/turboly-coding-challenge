import { type InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, className = '', ...props }, ref) => {
    const base =
      'rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50';

    const input = (
      <input
        ref={ref}
        id={id}
        className={`${base} ${className}`}
        {...props}
      />
    );

    if (!label) return input;

    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
        {input}
      </div>
    );
  }
);

Input.displayName = 'Input';
