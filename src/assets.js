import Service from "./service.js";
import File from './file.js'

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

    const assetData = {
      path
    }

    const isBufferSource = typeof source !== 'string'

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

  // async create(path, data) {
  //   if (!path === null || path === undefined || path === '/') {
  //     throw new TypeError('Path must be provided to get an asset.');
  //   }

  //   if (typeof path !== 'string') {
  //     throw new TypeError('Path must be a valid string.');
  //   }

  //   if (!data?.name) {
  //     throw new TypeError('Name must be provided to create an asset.');
  //   }

  //   if (typeof data?.name !== 'string') {
  //     throw new TypeError('Asset name must be a valid string.');
  //   }

  //   if (path.endsWith('/')) {
  //     throw new TypeError('Path must be a valid asset path.');
  //   }

  //   const assetData = {
  //     path: path + data?.name
  //   }

  //   const isImage = !data?.name.endsWith('/')

  //   if (isImage) {

  //     if (!data?.localPath && !data?.buffer) {
  //       throw new TypeError('Local path must be provided to create an image.');
  //     }
  
  //     if (typeof data?.localPath !== 'string') {
  //       throw new TypeError('Local path must be a valid string.');
  //     }
      
  //     if (data?.buffer) {
  //       const file = { type: 'buffer', content: data?.buffer }
  //       assetData.file = file
  //     } else {
  //       const file = new File().fromFile(data?.localPath)
  //       assetData.file = await file.getFile()
  //     }
  //   }

  // }

  // async update(path, data) {
  //   if (path === null || path === undefined || path === '/') {
  //     throw new TypeError('Path must be provided to get an asset.');
  //   }

  //   if (typeof path !== 'string') {
  //     throw new TypeError('Path must be a valid string.');
  //   }

  //   if (!data?.name && !data?.localPath) {
  //     throw new TypeError('Name or local path must be provided to update an asset.');
  //   }

  //   const assetData = {
  //     path
  //   }

  //   if (data?.name) {
      
  //     if (typeof data?.name !== 'string') {
  //       throw new TypeError('Asset name must be a valid string.');
  //     }

  //     assetData.name = data?.name

  //   }

  //   if (data?.localPath) {

  //     if (typeof data?.localPath !== 'string') {
  //       throw new TypeError('Local path must be a valid string.');
  //     }

  //     const file = new File().fromFile(data?.localPath)

  //     assetData.file = await file.getFile()
  //   }

  //   const asset = await this.service.updateAsset({ path: assetData.path, name: assetData?.name, file: assetData?.file })

  //   return asset
  // }

}