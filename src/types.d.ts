// export default class Redoc {
//     apiKey: string;
//     service: Service;
//     constructor(apiKey?: string);
//     get cfdi(): Cfdi;
//     get addenda(): Addenda;
// }

// export class Cfdi extends File {
//     pdf: Pdf | null;
//     addenda: Addenda | null;
//     constructor();
//     setAddenda(addenda: Addenda, replaceValues?: object): void;
//     toPdf(payload?: CfdisConvertPayload): Promise<Pdf>;
// }
// export class Addenda extends File {
//     constructor();
//     getFileContent(replaceValues?: object): Promise<string>;
// }

// export class File {
//     filePath: string | null;
//     fileBuffer: Buffer | null;
//     fileContent: string | null;
//     constructor();
//     fromFile(filePath: string): this;
//     fromString(fileContent: string): this;
//     getFile(): Promise<{ content: string | Buffer; type: 'string' | 'buffer' }>;
// }

// export class Pdf {
//     buffer: Buffer;
//     transactionId: string;
//     totalPages: number;
//     totalTime: number;
//     metadata: CfdisMetadata;
//     constructor({ buffer, transactionId, totalPages, totalTime, metadata }: PdfConstructorParams);
//     toBuffer(): Buffer;
//     getTransactionId(): string;
//     getTotalPages(): number;
//     getTotalTimeMs(): number;
//     getMetadata(): string;
// }

// export interface CfdisConvertPayload {
//     style_pdf?: string;
//     style_email?: string;
// }

// export class Service {
//     apiKey: string;
//     apiUrl: string;
//     constructor(apiKey?: string);
//     static getInstance(apiKey?: string): Service;
//     cfdisConvert({ file, payload }: { file: { type: 'string' | 'buffer'; content: string | Buffer }; payload?: CfdisConvertPayload }): Promise<{ buffer: Buffer; metadata: CfdisMetadata; transactionId: string; totalPages: number; totalTime: number; }>;
// }

///// NEW

/* Redoc */
export interface RedocConstructorParams {
    apiKey: string;
    apiUrl?: string;
}

/* Pdf */
export interface PdfConstructorParams {
    buffer: Buffer;
    transactionId: string;
    totalPages: number;
    totalTime: number;
    metadata: CfdisMetadata
}


/* Service */

export interface ServiceConstructorParams {
    apiKey: string;
    apiUrl?: string;
}

export interface ServiceConvertCfdiParams {
    file: FileComputed;
    payload?: Payload;
}


interface ServiceAssetsBasic {
    path: string;
}

export interface ServiceFetchAssetsParams extends ServiceAssetsBasic{
    options?: FetchPaginationOptions;
}

export interface ServicePutAssetParams extends ServiceAssetsBasic{
    file: FileComputed;
}

export interface ServiceDeleteAssetParams extends ServiceAssetsBasic { }













/* File */
export interface FileComputed {
    content: string | Buffer;
    type: string;
}

/* Cfdi */

export interface Payload {
    style_pdf?: string;
    format?: string;
    addenda?: string;
}

export interface CfdisMetadata {
    [key: string]: any; // TBD
}

/* Global */

export interface FetchPaginationOptions {
    nextToken?: string;
    limit?: number;
}
export interface RequestConfig {
    headers?: { [key: string]: any };
    body?: { [key: string]: any } | FormData;
    params?: { [key: string]: any };
    isForm?: boolean;
    isBufferResponse?: boolean;
}

