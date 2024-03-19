import Cfdi from './cfdi';
import Service from './service';
import Pdf from './pdf';

export default class Redoc {
    apiKey: string;
    service: Service;
    constructor(apiKey?: string);
    get cfdi(): Cfdi;
}

export default class Cfdi {
    pdf: Pdf | null;
    addenda: string | null;
    filePath: string | null;
    fileBuffer: Buffer | null;
    fileContent: string | null;
    constructor();
    fromFile(filePath: string): this;
    fromString(fileContent: string): this;
    getXmlContent(): Promise<{ content: string | Buffer; type: 'string' | 'buffer' }>;
    setAddenda(addenda: string): void;
    getAddenda(): string | null;
    toPdf(payload?: CfdisConvertPayload): Promise<Pdf>;
}

export interface CfdisMetadata {
    [key: string]: any; // TBD
}

export default class Pdf {
    buffer: Buffer;
    transactionId: string;
    totalPages: number;
    totalTime: number;
    metadata: CfdisMetadata;
    constructor({ buffer, transactionId, totalPages, totalTime, metadata }: { buffer: Buffer; transactionId: string; totalPages: number; totalTime: number; metadata: CfdisMetadata });
    toBuffer(): Buffer;
    getTransactionId(): string;
    getTotalPages(): number;
    getTotalTimeMs(): number;
    getMetadata(): string;
}

export interface CfdisConvertPayload {
    style_pdf?: string;
    style_email?: string;
}

export default class Service {
    static instance: Service | null;
    apiKey: string;
    apiUrl: string;
    constructor(apiKey?: string);
    static getInstance(apiKey?: string): Service;
    cfdisConvert({ file, payload }: { file: { type: 'string' | 'buffer'; content: string | Buffer }; payload?: CfdisConvertPayload }): Promise<{ buffer: Buffer; metadata: CfdisMetadata; transactionId: string; totalPages: number; totalTime: number; }>;
}

