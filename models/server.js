const express = require('express');
var cors = require('cors');

const { dbConnection } = require('../database/config');
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth        : '/api/auth',
            buscar      : '/api/buscar',
            categories  : '/api/categories',
            products    : '/api/products',
            users       : '/api/users'
        }

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {

        await dbConnection();

    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {

        this.app.use( this.paths.auth,          require('../routes/auth') );
        this.app.use( this.paths.buscar,        require('../routes/buscar') );
        this.app.use( this.paths.categories,    require('../routes/categorias') );
        this.app.use( this.paths.products,      require('../routes/productos') );
        this.app.use( this.paths.users,         require('../routes/user') );

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Example app listening at http://localhost:', this.port);
        });
    }

}

module.exports = Server;