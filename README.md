# PreEntrega 2 - Backend Coderhouse - Aguilar Chira

Este proyecto es una aplicación de servidor desarrollada con Node.js y Express, utilizando Handlebars para las plantillas y Socket.IO para la implementación de WebSockets. La aplicación permite una gestión en tiempo real de productos en una interfaz amigable y dinámica.

## Características

-   **Express.js**: Configuración del servidor y manejo de rutas.
-   **Handlebars.js**: Motor de plantillas para generar las vistas de manera dinámica.
-   **Socket.IO**: Comunicación en tiempo real para actualizar la lista de productos sin necesidad de recargar la página.
-   **Express Router**: Organización de las rutas en módulos.
-   **Nodemon**: Para recargar automáticamente el servidor durante el desarrollo.
-   **Carpeta pública**: Contiene los archivos estáticos como CSS y JavaScript.

## Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/DalvinAguilar/PreEntrega2Backend-AguilarChira.git
    ```

2. Navega al directorio del proyecto:

    ```bash
    cd PreEntrega2Backend-AguilarChira
    ```

3. Instala las dependencias necesarias:

    ```bash
    npm install
    ```

## Scripts

-   Iniciar el servidor con nodemon:

    ```bash
    npm run dev
    ```

-   Iniciar el servidor sin nodemon:

    ```bash
    npm start
    ```

## Uso

### 1. Vistas con Handlebars

La aplicación utiliza **Handlebars** como motor de plantillas para generar el contenido dinámico en el frontend. Algunas vistas importantes:

-   **home.handlebars**: Página de inicio que muestra una lista de productos.
-   **realTimeProducts.handlebars**: Vista en tiempo real que utiliza Socket.IO para actualizar la lista de productos sin recargar la página.

El layout principal es `main.handlebars`, el cual contiene la estructura base HTML y es reutilizado por las diferentes vistas.

### 2. Socket.IO - Comunicación en tiempo real

Se implementa **Socket.IO** para manejar la comunicación en tiempo real entre el servidor y el cliente. Esta funcionalidad permite:

-   Actualizar la lista de productos en tiempo real.
-   Enviar eventos del servidor al cliente cuando se añaden, modifican o eliminan productos.

El archivo `realTimeProducts.js` maneja los eventos de WebSocket en el lado del cliente.

### 3. Estructura del proyecto

```bash
src/
│
├── public/               # Archivos estáticos (CSS, JS)
│   ├── realTimeProducts.js
│   └── styles.css
│
├── routes/               # Definición de las rutas
│   └── views.router.js
│
├── views/                # Plantillas de Handlebars
│   ├── home.handlebars
│   ├── realTimeProducts.handlebars
│   └── layouts/
│       └── main.handlebars
│
└── app.js                # Archivo principal para iniciar el servidor
```

### 4. Rutas

-   **/**: Muestra la página de inicio con la lista de productos.
-   **/realtimeproducts**: Muestra la vista en tiempo real para gestionar los productos utilizando WebSocket.

## Dependencias

-   [Express](https://expressjs.com/)
-   [Handlebars](https://handlebarsjs.com/)
-   [Socket.IO](https://socket.io/)
-   [Nodemon](https://nodemon.io/)

## Contribuciones

Las contribuciones son bienvenidas. Si tienes sugerencias o encuentras algún problema, por favor crea un issue o realiza un pull request.

## Licencia

Este proyecto está bajo la licencia MIT.
