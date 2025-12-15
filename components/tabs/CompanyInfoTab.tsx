import React from 'react';
import {useFormContext} from 'react-hook-form';
import {FormInput, FormSelect, FormTextarea} from '@/components/FormFields';
import {CompanyInfoFormValues} from '@/lib/schemas';

export const CompanyInfoTab = () => {
    const {register, formState: {errors}} = useFormContext<CompanyInfoFormValues>();

    return (
        <div className="space-y-6">
            <FormInput
                label="Company Name as per MCA"
                required
                {...register('companyName')}
                error={errors.companyName}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormInput label="Company PAN" required {...register('pan')} error={errors.pan}/>
                <FormInput label="Company GST" required {...register('gst')} error={errors.gst}/>
                <FormInput label="Company TAN" required {...register('tan')} error={errors.tan}/>
            </div>

            {/* Logo Upload */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Logo <span className="text-orange-500">*</span>
                </label>
                <div className="border border-gray-300 rounded p-2 flex items-center bg-white h-[42px]">
                    <input type="file" className="hidden" id="logo-upload" {...register('logo')} />
                    <label htmlFor="logo-upload"
                           className="text-orange-500 text-sm font-medium cursor-pointer hover:underline">
                        Upload Picture
                    </label>
                </div>
            </div>

            <FormInput label="Company Website" required {...register('website')} error={errors.website}
                       placeholder="URL"/>

            <FormSelect
                label="Company Domain"
                required
                {...register('domain')}
                error={errors.domain}
                options={[
                    {value: 'tech', label: 'Technology'},
                    {value: 'finance', label: 'Finance'},
                    {value: 'health', label: 'Healthcare'},
                ]}
            />

            <FormInput label="Company Strength" required {...register('strength')} error={errors.strength}/>

            <FormTextarea label="Company Description" required {...register('description')} error={errors.description}/>
        </div>
    );
};