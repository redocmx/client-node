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
    payload?: PdfPayload;
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

export interface PdfPayload {
    style_pdf?: string;
    format?: string;
    addenda?: string;
}

export interface CfdisMetadata {
    [key: string]: any; // TBD
}

/* Global */

interface FetchError extends Error {
    status?: number;
    statusText?: string;
    headers?: Headers;
  }

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

