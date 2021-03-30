const { response, request } = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')


const usuariosGet = (req = request, res = response) => {

    const { q, nombre = 'no name', apiKey, page = 1, limit} = req.query
    
    res.json({
        msg: 'get api - controlador',
        q,
        nombre,
        apiKey,
        page,
        limit
    })
}

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body 
    const usuario = new Usuario({ nombre, correo, password, rol })

    // verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo })
    if ( existeEmail ) {
        return res.status(400).json({
            msg: 'Ese correo ya está registrado'
        })
    }

    // encriptar password
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync( password, salt )
    


    // guardar en bdd
    await usuario.save()

    res.status(201).json({
        msg: 'post api',
        usuario
    })
}
const usuariosPut = (req, res = response) => {

    const id = req.params.id

    res.status(500).json({
        msg: 'put api - controlador',
        id
    })
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete api - controlador'
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch api - controlador'
    })
}


module.exports = {
    usuariosGet, 
    usuariosPut,
    usuariosDelete,
    usuariosPatch,
    usuariosPost
}