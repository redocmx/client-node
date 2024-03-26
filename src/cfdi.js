import Service from './service.js';
import Pdf from './pdf.js';
import Addenda from './addenda.js';
import File from './file.js';

export default class Cfdi extends File {
    constructor() {
        super();
        this.pdf = null;

        this.addenda = null
        this.addendaReplaceValues = null

        this.service = Service.getInstance();
    }

    setAddenda(addenda, replaceValues = null) {
        if (addenda && !(addenda instanceof Addenda)) {
            throw new TypeError('Addenda must be Addenda instance.');
        }

        if (replaceValues && Object.prototype.toString.call(replaceValues) !== '[object Object]') {
            throw new TypeError('Addenda replace values must be a valid key - value object.');
        }

        this.addenda = addenda
        this.addendaReplaceValues = replaceValues
    }

    async toPdf(payload = {}) {
        if (this.pdf) {
            return this.pdf;
        }

        if (Object.prototype.toString.call(payload) !== '[object Object]') {
            throw new TypeError('toPdf function only accepts an object as a parameter.');
        }

        const file = await this.getFile();

        if (this.addenda) {
            const addendaContent = await this.addenda.getFileContent(this.addendaReplaceValues);
            payload.addenda = addendaContent;
        }

        payload.format = 'pdf';

        const result = await this.service.cfdisConvert({ file, payload });
        this.pdf = new Pdf(result);

        return this.pdf;
    }
}
