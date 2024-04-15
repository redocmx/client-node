import fs from 'node:fs'
import Redoc from './src/index.js'

// Inicializa Redoc con tu API key.
// const redoc = new Redoc('key_TCPa57X5GqkDwvO53ls6IesC3oMC9QX0sUufOykF2PgmSjzmwVEC4xxSNWYE');
const redoc = new Redoc();

// Cargar la ruta del XML del CFDI.
// const cfdi = redoc.cfdi.fromFile('./cfdi.xml');

try {

  // const asset = await redoc.assets.get('Estilos/Inicial/base/header-logo');
  
  // await redoc.assets.delete('My folder renamed/')
  // await redoc.assets.delete('My logo')

  // const createdFolder = await redoc.assets.create('', {
  //   name: 'My folder/'
  // })

  const imageBuffer = fs.readFileSync('./apple.png')

  const createdImage = await redoc.assets.create('My folder renamed/', {
    name: 'My logo',
    localPath: './spotify.png',
    buffer: imageBuffer
  })

  // const renamedFolder = await redoc.assets.update('My folder/', {
  //   name: 'My folder renamed',
  // })

  // const renamedImage = await redoc.assets.update('My logo renamed', {
  //   name: 'My logo original',
  // })

  // const replacedImage = await redoc.assets.update('My logo original', {
  //   localPath: './spotify.png',
  // })

  const assets = await redoc.assets.list('', {
    limit: 5,
    // nextToken: 'VHVlIE1hciAxOSAyMDI0IDEzOjAzOjU3IEdNVC0wNTAwIChDb2xvbWJpYSBTdGFuZGFyZCBUaW1lKXxlMmJhZmY0ZS04N2Q0LTQ2NmItOGNhNy1hMzJhZTQyZjc2MDd8ZjM4OWUyYTgtMzlmNS00ZjQyLTg5NDEtMGVkYTUzZGViODY3'
  });

  // console.log(createdImage)
  console.log(assets)

  // Convertir el CFDI a PDF.
  // const pdf = await cfdi.toPdf();
  
  // // Guardar el PDF del CFDI en el sistema de archivos.
  // await fs.writeFile('./resultado.pdf', pdf.toBuffer());

} catch (err) {
  console.error('Se produjo un error durante la conversión:', err);
}