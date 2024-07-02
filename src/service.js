import fs from 'fs'

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))

export default class Service {
    constructor(config) {

        if (config && typeof config === 'string') {
            this.apiKey = config;
        }

        if (config && typeof config === 'object') {
            this.apiKey = config?.apiKey;
            this.apiUrl = config?.apiUrl;
        }

        this.apiKey = this.apiKey || process.env.REDOC_API_KEY;
        this.apiUrl = this.apiUrl || process.env.REDOC_API_URL || 'https://api.redoc.mx/cfdis/convert';

    }

    async cfdisConvert({ file, payload }) {

        const body = new FormData();

        if (payload?.style_pdf) {
            body.append('style_pdf', payload.style_pdf);
        }
        if (payload?.addenda) {
            body.append('addenda', payload.addenda);
        }

        body.append('xml', new Blob([file.content], { type: 'text/xml' }), { filename: 'document' });

        const { data: arrayBuffer, headers } = await this._request('/cfdis/convert', 'POST', {
            isForm: true,
            isBufferResponse: true,
            headers: {
                'Accept': 'application/pdf',
            },
            body
        })

        const buffer = Buffer.from(arrayBuffer);

        const metadata = Buffer.from((headers.get('x-redoc-xml-metadata')), 'base64').toString('utf-8');

        const transactionId = headers.get('x-redoc-transaction-id');
        const totalPages = headers.get('x-redoc-pdf-total-pages');
        const totalTime = headers.get('x-redoc-process-total-time');

        return { buffer, metadata, transactionId, totalPages, totalTime };
    }

    // Assets
    async fetchAssets({ path, options }) {

        if(options?.nextToken) {
            options.next_token = options.nextToken
            delete options.nextToken
        }

        const { data } = await this._request('/images', 'GET', {
            params: {
                path,
                ...options
            }
        })

        return data
    }

    async putAsset({ path, file }) {
        const body = new FormData()

        body.append('path', path)
        body.append('file', new Blob([file.content], { type: 'image/png' }), { filename: 'file' });

        const { data } = await this._request('/images', 'PUT', {
            isForm: true,
            body
        })

        return data
    }

    async deleteAsset({ path }) {
        await this._request('/images', 'DELETE', {
            params: {
                path,
            }
        })
    }

    async _request(endpoint, method, config = {}) {
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
                'x-redoc-api-key': this.apiKey,
                'redoc-origin-name': 'sdk_node',
                'redoc-origin-version': pkg.version,
                ...(isForm ? {} : { 'Content-Type': 'application/json' }),
                ...headers
            }),
            body: isForm ? body : JSON.stringify(body)
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
