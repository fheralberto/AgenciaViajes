import { Testimonial } from '../models/Testimonial.js'

const guardarTestimonial = async (req, res) => {
  // console.log(req.body)
  // Valida formulario
  const { nombre, correo, mensaje } = req.body
  const errores = [];
  if (nombre.trim() === '') {
    errores.push({ mensaje: 'El nombre está vacío' })
  }
  if (correo.trim() === '') {
    errores.push({ mensaje: 'El correo está vacío' })
  }
  if (mensaje.trim() === '') {
    errores.push({ mensaje: 'El mensaje está vacío' })
  }
  // console.log(errores);
  if (errores.length > 0) {
    // Consulta testimoniales existentes
    const testimoniales = await Testimonial.findAll();
    // Mostrar la vista con errores
    res.render('testimoniales', {
      pagina: 'Testimoniales',
      errores,
      nombre,
      correo,
      mensaje,
      testimoniales
    })
  } else {
    try{
      // Almacenar en la base de datos
      await Testimonial.create({
        nombre, correo, mensaje
      });
      res.redirect('/testimoniales');
    } catch(error){
      console.log(error)
    }
  }
}

export { guardarTestimonial }