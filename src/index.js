import Cfdi from './cfdi.js';
import Addenda from './addenda.js';
import Service from './service.js';

export default class Redoc {
    constructor(apiKey) {
        this.apiKey = apiKey || process.env.REDOC_API_KEY;
        this.service = new Service(this.apiKey);
    }

    get cfdi() {
        return new Cfdi(this.service);
    }

    get addenda() {
        return new Addenda()
    }
}
