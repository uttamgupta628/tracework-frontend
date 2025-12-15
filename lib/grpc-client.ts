import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import fs from 'fs';

interface CompanyServiceClient {
    CreateCompany: (req: any, cb: (err: any, res: any) => void) => void;
    GetCompany: (req: any, cb: (err: any, res: any) => void) => void;
    UpdateCompany: (req: any, cb: (err: any, res: any) => void) => void;
    GetCompanyFullDetails: (req: any, cb: (err: any, res: any) => void) => void;
    UpdateCompanyContact: (req: any, cb: (err: any, res: any) => void) => void;
    UpdateCompanyBanking: (req: any, cb: (err: any, res: any) => void) => void;

    Register: (req: any, cb: (err: any, res: any) => void) => void;
    VerifyEmail: (req: any, cb: (err: any, res: any) => void) => void;
    ValidateCredentials: (req: any, cb: (err: any, res: any) => void) => void;

    close: () => void;
}

let companyServiceClient: CompanyServiceClient | null = null;

export async function createCompanyGrpcClient(): Promise<CompanyServiceClient> {
    if (companyServiceClient) {
        return companyServiceClient;
    }

    try {
        let PROTO_PATH = path.join(
            process.cwd(),
            'proto/companies/v1/company.proto'
        );

        if (!fs.existsSync(PROTO_PATH)) {
            console.log('⚠️  Proto not found in Next.js project, trying NestJS location...');
            PROTO_PATH = path.join(
                process.cwd(),
                '../backend/libs/grpc-contracts/src/proto/definations/companies/v1/company.proto'
            );
        }

        if (!fs.existsSync(PROTO_PATH)) {
            throw new Error(`❌ Proto file not found at ${PROTO_PATH}`);
        }

        const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
        });

        const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;

        const companyPackage = protoDescriptor.companies?.v1;

        if (!companyPackage || !companyPackage.CompanyService) {
            throw new Error(
                'CompanyService not found in proto definition. ' +
                'Available keys: ' + Object.keys(protoDescriptor).join(', ')
            );
        }

        const CompanyService = companyPackage.CompanyService;
        const GRPC_SERVER_URL = process.env.COMPANY_SERVICE_URL || 'localhost:50051';

        console.log(`🔗 Connecting to gRPC server at: ${GRPC_SERVER_URL}`);

        const credentials = grpc.credentials.createInsecure();

        companyServiceClient = new CompanyService(
            GRPC_SERVER_URL,
            credentials
        ) as CompanyServiceClient;

        return companyServiceClient;

    } catch (error) {
        console.error('❌ Error creating gRPC client:', error);
        throw error;
    }
}