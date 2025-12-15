'use client';

import {useState, useRef, useEffect} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import Image from 'next/image';

export default function VerificationForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email'); // Get email passed from Register
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(30);
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(countdown);
    }, []);

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) return;
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
        if (value && index < 5) inputRefs.current[index + 1]?.focus();
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            alert("Email not found. Please register again.");
            return;
        }

        setLoading(true);
        const verificationCode = code.join('');

        try {
            const res = await fetch('/api/auth/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code: verificationCode }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                alert('Verification Successful!');
                router.push('/auth/login'); // Redirect to login
            } else {
                alert(data.message || 'Verification failed');
            }
        } catch (error) {
            alert('An error occurred during verification');
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = () => {
        setTimer(30);
        // Add resend code logic here
        console.log('Resending code...');
    };

    return (
        <section className="min-h-screen bg-gray-50 pt-20">
            <div className="w-full py-12">
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* ... Image Side ... */}
                    <div className="relative h-[755px] w-[800px] overflow-hidden shadow-xl">
                        <Image src="/images/landing-hero1.png" alt="Hero" fill className="object-cover" />
                    </div>

                    {/* ... Form Side ... */}
                    <div className="max-w-xl mx-auto px-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Enter verification code</h2>
                        <p className="text-gray-600 text-sm mb-8">Sent to {email}</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="flex gap-3 justify-center mb-4">
                                {code.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => { inputRefs.current[index] = el; }}
                                        type="text"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FDD835] outline-none"
                                    />
                                ))}
                            </div>
                            {/* ... Timer & Resend ... */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 mt-2 bg-[#0A0A3D] text-white font-bold rounded-md hover:bg-[#14145A] transition-colors disabled:opacity-50"
                            >
                                {loading ? 'Verifying...' : 'Verify'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
