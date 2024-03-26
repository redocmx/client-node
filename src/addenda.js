import File from './file.js';

export default class Addenda extends File {
    constructor() {
        super()
    }

    replaceValues(content, options = null) {
        if(!options) return content

        for(const option of Object.entries(options)) {
            const [key, value] = option
            content = content.split(key).join(value)
        }

        return content
    }

    async getFileContent(replaceValues) {
        const file = await this.getFile()
        const fileContent = file.content.toString()
        
        return this.replaceValues(fileContent, replaceValues)
    }

}
