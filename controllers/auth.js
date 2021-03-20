const { response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");


const login = async( req, res = response ) => {

    const { mail, password } = req.body;

    try {

        // Verificar si el email existe
        const user = await User.findOne({ mail });
        if ( !user ) {
            return res.status(400).json({
                msg: 'User/Password no son correctos - mail'
            });
        }

        // Si el usuario está activo
        if ( !user.status ) {
            return res.status(400).json({
                msg: 'User/Password no son correctos - estado: false'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'User/Password no son correctos - password'
            });
        }

        // Generar el JWT
        const token = await generarJWT( user.id );
    
        res.json({
            ok: true,
            user,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

const googleSignin = async( req, res = response ) => {

    const { id_token } = req.body;
    
    try {

        const { nombre, mail, img } = await googleVerify( id_token );

        let user = await User.findOne({ mail });

        if ( !user ) {

            // Tengo que crearlo
            const data = {
                nombre,
                mail,
                password: ':P',
                img,
                google: true
            }

            user = new User( data );
            await user.save();
        }

        // Si el usuario en DB
        if ( !user.status ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        // Generar JWT
        const token = await generarJWT( user.id );

        res.json({
            ok: true,
            user,
            token
        });

    } catch (error) {
        
        res.status(400).json({
            msg: 'Token de Google no es válido'
        });

    }

}

module.exports = {
    login,
    googleSignin
}