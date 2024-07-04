/// <reference path="./File.d.ts" />
/// <reference path="./Pdf.d.ts" />
/// <reference path="./Addenda.d.ts" />
/// <reference path="./Service.d.ts" />

declare module 'redocmx' {
    namespace Redoc {

        namespace Cfdi {
            type Metadata = {
                [key: string]: string;
            }

            namespace Convert {
                interface Params {
                    file: File.Result;
                    payload?: Pdf.Payload;
                }
            }
        }

        class Cfdi extends File {
            private pdf: Pdf | null;
            private service: Service;
            private addenda: Addenda | null;
            private addendaReplaceValues: Addenda.ReplaceOptions | null;

            constructor(service: Service);

            setAddenda(addenda: Addenda, replaceValues?: Addenda.ReplaceOptions): void;

            toPdf(payload?: Pdf.Payload): Promise<Pdf>;
        }
    }
}
