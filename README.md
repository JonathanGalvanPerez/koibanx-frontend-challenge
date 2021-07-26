# Koibanx Frontend Challenge
Aplicación web SPA desarrollado en React. La app muestra una tabla con datos de comercios de forma paginada y permite filtrar por multiples campos.

## Installation
Run `npm install` in the root folder.

## Running server
Run `npm start`.

_App runs on **http://localhost:3000/** by default._

## Consideraciones
Se utlizaron diferentes librerias y herramientas para cubrir las necesidades de la aplicación:
- **React Query** como manejador de estado. Permite utilizar hooks para pre-solicitar la información y cachear los datos.
- **Chakra UI** como libreria de componentes y estilos para simplificar el desarrollo.
- **Typescript** para enrobustecer el código, definir los modelos de la aplicación y agilizar la detección errores.
- **Mock Service Worker** para generar el mock de la api.

Otras consideraciones son:
- La tabla se dividió en forma de tabs para mostrar más información y permite expandir la información en un futuro.
- Por defecto se ejecuta un mock de la api a través de un worker.
