const { Router, response } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');
const { 
    existeCategoriaPorId, 
    existeProductoPorId 
} = require('../helpers/db-validators');

const { 
    crearProducto, 
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto 
} = require('../controllers/productos');

const router = Router();

router.get('/', obtenerProductos );

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], obtenerProducto);

router.post('/', [
    validarJWT,
    esAdminRole,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo valido').isMongoId(),
    check('categoria', 'La categoría es requerida').not().isEmpty(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos
], crearProducto);

router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], actualizarProducto );

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], borrarProducto );

module.exports = router;