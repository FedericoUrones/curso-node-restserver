const { response, request } = require('express')
const Usuario = require('../models/usuario')



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

    const body = req.body 
    const usuario = new Usuario(body)

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