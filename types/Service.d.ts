/// <reference types="node" />
/// <reference path="./Global.d.ts" />
/// <reference path="./Cfdi.d.ts" />
/// <reference path="./Assets.d.ts" />

declare module 'redocmx' {
    namespace Redoc {

        namespace Service {
            interface ConstructorParams {
                apiKey: string;
                apiUrl?: string;
            } 
        }

        class Service {
            private apiKey?: string;
            private apiUrl?: string;

            constructor(config?: string | Service.ConstructorParams);

            cfdisConvert({ file, payload }: Cfdi.Convert.Params): Promise<Pdf.ConstructorParams>;

            fetchAssets({ path, options }: Assets.Service.FetchParams): Promise<Network.Request.Pagination.Response<Assets.Asset>>;
            
            putAsset({ path, file }: Assets.Service.PutParams): Promise<Assets.Asset>;

            deleteAsset({ path }: Assets.Service.BasicParams): Promise<void>;

            _request(endpoint: string, method: string, config?: Network.Request.Options): Promise<{
                code: number;
                data: any;
                headers: Headers;
            }>;
        }

    }
}

