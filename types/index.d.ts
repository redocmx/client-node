///<reference path='./Addenda.d.ts' />
///<reference path='./Assets.d.ts' />
///<reference path='./Cfdi.d.ts' />
///<reference path='./File.d.ts' />
///<reference path='./Pdf.d.ts' />
///<reference path='./Service.d.ts' />

declare module 'redocmx' {
  // Added to in other modules, referenced above.
  export namespace Redoc {
    interface ConstructorParams {
      apiKey: string;
      apiUrl?: string;
    }
  }

  export class Redoc {
    constructor(config: string | Redoc.ConstructorParams);

    private apiKey?: string;
    private service?: Redoc.Service;

    get cfdi(): Redoc.Cfdi;
    get addenda(): Redoc.Addenda;
    get assets(): Redoc.Assets;
  }

  export default Redoc;
}