/// <reference types="node" />

declare module 'redocmx' {
    namespace Redoc {

        namespace File {
            interface Result {
                content: string | Buffer;
                type: string;
            }
        }

        class File {
            private filePath: string | null;
            private fileBuffer: Buffer | null;
            private fileContent: string | null;

            constructor();

            fromFile(filePath: string): this;

            fromBuffer(fileBuffer: Buffer): this;

            fromString(fileContent: string): this;
            
            private getFile(): Promise<{
                content: string;
                type: string;
            } | {
                content: Buffer;
                type: string;
            }>;
        }

    }
}