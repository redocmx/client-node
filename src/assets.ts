import File from './file.js'
import Service from './service.js';

import { FetchPaginationOptions, FileComputed } from './types.js';

export default class Assets {

  service: Service;

  constructor(service: Service) {
    this.service = service
  }

  async get(path: string) {
    if (!path || path === '/') {
      throw new TypeError('Path must be provided to get an asset.');
    }

    if (typeof path !== 'string') {
      throw new TypeError('Path must be a valid string.');
    }

    if (path.endsWith('/')) {
      throw new TypeError('Path must be a valid asset path.');
    }

    const asset = await this.service.fetchAssets({ path })

    return asset
  }

  async delete(path: string) {
    if (!path || path === '/') {
      throw new TypeError('Path must be provided to get an asset.');
    }

    if (typeof path !== 'string') {
      throw new TypeError('Path must be a valid string.');
    }

    await this.service.deleteAsset({ path })

    return true
  }

  async list(path: string, options: FetchPaginationOptions = {}) {
    if (!path){
      path = ''
    }

    if (path === '/') {
      throw new TypeError('Path must be provided to get an asset.');
    }

    if (typeof path !== 'string') {
      throw new TypeError('Path must be a valid string.');
    }

    if (path !== '' && !path.endsWith('/')) {
      throw new TypeError('Path must be a valid path (Ends with "/").');
    }

    if (options) {
      options.limit = options?.limit ?? 10
    }

    const asset = await this.service.fetchAssets({ path, options })

    return asset
  }

  async put(path: string, source: string | Buffer) {
    if (!path || path === '/') {
      throw new TypeError('Path must be provided to put an asset.');
    }

    if (typeof path !== 'string') {
      throw new TypeError('Path must be a valid string.');
    }

    if (path.endsWith('/')) {
      throw new TypeError('Path must be a valid asset path.');
    }

    if (!source) {
      throw new TypeError('Source must be provided to put an asset.');
    }

    if (typeof source !== 'string' && !(source instanceof Uint8Array)) {
      throw new TypeError('Source must be a valid string or a buffer array.');
    }

    const isBufferSource = source instanceof Uint8Array

    let file: FileComputed

    if (isBufferSource) {
      file = { type: 'buffer', content: source }
    } else {
      file =await ( new File().fromFile(source)).getFile()
    }

    const asset = await this.service.putAsset({ path, file })

    return asset
  }

}