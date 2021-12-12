import express from 'express';
const router = express.Router();
import { 
  paginaInicio, paginaNosotros, paginaViajes, 
  paginaTestimoniales, paginaDetalleViaje
} from '../controllers/paginasController.js'
import { 
  guardarTestimonial 
} from '../controllers/testimonialController.js'

// Escanea y busca el archivo del primer parámetro
router.get('/', paginaInicio);
router.get('/nosotros', paginaNosotros);
router.get('/viajes', paginaViajes);
// :slug es un comodín, es una variable
router.get('/viajes/:slug', paginaDetalleViaje);
router.get('/testimoniales', paginaTestimoniales);
router.post('/testimoniales', guardarTestimonial);

export default router;