/// <reference path="./File.d.ts" />
/// <reference path="./Cfdi.d.ts" />

declare module 'redocmx' {
    namespace Redoc {

        namespace Pdf {

            interface ConstructorParams {
                buffer: Buffer;
                transactionId: string;
                totalPages: number;
                totalTime: number;
                metadata: Cfdi.Metadata
            } 

            interface Payload {
                style_pdf?: string;
                format?: string;
                addenda?: string;
            }
        }

        class Pdf {
            buffer: Buffer;
            transactionId: string;
            totalPages: number;
            totalTime: number;
            metadata: Cfdi.Metadata;

            constructor({ buffer, transactionId, totalPages, totalTime, metadata }: Pdf.ConstructorParams);

            toBuffer(): Buffer;

            getTransactionId(): string;

            getTotalPages(): number;

            getTotalTimeMs(): number;
            
            getMetadata(): Cfdi.Metadata;
        }
    }
}