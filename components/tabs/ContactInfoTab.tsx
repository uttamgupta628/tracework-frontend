import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormInput, FormSelect } from '@/components/FormFields';
import { ContactInfoFormValues } from '@/lib/schemas';

export const ContactInfoTab = () => {
    const { register, formState: { errors } } = useFormContext<ContactInfoFormValues>();

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput label="Mobile no." required {...register('mobile')} error={errors.mobile} />
                <FormInput label="Email ID" required type="email" {...register('email')} error={errors.email} />
            </div>

            <div className="pt-2">
                <h3 className="text-gray-600 font-medium mb-4">Company Location Details</h3>
                <FormInput label="Company Address" required {...register('address')} error={errors.address} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormSelect
                        label="State"
                        required
                        {...register('state')}
                        error={errors.state}
                        options={[{value: 'MP', label: 'Madhya Pradesh'}, {value: 'MH', label: 'Maharashtra'}]}
                    />
                    <FormInput label="City" required {...register('city')} error={errors.city} />
                </div>

                <div className="w-full md:w-1/2 pr-0 md:pr-3">
                    <FormInput label="Pin Code" required {...register('pinCode')} error={errors.pinCode} />
                </div>
            </div>

            <div className="pt-2">
                <h3 className="text-gray-600 font-medium mb-4">Social Media Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput label="Linkedin" required {...register('linkedin')} error={errors.linkedin} />
                    <FormInput label="Instagram" required {...register('instagram')} error={errors.instagram} />
                </div>
                <div className="w-full md:w-1/2 pr-0 md:pr-3">
                    <FormInput label="Twitter" required {...register('twitter')} error={errors.twitter} />
                </div>
            </div>
        </div>
    );
};