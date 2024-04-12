// import fs from 'node:fs/promises'
import Redoc from './src/index.js'

// Inicializa Redoc con tu API key.
// const redoc = new Redoc('key_h5KRqcAI62mI6X3L7buAHKVKEujQFwsgBxuvi4dppbpvkPCa2H6bgekHEyol');
const redoc = new Redoc();

// Cargar la ruta del XML del CFDI.
// const cfdi = redoc.cfdi.fromFile('./cfdi.xml');

try {

  const asset = await redoc.assets.get('Estilos/Inicial/base/header-logo');
  const assets = await redoc.assets.list('Estilos/Inicial/base/header-logo', {
    limit: 5,
    // nextToken: 'VHVlIE1hciAxOSAyMDI0IDEzOjAzOjU3IEdNVC0wNTAwIChDb2xvbWJpYSBTdGFuZGFyZCBUaW1lKXxlMmJhZmY0ZS04N2Q0LTQ2NmItOGNhNy1hMzJhZTQyZjc2MDd8ZjM4OWUyYTgtMzlmNS00ZjQyLTg5NDEtMGVkYTUzZGViODY3'
  });

  console.log(asset)

  // Convertir el CFDI a PDF.
  // const pdf = await cfdi.toPdf();
  
  // // Guardar el PDF del CFDI en el sistema de archivos.
  // await fs.writeFile('./resultado.pdf', pdf.toBuffer());

} catch (err) {
  console.error('Se produjo un error durante la conversión:', err);
}