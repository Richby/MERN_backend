/*
    Rutas de usuarios / Auth
    host + /api/auth
*/

const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const { crearUsuario, loginUsuario, revalidarUsuario } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


router.post(
    '/new',
    [ // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),  //El nombre debe ser obligatorio y que no esté vacio
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'El email es incorrecto').isEmail().normalizeEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('password', 'El password debe tener un minimo de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario
    );

router.post(
    '/',
    [ // middlewares
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'El email es incorrecto').isEmail().normalizeEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('password', 'El password debe tener un minimo de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario
    );

router.get('/renew', validarJWT, revalidarUsuario );

module.exports = router;