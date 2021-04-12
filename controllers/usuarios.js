const { response, request } = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')


const usuariosGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query
    const usuarios = await Usuario.find()
        .skip(Number(desde))
        .limit(Number(limite))
    
    res.json({
        usuarios
    })
}

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body 
    const usuario = new Usuario({ nombre, correo, password, rol })

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
const usuariosPut = async (req, res = response) => {

    const {id} = req.params
    const { _id, password, google, correo, ...resto } = req.body

    if (password) {
        // encriptar la password
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync( password, salt )   
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto )

    res.status(500).json(usuario)
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