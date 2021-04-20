const { response } = require('express')
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario')

const login = async ( req, res = response) => {

    const { correo, password } = req.body;

    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne( { correo })
        if ( !usuario ) {
            return res.status(400).json( {
                msg: 'Usuario / Password no son correctos - correo' // la parte del "- correo" no iría en realidad
            })
        }

        // Verificar si el usuario está activo
        if ( !usuario.estado ) {
            return res.status(400).json( {
                msg: 'Usuario / Password no son correctos - estado: false' // la parte del "- estado: false" no iría en realidad
            })
        }
        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password )
        if ( !validPassword ) {
            return res.status(400).json( {
                msg: 'Usuario / Password no son correctos - password' // la parte del "- password" no iría en realidad
            })
        }

        // Generar el JWT

        res.json({
            msg: 'Login ok'
        })    
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {
    login
}