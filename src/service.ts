import * as fs from 'fs'
import * as path from 'path';

import { RequestConfig, ServiceConstructorParams, ServiceConvertCfdiParams, ServiceDeleteAssetParams, ServiceFetchAssetsParams, ServicePutAssetParams } from './types.js';

const pkgPath = path.resolve(__dirname, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

console.log('pkg', pkg)

export default class Service {
    apiKey?: string
    apiUrl?: string;

    constructor(config?: string | ServiceConstructorParams) {

        if (config && typeof config === 'string') {
            this.apiKey = config;
        }

        if (config && typeof config === 'object') {
            this.apiKey = config?.apiKey;
            this.apiUrl = config?.apiUrl;
        }

        this.apiKey = this.apiKey || process.env.REDOC_API_KEY;
        this.apiUrl = this.apiUrl || process.env.REDOC_API_URL || 'https://api.redoc.mx';

    }

    async cfdisConvert({ file, payload }: ServiceConvertCfdiParams) {

        const body = new FormData();

        if (payload?.style_pdf) {
            body.append('style_pdf', payload.style_pdf);
        }
        if (payload?.addenda) {
            body.append('addenda', payload.addenda);
        }

        body.append('xml', new Blob([file.content], { type: 'text/xml' }), 'document');

        const { data: arrayBuffer, headers } = await this._request('/cfdis/convert', 'POST', {
            isForm: true,
            isBufferResponse: true,
            headers: {
                'Accept': 'application/pdf',
            },
            body
        })

        const buffer = Buffer.from(arrayBuffer);

        const headerMetadata = headers.get('x-redoc-xml-metadata') ?? ''
        const metadata = JSON.parse(Buffer.from(headerMetadata, 'base64').toString('utf-8') ?? '{}');

        const transactionId = headers.get('x-redoc-transaction-id') ?? '';
        const totalPages = parseInt(headers.get('x-redoc-pdf-total-pages') ?? '0');
        const totalTime = parseInt(headers.get('x-redoc-process-total-time') ?? '0');

        return { buffer, metadata, transactionId, totalPages, totalTime };
    }

    // Assets
    async fetchAssets({ path, options }: ServiceFetchAssetsParams) {

        const { data } = await this._request('/images', 'GET', {
            params: {
                path,
                ...(options?.nextToken ? { next_token: options?.nextToken } : {}),
                ...(options?.limit ? { limit: options?.limit } : {})
            }
        })

        return data
    }

    async putAsset({ path, file }: ServicePutAssetParams) {
        const body = new FormData()

        body.append('path', path)
        body.append('file', new Blob([file.content], { type: 'image/png' }), 'file');

        const { data } = await this._request('/images', 'PUT', {
            isForm: true,
            body
        })

        return data
    }

    async deleteAsset({ path }: ServiceDeleteAssetParams) {
        await this._request('/images', 'DELETE', {
            params: {
                path,
            }
        })
    }

    async _request(endpoint: string, method: string, config: RequestConfig = {}) {
        const { headers, body, params, isForm = false, isBufferResponse = false } = config;

        // Create a new URLSearchParams object for the query parameters
        const searchParams = new URLSearchParams(params);

        // Append the query parameters to the URL
        const requestUrl = params
            ? `${this.apiUrl + endpoint}?${searchParams.toString()}`
            : this.apiUrl + endpoint;

        // Create the request options
        const requestOptions = {
            method,
            headers: new Headers({
                'x-redoc-api-key': this.apiKey ?? '',
                'redoc-origin-name': 'sdk_node',
                'redoc-origin-version': pkg.version,
                ...(isForm ? {} : { 'Content-Type': 'application/json' }),
                ...(headers ? headers : {})
            }),
            body: isForm ? body as FormData : JSON.stringify(body)
        };

        try {
            // Send the HTTP request
            const response = await fetch(requestUrl, requestOptions);

            // Extract the status code and response data
            const statusCode = response.status;
            let responseData = null;

            if (statusCode !== 204) {
                responseData = isBufferResponse ? await response.arrayBuffer() : await response.json();
            }

            if (statusCode !== 204 && statusCode !== 200 && statusCode !== 201) {
                throw Error(responseData?.message);
            }

            return { code: statusCode, data: responseData, headers: response.headers };
        } catch (error) {
            throw error;
        }
    }

}
