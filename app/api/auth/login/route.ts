import { NextRequest, NextResponse } from 'next/server';
import { createCompanyGrpcClient } from '@/lib/grpc-client';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        const client = await createCompanyGrpcClient();

        const response: any = await new Promise((resolve, reject) => {
            client.ValidateCredentials({ email, password }, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });

        if (response.success && response.company) {
            const res = NextResponse.json({
                success: true,
                company: response.company,
                message: 'Login successful'
            });

            return res;
        }

        return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });

    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.details || 'Login failed' },
            { status: 401 }
        );
    }
}