export default class Service {
    static instance = null;

    constructor(apiKey) {
        if (Service.instance) {
            throw new Error("You cannot create more than one instance!");
        }

        this.apiKey = apiKey || process.env.REDOC_API_KEY;
        this.apiUrl = process.env.REDOC_API_URL || 'https://api.redoc.mx/cfdis/convert';
        Service.instance = this;
    }

    static getInstance(apiKey) {
        if (!Service.instance) {
            Service.instance = new Service(apiKey);
        }
        return Service.instance;
    }

    async cfdisConvert({file, payload}) {

        const formData = new FormData();

        if(payload?.style_pdf){
            formData.append('style_pdf', payload.style_pdf);
        }
        if(payload?.addenda){
            formData.append('addenda', payload.addenda);
        }
        
        formData.append('xml', new Blob([file.content], { type: 'text/xml' }), { filename: 'document.xml' });

        try {
            const response = await fetch(this.apiUrl, {
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
}
