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

        const formData = new FormData();

        if (payload?.style_pdf) {
            formData.append('style_pdf', payload.style_pdf);
        }
        if (payload?.addenda) {
            formData.append('addenda', payload.addenda);
        }

        formData.append('xml', new Blob([file.content], { type: 'text/xml' }), { filename: 'document.xml' });

        try {
            const response = await fetch(`${this.apiBaseUrl}/cfdis/convert`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/pdf',
                    'X-Redoc-Api-Key': this.apiKey,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const headers = response.headers;
            const metadata = Buffer.from((headers.get('x-redoc-xml-metadata')), 'base64').toString('utf-8');

            const transactionId = headers.get('x-redoc-transaction-id');
            const totalPages = headers.get('x-redoc-pdf-total-pages');
            const totalTime = headers.get('x-redoc-process-total-time');

            return { buffer, metadata, transactionId, totalPages, totalTime };
        } catch (error) {
            throw error;
        }
    }

    // Assets
    async fetchAssets({ path, options }) {

        const { data } = await this._request('/images', 'GET', {
            params: {
                path,
                ...options
            }
        })

        return data
    }

    async createAsset(path, data) {

    }

    async updateAsset(path, data) {

    }

    async deleteAsset(path) {

    }


    async _request(endpoint, method, config = {}) {
        const { headers, body, params } = config;

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
                'redoc-origin-name': '0.0.1',
                'Content-Type': 'application/json',
                ...headers
            }),
            body: JSON.stringify(body)
        };

        try {
            // Send the HTTP request
            const response = await fetch(requestUrl, requestOptions);

            // Extract the status code and response data
            const statusCode = response.status;
            let responseData = null;

            
            if (statusCode !== 204) {
                responseData = await response.json();
            }

            if (statusCode !== 204 && statusCode !== 200 && statusCode !== 201) {
                throw Error(responseData?.message);
            }

            return { code: statusCode, data: responseData };
        } catch (error) {
            throw error;
        }
    }

}
