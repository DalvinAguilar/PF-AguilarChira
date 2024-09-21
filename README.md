# Pre Entrega 1 Curso Backend CoderHouse - Proyecto de Gestión de Productos y Carritos

Este proyecto es una aplicación web desarrollada en Node.js con Express, que permite gestionar productos y carritos de compras. Incluye funcionalidades para agregar, actualizar y eliminar productos, así como para crear y manejar carritos de compras.

## Estructura del Proyecto

```
/src
  /controllers
    CartManager.js
    ProductManager.js
  /data
    carts.json
    products.json
  /routes
    products.routes.js
    carts.routes.js
app.js
```

## Requisitos

-   [Node.js](https://nodejs.org/) (versión 14 o superior)
-   [npm](https://www.npmjs.com/) (incluido con Node.js)

## Dependencias

El proyecto utiliza las siguientes dependencias:

-   **express**: ^4.17.3 (o la última versión compatible)
-   **nodemon**: ^2.0.22 (o la última versión compatible)

## Instalación

1. Clona el repositorio:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd nombre-del-repositorio
    ```
3. Instala las dependencias:
    ```bash
    npm install
    ```

## Ejecución

Para ejecutar el servidor en modo desarrollo, usa el siguiente comando:

```bash
npm run dev
```

El servidor se iniciará en `http://localhost:8080`.

## Endpoints

### Productos

-   **GET /api/products**: Obtiene todos los productos (opcional: `?limit` para limitar la cantidad).
-   **GET /api/products/:pid**: Obtiene un producto específico por su ID.
-   **POST /api/products**: Agrega un nuevo producto.
-   **PUT /api/products/:pid**: Actualiza un producto existente.
-   **DELETE /api/products/:pid**: Elimina un producto.

### Carritos

-   **POST /api/carts**: Crea un nuevo carrito.
-   **GET /api/carts/:cid**: Obtiene los productos en un carrito específico.
-   **POST /api/carts/:cid/product/:pid**: Agrega un producto a un carrito.
