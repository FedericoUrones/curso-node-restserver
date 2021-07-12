const { Router } = require('express')
const { check } = require('express-validator')
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias')
const { existeCategoriaPorId } = require('../helpers/db-validators')
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares')

const router = Router()

/**
 * {{url}}/api/categorias
 */
// Todas las categorias - publico
router.get('/', 
    obtenerCategorias
)

// obtener una categoría por id - publico
router.get('/:id', [
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos,
], obtenerCategoria)

// crear categoria - privado - cualquier persona con token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos,
], crearCategoria)

// actualizar categoria - privado - cualquier persona con token válido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], actualizarCategoria)

// borrar una categoria - privado - sólo admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], borrarCategoria)

module.exports = router