const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { User, Categoria, Producto } = require('../models');

const coleccionesPermitidas = [
    'categories',
    'products',
    'users',
    'rols'
];

const buscarUsuarios = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid(termino); // TRUE

    if ( esMongoID ) {

        const user = await User.findById(termino);
        return res.json({
            ok: true,
            results: ( user ) ? [ user ] : []
        });

    }

    // Busquedas insensibles y que no haga diferencia entre minusculas y mayusculas
    const regex = new RegExp( termino, 'i' );

    const usuarios = await User.find({ 
        $or: [{ nombre: regex }, { mail: regex }],
        $and: [{ estado: true }] 
    });

    res.json({
        ok: true,
        results: usuarios
    });

}

const buscarCategorias = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid(termino); // TRUE

    if ( esMongoID ) {

        const categoria = await Categoria.findById(termino);
        return res.json({
            ok: true,
            results: ( categoria ) ? [ categoria ] : []
        });

    }

    // Busquedas insensibles y que no haga diferencia entre minusculas y mayusculas
    const regex = new RegExp( termino, 'i' );

    const categorias = await Categoria.find({ nombre: regex, estado: true });

    res.json({
        ok: true,
        results: categorias
    });

}

const buscarProductos = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid(termino); // TRUE

    if ( esMongoID ) {

        const producto = await Producto.findById(termino).populate('categoria','nombre');
        return res.json({
            ok: true,
            results: ( producto ) ? [ producto ] : []
        });

    }

    // Busquedas insensibles y que no haga diferencia entre minusculas y mayusculas
    const regex = new RegExp( termino, 'i' );

    const productos = await Producto.find({ nombre: regex, estado: true }).populate('categoria','nombre');

    res.json({
        ok: true,
        results: productos
    });

}


const buscar = ( req, res = response ) => {

    const { coleccion, termino } = req.params;

    if ( !coleccionesPermitidas.includes(coleccion) ) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ coleccionesPermitidas }`
        });
    }

    switch ( coleccion ) {
        case 'categories':
                buscarCategorias( termino, res );
            break;

        case 'products':
                buscarProductos( termino, res );
            break;

        case 'users':
                buscarUsuarios( termino, res );
            break;
    
        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta búsqueda'
            })
    }

}

module.exports = {
    buscar
}