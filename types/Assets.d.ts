/// <reference types="node" />
/// <reference path="./Service.d.ts" />

declare module 'redocmx' {
    namespace Redoc {

        namespace Assets {

            type AssetType = 'folder' | 'image';

            interface Asset {
                path: string;
                created_at: string,
                updated_at: string,
                type: AssetType,
                name: string,
                metadata: object,
                tags: Array<object>,
                parent_id: string,
            }

            interface Folder extends Asset {
                folder_items_count: number,
            }

            interface Image extends Asset {
                image_type: string,
                image_size: number,
                url: string,
                url_small: string
            }

            namespace Service {

                interface BasicParams {
                    path: string;
                }

                interface FetchParams extends BasicParams {
                    path: string;
                    options?: Network.Request.Options;
                }
                
                interface PutParams extends BasicParams {
                    file: File.Result;
                }

                interface DeleteParams extends BasicParams {}

            }
        }

        class Assets {
            private service: Service;

            constructor(service: Service);

            get(path: string): Promise<Assets.Image>;

            delete(path: string): Promise<void>;

            list(path: string, options: Network.Request.Pagination.Options): Promise<Network.Request.Pagination.Response<Assets.Asset>>;

            put(path: string, source: string | Buffer): Promise<Assets.Asset>;
        }

    }
}