
const { Router } = require('express');
const { check } = require('express-validator');


const router = Router();
const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { 
    usersGet, 
    usersPut, 
    usersPost, 
    userDelete, 
    userPatch 
} = require('../controllers/users');

router.get( '/', usersGet );

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('role').custom( esRolValido ),
    validarCampos
], usersPut );

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser mayor a 6 caracteres').isLength({ min: 6 }),
    check('mail', 'El correo no es valido')
        .isEmail()
        .custom( emailExiste ),
    // check('role', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom( esRolValido ),
    validarCampos
], usersPost );

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], userDelete );

router.patch('/', userPatch );


module.exports = router;

