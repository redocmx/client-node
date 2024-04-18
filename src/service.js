import fs from 'fs'

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))

export default class Service {
    static instance = null;

    constructor(apiKey) {
        if (Service.instance) {
            throw new Error("You cannot create more than one instance!");
        }

        this.apiKey = apiKey || process.env.REDOC_API_KEY;
        this.apiBaseUrl = process.env.REDOC_API_URL || 'https://api.redoc.mx';
        Service.instance = this;
    }

    static getInstance(apiKey) {
        if (!Service.instance) {
            Service.instance = new Service(apiKey);
        }
        return Service.instance;
    }

    // CFDI
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

    // async createAsset({ path, file }) {
    //     const body = new FormData()

    //     body.append('path', path)

    //     if (file) {
    //         body.append('file', new Blob([file.content], { type: 'image/png' }), { filename: 'file' });
    //     }

    //     const { data } = await this._request('/images', 'POST', {
    //         isForm: true,
    //         body
    //     })

    //     return data
    // }

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

    // async updateAsset({ path, name, file }) {
    //     const body = new FormData()

    //     body.append('path', path)

    //     if (name) {
    //         body.append('name', name)
    //     }

    //     if (file) {
    //         body.append('file', new Blob([file.content], { type: 'image/png' }), { filename: 'file' });
    //     }

    //     const { data } = await this._request('/images', 'PATCH', {
    //         isForm: true,
    //         body
    //     })

    //     return data
    // }

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
            ? `${this.apiBaseUrl + endpoint}?${searchParams.toString()}`
            : this.apiBaseUrl + endpoint;

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
