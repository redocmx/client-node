import Cfdi from './cfdi';
import Service from './service';
import Pdf from './pdf';
import Addenda from './addenda';

export default class Redoc {
    apiKey: string;
    service: Service;
    constructor(apiKey?: string);
    get cfdi(): Cfdi;
    get addenda(): Addenda;
}

export default class Cfdi extends File {
    pdf: Pdf | null;
    addenda: Addenda | null;
    constructor();
    setAddenda(addenda: Addenda, replaceValues?: object): void;
    toPdf(payload?: CfdisConvertPayload): Promise<Pdf>;
}
export default class Addenda extends File {
    constructor();
    getFileContent(replaceValues?: object): Promise<string>;
}

export default class File {
    filePath: string | null;
    fileBuffer: Buffer | null;
    fileContent: string | null;
    constructor();
    fromFile(filePath: string): this;
    fromString(fileContent: string): this;
    getFile(): Promise<{ content: string | Buffer; type: 'string' | 'buffer' }>;
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

