/// <reference path="./File.d.ts" />

declare module 'redocmx' {
    namespace Redoc {

        namespace Addenda {
            type ReplaceOptions = {
                [key: string]: string;
            }
        }

        class Addenda extends File {
            constructor();

            private replaceValues(content: string, options?: Addenda.ReplaceOptions | null): string;

            private getFileContent(replaceValues: Addenda.ReplaceOptions): Promise<string>;
        }
    }
}