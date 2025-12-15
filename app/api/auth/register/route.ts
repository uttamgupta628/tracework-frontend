import { NextRequest, NextResponse } from 'next/server';
import { createCompanyGrpcClient } from '@/lib/grpc-client';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { companyName, email, password } = body;

        if (!companyName || !email || !password) {
            return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
        }

        const client = await createCompanyGrpcClient();

        const response = await new Promise((resolve, reject) => {
            client.Register({ companyName, email, password }, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            });
        });

        return NextResponse.json({ success: true, data: response });
    } catch (error: any) {
        console.error('Registration Error:', error);
        return NextResponse.json(
            { success: false, message: error.details || 'Registration failed' },
            { status: error.code === 6 ? 409 : 500 } // 6 = ALREADY_EXISTS
        );
    }
}