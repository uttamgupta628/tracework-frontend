import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormInput, FormSelect } from '@/components/FormFields';
import { BankingInfoFormValues } from '@/lib/schemas';

export const BankingInfoTab = () => {
    const { register, formState: { errors } } = useFormContext<BankingInfoFormValues>();

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                    label="Account Holder Name"
                    required
                    placeholder="Name as per Bank Records"
                    {...register('accountHolderName')}
                    error={errors.accountHolderName}
                />

                <FormInput
                    label="Bank Name"
                    required
                    placeholder="e.g. HDFC Bank"
                    {...register('bankName')}
                    error={errors.bankName}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                <FormInput
                    label="Account Number"
                    required
                    type="password" // Masked for security initially
                    {...register('accountNumber')}
                    error={errors.accountNumber}
                />

                <FormInput
                    label="Re-enter Account Number"
                    required
                    type="text"
                    onPaste={(e) => e.preventDefault()}
                    {...register('confirmAccountNumber')}
                    error={errors.confirmAccountNumber}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
                <FormInput
                    label="IFSC Code"
                    required
                    placeholder="e.g. SBIN0004321"
                    className="uppercase"
                    maxLength={11}
                    {...register('ifscCode')}
                    error={errors.ifscCode}
                />

                <FormSelect
                    label="Account Type"
                    required
                    {...register('accountType')}
                    error={errors.accountType}
                    options={[
                        { value: 'savings', label: 'Savings Account' },
                        { value: 'current', label: 'Current Account' },
                        { value: 'salary', label: 'Salary Account' },
                    ]}
                />

                <FormInput
                    label="Branch Name"
                    {...register('branchName')}
                    error={errors.branchName}
                />
            </div>

        </div>
    );
};