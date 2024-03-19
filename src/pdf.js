export default class Pdf {
    constructor({buffer, transactionId, totalPages, totalTime, metadata}) {
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

