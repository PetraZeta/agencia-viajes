import { Viaje } from '../models/Viaje.js';
import { Testimonio } from '../models/Testimonio.js';


const paginaInicio = async (req, res) => {
    //consultar ultimos tres viajes
    const promiseDB = []; //para renderizar las dos peticiones 
    promiseDB.push(Viaje.findAll({ limit: 3 }));
    promiseDB.push(Testimonio.findAll({ limit: 3 }));

    try {
        //ejecutar ambas peticiones a la vez 
        const resultado = await Promise.all(promiseDB);

          res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimonios: resultado[1]
    
          });
    } catch (error) {
        console.log(error);
    }
  
}

const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}
const paginaViajes = async (req, res) => {
    //consultar BD
    const viajes = await Viaje.findAll();
    console.log(viajes);
    //para pasar a la vista
    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes
    });
}
//pasar los ultimos testimonios a la vista
const paginaTestimonios = async (req, res) => {
    try {
        const testimonios = await Testimonio.findAll();
        res.render('testimonios', {
            pagina: 'Testimonios',
            testimonios  //pasamos a la vista
    });
    } catch (error){
        console.error(error);
        
  }
}
//Muestra vija por su slug
const paginaDetalleViaje = async (req, res) => {
    const { slug } = req.params;
    
    try {
        const viaje = await Viaje.findOne({ where: { slug } });    
        res.render('viaje', {
            pagina: 'Información Viaje',
            viaje
        })
    } catch (error) {
        console.error(error);
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes, 
    paginaTestimonios,
    paginaDetalleViaje
}