const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');

const { 
    crearCategoria, 
    obtenerCategoria, 
    obtenerCategorias, 
    actualizarCategoria,
    borrarCategoria
} = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');

const router = Router();

/**
 *  {{ulr}}/api/categorias
 */

// Obtener todas las categorias - publico
router.get('/', obtenerCategorias );

// Obtener una categoria por id - publico
// Realizar middleware para validar el ID check('id').custom( existeCategoria ) - Si no existe debe tirar un error
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], obtenerCategoria);

// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos, 
    validarJWT 
], crearCategoria);

// Actualizar - privado - cualquiera con token válido
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], actualizarCategoria );

// Borrar una categoría - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], borrarCategoria );


module.exports = router;