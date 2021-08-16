const { Categoria, Role, Usuario, Producto } = require('../models')

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol })
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`)
    }
}

const emailExiste = async ( correo  = '') => {
    // verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo })
    if ( existeEmail ) {
        throw new Error(`El correo ${ correo } ya está registrado en la BD`)
    }
}

const existeUsuarioPorId = async ( id ) => {
    // verificar si el id de usuario existe
    const existeUsuario = await Usuario.findById(id)
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`)
    }
}

const existeCategoriaPorId = async ( id ) => {
    // verificar si el id de categoría existe, y si no existe tirar error
    const existeCategoria = await Categoria.findById(id);
    if ( !existeCategoria ) {
        throw new Error(`El id de categoría no existe ${ id }`)
    }
}

const existeProductoPorId = async ( id ) => {
    // verificar si el id de producto existe, y si no existe tirar error
    const existeProducto = await Producto.findById(id);
    if ( !existeProducto ) {
        throw new Error(`El id de producto no existe ${ id }`)
    }
}

/**
 * Validar colecciones permitidas
 */
const coleccionesPermitidas = ( coleccion = '', colecciones = []) => {
    
    const incluida = colecciones.includes( coleccion )
    if (!incluida) {
        throw new Error(`La colección ${coleccion} no es permitida, colecciones permitidas: ${colecciones}`)
    }
    return true
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}