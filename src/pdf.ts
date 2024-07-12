import { CfdisMetadata, PdfConstructorParams } from "./types.js";

export default class Pdf {
    buffer: Buffer;
    transactionId: string;
    totalPages: number;
    totalTime: number;
    metadata: CfdisMetadata;

    constructor({buffer, transactionId, totalPages, totalTime, metadata}: PdfConstructorParams) {
        this.buffer = buffer;
        this.transactionId = transactionId;
        this.totalPages = totalPages;
        this.totalTime = totalTime;
        this.metadata = metadata;
    }

    toBuffer() {
        return this.buffer;
    }

    getTransactionId() {
        return this.transactionId;
    }

    getTotalPages() {
        return this.totalPages;
    }

    getTotalTimeMs() {
        return this.totalTime;
    }

    getMetadata() {
        return this.metadata;
    }
}

