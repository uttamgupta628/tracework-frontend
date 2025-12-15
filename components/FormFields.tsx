import React, { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface BaseProps {
    label: string;
    error?: FieldError;
    required?: boolean;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, BaseProps {}
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement>, BaseProps {
    options: { value: string; label: string }[];
}
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, BaseProps {}

const labelClasses = "block text-sm font-medium text-gray-700 mb-1";
const inputClasses = "w-full rounded border border-gray-300 px-3 py-2 text-gray-700 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500";
const errorClasses = "mt-1 text-xs text-red-500";

export const FormInput = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, required, className, ...props }, ref) => (
        <div className={`mb-4 ${className}`}>
            <label className={labelClasses}>
                {label} {required && <span className="text-orange-500">*</span>}
            </label>
            <input ref={ref} className={inputClasses} {...props} />
            {error && <p className={errorClasses}>{error.message}</p>}
        </div>
    )
);
FormInput.displayName = 'FormInput';

export const FormSelect = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, required, options, ...props }, ref) => (
        <div className="mb-4">
            <label className={labelClasses}>
                {label} {required && <span className="text-orange-500">*</span>}
            </label>
            <select ref={ref} className={`${inputClasses} bg-white`} {...props}>
                <option value="">Select...</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
            {error && <p className={errorClasses}>{error.message}</p>}
        </div>
    )
);

FormSelect.displayName = 'FormSelect';

export const FormTextarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, error, required, ...props }, ref) => (
        <div className="mb-4">
            <label className={labelClasses}>
                {label} {required && <span className="text-orange-500">*</span>}
            </label>
            <textarea ref={ref} className={inputClasses} rows={4} {...props} />
            {error && <p className={errorClasses}>{error.message}</p>}
        </div>
    )
);

FormTextarea.displayName = 'FormTextarea';