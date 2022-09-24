import express from 'express';
import {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimonios,
    paginaDetalleViaje
} from '../controllers/pagController.js';

import { guardarTestimonio } from '../controllers/testimonioController.js';

const router = express.Router();

router.get('/', paginaInicio);

router.get('/nosotros', paginaNosotros);

router.get('/viajes', paginaViajes);

router.get('/viajes/:slug', paginaDetalleViaje);


router.get('/testimonios', paginaTestimonios);
//post para recoger datos del formulario
router.post('/testimonios', guardarTestimonio)

export default router;