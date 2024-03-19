# Conversión de CFDI a PDF

- English documentation available [here](README_EN.md) 

## @redocmx/client

El módulo `@redocmx/client` es un cliente de Node.js diseñado para interactuar con la API REST de [redoc.mx](https://redoc.mx) para convertir CFDIs (Comprobante Fiscal Digital por Internet) a PDFs.

Este cliente facilita el proceso de enviar datos XML y recibir el PDF convertido, junto con los detalles de la transacción y metadatos.

Este paquete incluye definiciones de TypeScript que te permiten integrarlo sin problemas en tus proyectos de TypeScript.

## Instalación

Para instalar el módulo, ejecuta:

```bash
npm install @redocmx/client
```

o si usas `yarn`:

```bash
yarn add @redocmx/client
```

## Uso

Primero, importa el módulo y crea una instancia del cliente Redoc.

Puedes pasar opcionalmente tu clave API como un argumento, o el cliente intentará cargarla de la variable de entorno `REDOC_API_KEY`.

```javascript
import Redoc from '@redocmx/client';

const redoc = new Redoc('tu_clave_api_aquí');
```

### Convirtiendo CFDI a PDF

`@redocmx/client` proporciona dos opciones para cargar datos CFDI: desde un archivo o directamente desde una cadena.

#### Opción 1: Cargar XML desde el Sistema de Archivos

```javascript
const cfdi = redoc.cfdi.fromFile('./ruta/a/tu/archivo.xml');
```

#### Opción 2: Usar una Cadena de Contenido XML

```javascript
const cfdi = redoc.cfdi.fromString('<cadena_de_contenido_xml_aquí>');
```

### Generando el PDF

Para convertir el CFDI cargado a un PDF:

```javascript
try {
  const pdf = await cfdi.toPdf();
  const buffer = pdf.toBuffer();
  
  // Escribiendo el buffer del PDF a un archivo
  await fs.writeFile('./ruta/para/guardar/archivo.pdf', buffer);

  console.log(`ID de Transacción: ${pdf.getTransactionId()}`);
  console.log(`Total de Páginas: ${pdf.getTotalPages()}`);
  console.log(`Tiempo Total: ${pdf.getTotalTimeMs()} ms`);
  console.log(`Metadatos: ${pdf.getMetadata()}`);
} catch (error) {
  console.error("Ocurrió un error durante la conversión:", error);
}
```

## Ejemplos

- [Ejemplo básico](https://github.com/redocmx/cfdi-a-pdf-ejemplos)
- [Logotipo y colores personalizados](https://github.com/redocmx/cfdi-a-pdf-ejemplos)
- [Cambiar idioma a inglés](https://github.com/redocmx/cfdi-a-pdf-ejemplos)
- [Agregar contenido enriquecido adicional](https://github.com/redocmx/cfdi-a-pdf-ejemplos)

## Referencia API

### Redoc

El objeto `redoc` es una instancia de `Redoc`, creada usando `new Redoc(api_key)`.

| Método                          | Descripción                                                                                   |
| ------------------------------- | --------------------------------------------------------------------------------------------- |
| redoc.cfdi.**fromFile(filePath)** | Devuelve: **Cfdi** - **Instancia**<br>Carga contenido de archivo del sistema para convertir un CFDI a PDF. El archivo debe ser XML válido para un CFDI.<br>Devuelve una instancia de la clase Cfdi, que se puede usar para obtener el PDF. |
| redoc.cfdi.**fromString(fileContent)** | Devuelve: **Cfdi** - **Instancia**<br>Usa un CFDI como cadena para convertir el CFDI a PDF. La cadena debe ser XML válido para un CFDI.<br>Devuelve una instancia de la clase Cfdi, que se puede usar para obtener el PDF. |

### Cfdi

El objeto `cfdi` es una instancia de `Cfdi`, creada usando `redoc.cfdi.fromFile(rutaDelArchivo)` o `redoc.cfdi.fromString(contenidoDelArchivo)`.

| Método                      | Descripción |
| --------------------------- | ----------- |
| cfdi.**setAddenda(str)**    | Parámetros: **String**<br>Permite el uso de una [addenda de redoc](https://redoc.mx/docs/addenda) para tener control total sobre el diseño del PDF final. |
| cfdi.**toPdf(opciones)**    | Parámetros: **Object** - [OpcionesPdf](#opcionespdf)<br>Devuelve: **Pdf** - **Instancia**<br>Una instancia de la clase Pdf, que al invocarse, convierte el CFDI a PDF y lo almacena, junto con los datos generados de la solicitud de conversión. |

##### OpcionesPdf
```js
{
    "estilo_pdf": "John"
}
```
### Pdf

El objeto `pdf` es una instancia de `Pdf`, creado a partir de `cfdi.toPdf(opciones)`.

| Método                        | Descripción |
| ----------------------------- | ----------- |
| pdf.**toBuffer()**            | Devuelve: **Buffer**<br>El documento PDF como buffer, listo para almacenarse en el sistema de archivos o para enviarse de vuelta en una solicitud HTTP. |
| pdf.**getTransactionId()**    | Devuelve: **String - UUID**<br>Un ID único para la solicitud de transacción al servicio de redoc. |
| pdf.**getTotalPages()**       | Devuelve: **Integer**<br>El número total de páginas generadas para el archivo PDF. |
| pdf.**getTotalTimeMs()**      | Devuelve: **Integer**<br>Tiempo en milisegundos tomado para convertir el CFDI a PDF. |
| pdf.**getMetadata()**         | Devuelve: **Object** - [MetadatosCfdi]()<br>Información general del CFDI convertido. |

##### MetadatosCfdi
```js
{
    TDB...
}
```

## Contribuciones

¡Las contribuciones son bienvenidas! No dudes en enviarnos una solicitud de extracción o abrir un problema para cualquier error, característica o mejora.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - vea el archivo [LICENSE](LICENSE) para más detalles.
