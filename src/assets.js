import Service from "./service.js";

export default class Assets {
  constructor() {
    this.service = Service.getInstance();
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

}