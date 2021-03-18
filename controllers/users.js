const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');


const usersGet = async(req, res = response) => {

    // Parámetros opcionales
    // http://localhost:8080/api/users?q=hola&nombre=raul&apiKey=1234545656
    // const { q, nombre = 'No name', apiKey, page = 1, limit } = req.query;

    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };

    const [ total, users ] = await Promise.all([
        User.countDocuments( query ),
        User.find( query )
            .skip( Number( from ) )
            .limit( Number( limit ) )
    ]);

    res.json({
        ok: true,
        total,
        users
    });

}

const usersPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, mail, ...resto } = req.body;

    // TODO validar contra base de datos
    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );        
    }

    const user = await User.findByIdAndUpdate( id, resto );
    
    res.status(400).json({
        ok: true,
        user
    });

}

const usersPost = async(req, res = response) => {

    const { nombre, mail, password, role } = req.body;
    const user = new User( { nombre, mail, password, role } );

    // Verificar si el correo existe
    // const existeEmail = await User.findOne({ mail });
    // if ( existeEmail ) {
    //     return res.status(400).json({
    //         msg: 'El correo ya esta registrado'
    //     });
    // }

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await user.save();
    
    res.status(201).json({
        ok: true,
        msg: 'post API - userPost',
        user
    });

}

const userDelete = async(req, res = response) => {

    const { id } = req.params;

    // Fisicamente lo borramos
    // const user = await User.findByIdAndDelete( id );

    const user = await User.findByIdAndUpdate( id, { status: false });
    
    res.json({
        ok: true,
        user
    });

}

const userPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'patch API - controlador'
    })
}

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    userDelete,
    userPatch
}