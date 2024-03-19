import fs from 'fs/promises';
import Service from './service.js';
import Pdf from './pdf.js';

const { F_OK, R_OK } = fs.constants;

export default class Cfdi {
    constructor() {
        this.pdf = null;
        this.addenda = null;
        this.filePath = null;
        this.fileBuffer = null;
        this.fileContent = null;
        this.service = Service.getInstance();
    }

    fromFile(filePath) {
        this.filePath = filePath;
        return this;
    }

    fromString(fileContent) {
        this.fileContent = fileContent;
        return this;
    }

    async getXmlContent() {
        if(this.fileContent){
            return { content: this.fileContent, type: 'string' }
        }

        if(this.fileBuffer){
            return { content: this.fileBuffer, type: 'buffer' }
        }

        if(this.filePath){
            try {
                await fs.access(this.filePath, F_OK | R_OK);
            } catch (err) {
                if (err.code === 'ENOENT') {
                    throw new Error(`Failed to read XML content from file: ${this.filePath}. The file does not exist.`);
                } else if (err.code === 'EACCES') {
                    throw new Error(`Permission denied: ${this.filePath}. The file exists but cannot be read.`);
                } else {
                    throw err;
                }
            }

            this.fileBuffer = await fs.readFile(this.filePath)
            return { content: this.fileBuffer, type: 'buffer' }
        }

        throw new Error('XML content for the CFDI must be provided.');
    }

    setAddenda ( addenda ) {
        if (typeof addenda !== 'string') {
            throw new TypeError('setAddenda function only accepts a string parameter.');
        }

        this.addenda = addenda
    }

    getAddenda () {
        return this.addenda
    }

    async toPdf( payload = {} ) {

        if(this.pdf){
            return this.pdf;
        }

        if (Object.prototype.toString.call(payload) !== '[object Object]') {
            throw new TypeError('toPdf function only accepts an object as a parameter.');
        }

        const file = await this.getXmlContent();
        payload.format = 'pdf';
        
        if (this.getAddenda()) {
            payload.addenda = this.getAddenda();
        }
        
        const result = await this.service.cfdisConvert({file, payload});
        this.pdf = new Pdf(result);
        
        return this.pdf;
    }
}
