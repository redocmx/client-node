import * as fs from 'fs/promises';

const { F_OK, R_OK } = fs.constants;

export default class File {

  filePath:  string | null;
  fileBuffer:  Buffer | null;
  fileContent:  string | null;

  constructor() {
    this.filePath = null;
    this.fileBuffer = null;
    this.fileContent = null;
  }

  fromFile(filePath: string) {
    this.filePath = filePath;
    return this
  }

  fromString(fileContent: string) {
    this.fileContent = fileContent;
    return this
  }

  async getFile() {
    if (this.fileContent) {
      return { content: this.fileContent, type: 'string' }
    }

    if (this.fileBuffer) {
      return { content: this.fileBuffer, type: 'buffer' }
    }

    if (this.filePath) {
      try {
        await fs.access(this.filePath, F_OK | R_OK);
      } catch (err: any) {
        if (err.code === 'ENOENT') {
          throw new Error(`Failed to read content from file: ${this.filePath}. The file does not exist.`);
        } else if (err.code === 'EACCES') {
          throw new Error(`Permission denied: ${this.filePath}. The file exists but cannot be read.`);
        } else {
          throw err;
        }
      }

      this.fileBuffer = await fs.readFile(this.filePath)
      return { content: this.fileBuffer, type: 'buffer' }
    }

    throw new Error(`Failed to load file ${this.constructor.name}, you must use fromFile or fromString.`);
  }
}
