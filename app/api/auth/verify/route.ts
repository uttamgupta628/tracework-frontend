import { NextRequest, NextResponse } from 'next/server';
import { createCompanyGrpcClient } from '@/lib/grpc-client';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, code } = body;

        const client = await createCompanyGrpcClient();

        const response: any = await new Promise((resolve, reject) => {
            client.VerifyEmail({ email, code }, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });

        if (response.success) {
            return NextResponse.json({ success: true, message: 'Email verified successfully' });
        } else {
            return NextResponse.json({ success: false, message: 'Verification failed' }, { status: 400 });
        }
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.details || 'Invalid code or email' },
            { status: 400 }
        );
    }
}