/// <reference path="./File.d.ts" />

declare module 'redocmx' {
    namespace Redoc {
        namespace Network {
            namespace Request {
    
                interface Options {
                    headers?: { [key: string]: any };
                    body?: { [key: string]: any } | FormData;
                    params?: { [key: string]: any };
                    isForm?: boolean;
                    isBufferResponse?: boolean;
                }
    
                namespace Pagination {
    
                    interface Options {
                        nextToken?: string;
                        limit?: number;
                    }
    
                    interface Response<T> {
                        data: Array<T>;
                        pagination: {
                            limit: number;
                            has_more: boolean;
                            next_token: string | null
                        }
    
                    }
    
                }
            }
        }
    }
}