const { Categoria, Rol, User, Producto } = require('../models');

const esRolValido = async(rol = '') => {
    const existeRol = await Rol.findOne({ rol });

    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

const emailExiste = async( mail  = '' ) => {
    const existeEmail = await User.findOne({ mail });

    if ( existeEmail ) {
        throw new Error(`El correo: ${ mail } ya esta registrado`);
    }
}

const existeUsuarioPorId = async( id  = '' ) => {
    const existeUsuario = await User.findById( id );

    if ( !existeUsuario ) {
        throw new Error(`El id no existe: ${ id }`);
    }
}

/**
 *  Validador de Categorias
 */
const existeCategoriaPorId = async(id = '') => {
    const existeCategoria = await Categoria.findById(id);

    if ( !existeCategoria ) {
        throw new Error(`La categoria no esta registrada`);
    }
}

/**
 *  Validador de Productos
 */
const existeProductoPorId = async(id = '') => {
    const existeProducto = await Producto.findById(id);

    if ( !existeProducto ) {
        throw new Error(`El producto no esta registrado`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}