const Rol = require('../models/role');
const User = require('../models/user');

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

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}