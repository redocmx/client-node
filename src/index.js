import Cfdi from './cfdi.js';
import Addenda from './addenda.js';
import Service from './service.js';
import Assets from './assets.js';

export default class Redoc {
    constructor(config) {

        if (config && typeof config === 'string') {
            this.apiKey = config;
            this.service = new Service(this.apiKey);
        }

        if (config && typeof config === 'object') {
            const { apiKey, apiUrl } = config

            if (!apiKey) {
                throw new Error(`You must provide the apiKey config.`);
            }

            this.service = new Service({ apiKey, apiUrl });
        }

        this.service = this.service || new Service();
    }

    get cfdi() {
        return new Cfdi(this.service);
    }

    get addenda() {
        return new Addenda()
    }

    get assets() {
        return new Assets(this.service)
    }
}
