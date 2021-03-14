const { response } = require('express');


const usersGet = (req, res = response) => {

    // Parámetros opcionales
    // http://localhost:8080/api/users?q=hola&nombre=raul&apiKey=1234545656
    const { q, nombre = 'No name', apiKey, page = 1, limit } = req.query;

    res.json({
        ok: true,
        msg: 'get API - controlador',
        q,
        nombre,
        apiKey,
        page,
        limit
    });

}

const usersPut = (req, res = response) => {

    const { id } = req.params;
    
    res.status(400).json({
        ok: true,
        msg: 'put API - controlador',
        id
    });

}

const usersPost = (req, res = response) => {

    const { nombre, edad } = req.body;
    
    res.status(201).json({
        ok: true,
        msg: 'post API - userPost',
        nombre,
        edad
    });

}

const userDelete = (req, res = response) => {
    
    res.json({
        ok: true,
        msg: 'delete API - controlador'
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