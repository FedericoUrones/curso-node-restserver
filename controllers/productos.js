const { response } = require("express");
const { Producto } = require('../models')

const obtenerProductos = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true }
    
    const [ total, productos] = await Promise.all([
        Producto.countDocuments( query ),
        Producto.find( query )
            .populate("categoria", "nombre")
            .populate("usuario", "nombre")
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total, 
        productos
    })
}

// obtenerProducto - populate {}
const obtenerProducto = async (req, res = response) => {
    const { id } = req.params
    const producto = await Producto.findById( id, {new: true} ).populate("usuario", "nombre").populate("categoria", "nombre")

    res.json(producto)
}

// actualizarProducto
const actualizarProducto = async (req, res = response) => {
    const { id } = req.params
    const { estado, usuario, ...data} = req.body
    if (data.nombre){
        data.nombre = data.nombre.toUpperCase()
    }
    data.usuario = req.usuario._id
    const producto = await Producto.findByIdAndUpdate(id, data, {new: true})
    res.status(201).json(producto)
}

// borrarProducto - estado: false (no se borra físicamente)
const borrarProducto = async (req, res = response) => {
    const { id } = req.params
    const query = { estado: false }
    const producto = await Producto.findByIdAndUpdate(id, query, {new: true})

    res.status(201).json(producto)
}

const crearProducto = async (req, res = response) => {

    const { estado, usuario, ...body } = req.body

    const productoDB = await Producto.findOne({ nombre: body.nombre.toUpperCase() })

    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${ productoDB.nombre } ya existe`
        })
    }

    // Generar data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(), 
        usuario: req.usuario._id
    }

    const producto = new Producto(data)
    // Guardar en DB
    await producto.save()

    res.status(201).json(producto)

}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}