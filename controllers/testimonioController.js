//modelo de testimonios
import {Testimonio} from '../models/Testimonio.js'

const guardarTestimonio = async (req, res) => {
    //Valiar que los input no vengan vacios
    const { nombre, correo, mensaje } = req.body;
    const errores = [];

    if (nombre.trim() === '') {
        errores.push({ msj: 'El nombre está vacío' });
    }
      if (correo.trim() === '') {
        errores.push({ msj: 'El correo está vacío' });
    }
      if (mensaje.trim() === '') {
        errores.push({ msj: 'El mensaje está vacío'});
    }
    //pasar os errores a la vista
    if (errores.length > 0) {
        //consultr testimonios existentes
        const testimonios = await Testimonio.findAll();
        //mostrar los errores.RENDER recibe: (vista, {datos a enviar})
        res.render('testimonios', {
            pagina: 'Testimonios',
            errores,
            nombre,
            correo,
            mensaje, 
            testimonios
        });

    } else {
        //almacenar datos en BD
        try {
            await Testimonio.create({
                nombre,
                correo,
                mensaje
            });
             //redirigir a la vista
            res.redirect('/testimonios');
        } catch(error) {
            console.error(error);
        }

    }
}
export {
    guardarTestimonio
}