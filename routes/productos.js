// TODO: hacer todo lo mismo que con Categoría y mismos nombres pero con Producto:
// obtenerProductos, obtenerProductos, crearProducto, actualizarProducto, borrarProducto
// Todo lo mismo, consejo: primero hacer la parte de crearProducto

const { Router } = require('express')
const { check } = require('express-validator')
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productos')
const { existeProductoPorId } = require('../helpers/db-validators')
const { existeCategoriaPorId } = require('../helpers/db-validators')
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares')

const router = Router()

/**
 * {{url}}/api/productos
 */
// Todos los productos - publico
router.get('/',
    obtenerProductos
)

// obtener un producto por id - publico
router.get('/:id', [
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
], obtenerProducto)

// crear Producto - privado - cualquier persona con token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('categoria', 'No es un id de mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos,
], crearProducto)

// actualizar Producto - privado - cualquier persona con token válido
router.put('/:id', [
    validarJWT,
    check('id').custom(existeProductoPorId),
    validarCampos
], actualizarProducto)

// borrar una Producto - privado - sólo admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], borrarProducto)

module.exports = router