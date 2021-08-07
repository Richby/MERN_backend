//const router = require("./auth");
//const { validarCampos } = require('../middlewares/validar-campos');
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos,crearEvento, actualizarEventos, deleteEventos} = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

const router = Router();

//Todas tienen que pasar por la validacion de JWT
router.use( validarJWT ); //Con esta instrucción todas las rutas pasan por validacion
//Si se requiere que no pase por validarJWT, esta debe estar por encima de esta linea


//Obtener eventos
router.get('/', getEventos);

//Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento);

//Actualizar evento
router.put('/:id', actualizarEventos);

//Borrar evento
router.delete('/:id', deleteEventos);

module.exports = router;
