const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');



const crearUsuario = async(req, res = response ) =>{

    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });
        
        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Existe un usuario con ese correo'
            });
        }

        usuario = new Usuario( req.body );
        
        // Encriptar contraseña con ayuda de bcrypt
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt);

        await usuario.save();

        //Generar JWT
        const token = await generarJWT( usuario.id, usuario.name );
            
        res.status(201).json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const loginUsuario = async(req, res = response ) =>{

    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });
        
        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe registro de usuario con email'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Password Incorrecto'
            })
        }

        //Generar nuestro JWT (Json Web Token)
        const token = await generarJWT( usuario.id, usuario.name );
         
        res.json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
    
}

const revalidarUsuario = async(req, res = response ) =>{

    //const uid = req.uid;
    //const name = req.name;
    const { uid, name } = req;

    //Generar JWT
    const token = await generarJWT( uid, name );

    res.json({
        uid,
        name,
        ok:true,
        token
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarUsuario,
}