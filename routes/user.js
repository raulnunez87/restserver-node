
const { Router } = require('express');

const router = Router();

const { 
    usersGet, 
    usersPut, 
    usersPost, 
    userDelete, 
    userPatch 
} = require('../controllers/users');

router.get( '/', usersGet );

router.put('/:id', usersPut );

router.post('/', usersPost );

router.delete('/', userDelete );

router.patch('/', userPatch );


module.exports = router;

