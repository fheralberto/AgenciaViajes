import { Viaje } from "../models/Viaje.js";
import { Testimonial } from "../models/Testimonial.js";

const paginaInicio = async (req, res) => {
  const promiseDB = [];
  // Arranca las 2 consultas simultáneamente (Mejora performance)
  promiseDB.push(Viaje.findAll({ limit: 3 }));
  promiseDB.push(Testimonial.findAll({ limit: 3 }));
  try {
    // Arrnca Una consulta, y al terminar, arranca la otra... (no eficiente)
    // Consulta 3 viajes del modelo Viaje
    // const viajes = await Viaje.findAll({ limit: 3 });
    // Consulta 3 testimoniales del modelo Testimoniales
    // const testimoniales = await Testimonial.findAll({ limit: 3 });

    // Continúa el código después de cumplir las promesas de promiseDB
    const resultado = await Promise.all(promiseDB)

    res.render('inicio', {
      pagina: 'Inicio',
      clase: 'home',
      viajes: resultado[0],
      testimoniales: resultado[1]
    })
  } catch (error) {
    console.log(error)
  }
}
const paginaNosotros = (req, res) => {
  res.render('nosotros', {
    pagina: 'Nosotros'
  });
}
const paginaViajes = async (req, res) => {
  // Consulta BD
  const viajes = await Viaje.findAll();
  // console.log(viajes);
  res.render('viajes', {
    pagina: 'Próximos viajes',
    viajes
  });
}
const paginaTestimoniales = async (req, res) => {
  try {
    // Consulta testimoniales existentes
    const testimoniales = await Testimonial.findAll();
    res.render('testimoniales', {
      pagina: 'Testimoniales',
      testimoniales
    });
  } catch (error) {
    console.log(error);
  }
}
const paginaDetalleViaje = async (req, res) => {
  // console.log(req.params.viaje);
  const { slug } = req.params
  try {
    const viaje = await Viaje.findOne({ where: { slug } });
    res.render('viaje', {
      pagina: 'Información viaje',
      viaje
    })
  } catch (error) {
    console.log(error)
  }
}
export {
  paginaInicio, paginaNosotros, paginaViajes,
  paginaTestimoniales, paginaDetalleViaje
}




// Primer Hola mundo:
// Se envía petición con get(ruta, (request, response, next))
// method: En el Hola mundo usaremos el get
// request: Petición enviada al servidor
// response: Respuesta del servidor por medio de express

// Crea respuesta personalizada
// res.send('Hola mundo'); // .send: Envía la respuesta en pantalla
// res.json({id: 1}) // Muestra un objeto json
// res.render() // Responde con una vista ('Un html completo')
