import Cfdi from './cfdi.js';
import Service from './service.js';

export default class Redoc {
    constructor(apiKey) {
        this.apiKey = apiKey || process.env.REDOC_API_KEY;
        this.service = new Service(this.apiKey);
    }

    get cfdi() {
        const cfdi = new Cfdi()
        return cfdi;
    }
}
