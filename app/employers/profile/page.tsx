"use client";
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    companyInfoSchema,
    contactInfoSchema,
    bankingInfoSchema,
    CompanyInfoFormValues,
    ContactInfoFormValues,
    BankingInfoFormValues
} from '@/lib/schemas';
import { CompanyInfoTab } from '@/components/tabs/CompanyInfoTab';
import { ContactInfoTab } from '@/components/tabs/ContactInfoTab';
import { BankingInfoTab } from "@/components/tabs/BankingInfoTab";

// Union type for form values
type FormValues = Partial<CompanyInfoFormValues> & Partial<ContactInfoFormValues> & Partial<BankingInfoFormValues>;

export default function MyProfile() {
    const [activeTab, setActiveTab] = useState<'company' | 'contact' | 'banking'>('company');

    // Select schema based on the active tab
    const currentSchema =
        activeTab === 'company' ? companyInfoSchema :
            activeTab === 'contact' ? contactInfoSchema :
                bankingInfoSchema;

    const methods = useForm<FormValues>({
        // @ts-expect-error - Dynamic resolvers are tricky for TS inference
        resolver: zodResolver(currentSchema),
        mode: 'onBlur',
        shouldUnregister: false,
    });

    const onSubmit = (data: FormValues) => {
        console.log('Saving data for tab:', activeTab, data);
    };

    const tabs = [
        { id: 'company', label: 'Company Information' },
        { id: 'contact', label: 'Contact Information' },
        { id: 'banking', label: 'Banking Information' },
    ] as const;

    return (
        <div className="w-full max-w-5xl mx-auto">
            {/* Page Title - Clean text, no background box */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
            </div>

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>

                    {/* Main Card Container */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-24">

                        <div className="border-b border-gray-200 px-6 pt-4">
                            <nav className="-mb-px flex space-x-8">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`
                                            whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200
                                            ${activeTab === tab.id
                                            ? 'border-orange-500 text-orange-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                                        `}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Form Content Area */}
                        <div className="p-6 md:p-8">
                            {activeTab === 'company' && <CompanyInfoTab />}
                            {activeTab === 'contact' && <ContactInfoTab />}
                            {activeTab === 'banking' && <BankingInfoTab />}
                        </div>
                    </div>

                    {/* Fixed Footer */}
                    <div className="fixed bottom-0 right-0 left-0 md:left-64 bg-white border-t border-gray-200 p-4 flex justify-end items-center gap-4 z-40 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] transition-all duration-300">
                        <button
                            type="button"
                            className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium text-sm transition-colors"
                            onClick={() => methods.reset()}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-[#0a1128] text-white rounded-lg hover:bg-[#1a2340] font-medium text-sm shadow-sm transition-colors"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}