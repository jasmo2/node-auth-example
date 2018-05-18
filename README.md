# Ejemplo de autenticación en Node.js

Este ejemplo muestra cómo manejar la autenticación de usuarios con Express.js y MongoDB.

## Requisitos

* [MongoDB](https://guides.makeitreal.camp/bases-de-datos/mongodb)
* [Node.js](https://guides.makeitreal.camp/javascript-i/primeros-pasos#instalacion-de-node-js)
* [Yarn](https://guides.makeitreal.camp/javascript-ii/librerias-node.js#yarn)

## Configuración

1. Asegúrate que **MongoDB** esté corriendo.

2. Instala las dependencias ejecutando:

    ```
    $ yarn install
    ```

3. Inicia el servidor ejecutando:

    ```
    $ node app.js
    ```

4. Abre un navegador en http://localhost:3000/

## Explicación

Esta aplicación utiliza las siguientes librerías:

* [Express.js](https://expressjs.com/) - Web framework de Node.js
* [Mongoose](http://mongoosejs.com/) - La interacción con MongoDB
* [bcrypt](https://github.com/kelektiv/node.bcrypt.js/) - Encripción de contraseñas
* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - Implementación de JSON Web Tokens para Node.js
* [EJS](http://ejs.co/) - Para las vistas

En el archivo [app.js](app.js) vas a encontrar la configuración de Express.js y Mongoose.

En el archivo [user.js](user.js) vas a encontrar el modelo de Mongoose.

En el archivo [routes.js](routes.js) vas a encontrar las rutas de Express.js:

* `GET /` - La ruta principal, si el usuario no está autenticado lo manda a `GET /login`.
* `GET /register` - El formulario de registro.
* `POST /register` - Registra el usuario con la información del formulario.
* `GET /login` - El formulario de login.
* `POST /login` - Autentica al usuario con la información del formulario.
* `GET /logout` - Elimina la cookie.

En la carpeta [views](views) vas a encontrar las vistas que se utilizan en las rutas
