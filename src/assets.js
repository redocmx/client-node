import File from './file.js'

export default class Assets {
  constructor(service) {
    this.service = service
  }

  async get(path) {
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

  async delete(path) {
    if (!path || path === '/') {
      throw new TypeError('Path must be provided to get an asset.');
    }

    if (typeof path !== 'string') {
      throw new TypeError('Path must be a valid string.');
    }

    const asset = await this.service.deleteAsset({ path })

    return asset
  }

  async list(path, options) {
    if (path === null || path === undefined || path === '/') {
      throw new TypeError('Path must be provided to get an asset.');
    }

    if (typeof path !== 'string') {
      throw new TypeError('Path must be a valid string.');
    }

    if (path !== '' && !path.endsWith('/')) {
      throw new TypeError('Path must be a valid path (Ends with "/").');
    }

    if (options) {
      options.limit = options.limit ?? 10
    }

    const asset = await this.service.fetchAssets({ path, options })

    return asset
  }

  async put(path, source) {
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
      throw new TypeError('Path must be a valid string or a buffer array.');
    }

    const assetData = {
      path
    }

    const isBufferSource = source instanceof Uint8Array

    if (isBufferSource) {
      const file = { type: 'buffer', content: source }
      assetData.file = file
    } else {
      const file = new File().fromFile(source)
      assetData.file = await file.getFile()
    }

    const asset = await this.service.putAsset({ path: assetData.path, file: assetData?.file })

    return asset
  }

}