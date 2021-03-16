const { response, request } = require('express')

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

const usuariosPost = (req, res = response) => {

    const { nombre, edad} = req.body 

    res.status(201).json({
        msg: 'post api',
        nombre,
        edad
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