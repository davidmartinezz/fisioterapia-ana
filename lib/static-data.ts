// All static content for the website — edit here to update any text
export const SITE = {
  nombre: 'Ana María González Gómez',
  titulo: 'Ana María González Gómez · Fisioterapeuta',
  eslogan: 'Especializada en tratamiento del dolor y recuperación funcional',
  descripcion:
    'Atención cercana, profesional y completamente adaptada a cada paciente. Tu recuperación, mi compromiso.',
  numeroColegiada: '17410',
  email: 'fisioterapiaadomicilio.am@gmail.com',
  ubicacion: 'Leganés, Madrid',
  ubicacionTexto: 'Avenida María Guerrero 92, Leganés · Dirección exacta facilitada al concertar cita',
  whatsapp: '',
}

export const BIO = {
  parrafos: [
    'Soy Ana María González Gómez, fisioterapeuta colegiada especializada en el tratamiento del dolor y la recuperación funcional. Mi objetivo es ofrecer una atención cercana, profesional y completamente adaptada a las necesidades de cada paciente.',
    'Graduada en Fisioterapia por la Universidad Rey Juan Carlos y con Máster en Fisioterapia Manual del Aparato Locomotor por la Universidad de Alcalá de Henares, complemento mi formación con conocimientos en método Pilates, ecografía y técnicas invasivas.',
  ],
  cita: 'Si buscas un tratamiento personalizado que combine técnica, humanidad y una inquebrantable voluntad de ayudar, estoy encantada de poder acompañarte en tu recuperación.',
}

export const FORMACION = [
  {
    titulo: 'Grado en Fisioterapia',
    institucion: 'Universidad Rey Juan Carlos',
    anio: null,
  },
  {
    titulo: 'Máster en Fisioterapia Manual del Aparato Locomotor',
    institucion: 'Universidad de Alcalá de Henares',
    anio: null,
  },
  {
    titulo: 'Formación en Método Pilates',
    institucion: null,
    anio: null,
  },
  {
    titulo: 'Formación en Ecografía Musculoesquelética',
    institucion: null,
    anio: null,
  },
  {
    titulo: 'Formación en Técnicas Invasivas (Punción Seca)',
    institucion: null,
    anio: null,
  },
]

export const TECNICAS = [
  {
    icono: 'Hand',
    titulo: 'Terapia Manual',
    descripcion:
      'Movilizaciones articulares, manipulaciones, técnicas miofasciales y neurodinámicas para restaurar el movimiento óptimo y reducir el dolor.',
  },
  {
    icono: 'NeedleCustom',
    titulo: 'Punción Seca',
    descripcion:
      'Técnica invasiva con aguja de acupuntura estéril para el tratamiento de puntos gatillo miofasciales. Muy eficaz en la modulación del dolor.',
  },
  {
    icono: 'Dumbbell',
    titulo: 'Ejercicio Terapéutico',
    descripcion:
      'Programas de ejercicio individualizado para recuperar la fuerza, la movilidad y la estabilidad funcional de forma progresiva.',
  },
  {
    icono: 'Droplets',
    titulo: 'Drenaje Linfático Manual',
    descripcion:
      'Técnica suave especializada que estimula el sistema linfático, reduciendo edemas y mejorando la circulación tisular.',
  },
  {
    icono: 'Activity',
    titulo: 'Fisioterapia Deportiva y Preventiva',
    descripcion:
      'Tratamiento y prevención de lesiones deportivas, con protocolos de vuelta a la actividad física adaptados a cada deporte.',
  },
  {
    icono: 'Heart',
    titulo: 'Fisioterapia Geriátrica',
    descripcion:
      'Atención especializada para mejorar la autonomía, el equilibrio y la calidad de vida en personas mayores.',
  },
]

export const PATOLOGIAS = [
  {
    icono: 'NeckCustom',
    titulo: 'Cervicalgias',
    descripcion: 'Dolor cervical, contracturas y limitación de movimiento en la zona del cuello.',
  },
  {
    icono: 'SpineCustom',
    titulo: 'Lumbalgias',
    descripcion: 'Dolor lumbar agudo y crónico, hernias discales y ciática.',
  },
  {
    icono: 'Zap',
    titulo: 'Tendinopatías',
    descripcion: 'Tendinitis y tendinosis de hombro, rodilla, codo y otras articulaciones.',
  },
  {
    icono: 'JawCustom',
    titulo: 'Patología de ATM · Bruxismo',
    descripcion:
      'Disfunción de la articulación temporomandibular, dolor de mandíbula y bruxismo.',
  },
  {
    icono: 'Footprints',
    titulo: 'Fascitis Plantar',
    descripcion: 'Dolor plantar, espolón calcáneo y alteraciones biomecánicas del pie.',
  },
  {
    icono: 'AlertTriangle',
    titulo: 'Esguince de Tobillo',
    descripcion:
      'Tratamiento en fases agudas y crónicas con protocolo de vuelta a la actividad.',
  },
  {
    icono: 'HeartPulse',
    titulo: 'Recuperación Postquirúrgica',
    descripcion:
      'Rehabilitación tras intervenciones: prótesis, artroscopias, reparaciones ligamentosas…',
  },
  {
    icono: 'Layers',
    titulo: 'Lipedema',
    descripcion:
      'Tratamiento especializado del lipedema mediante drenaje linfático y técnicas específicas.',
  },
  {
    icono: 'Brain',
    titulo: 'Migrañas y Cefaleas',
    descripcion:
      'Abordaje fisioterapéutico de cefaleas y migrañas mediante terapia manual cervical y craneofacial.',
  },
]

export const METODOLOGIA = [
  {
    numero: '01',
    icono: 'ClipboardList',
    titulo: 'Valoración Clínica',
    descripcion:
      'Evaluación exhaustiva de tu historial médico, exploración física detallada y análisis del movimiento para entender el origen real de tu problema.',
  },
  {
    numero: '02',
    icono: 'Stethoscope',
    titulo: 'Diagnóstico y Plan',
    descripcion:
      'Con un buen criterio diagnóstico, diseño un plan de tratamiento completamente personalizado, seleccionando las técnicas más eficaces para tu caso y tus objetivos.',
  },
  {
    numero: '03',
    icono: 'TrendingUp',
    titulo: 'Tratamiento y Seguimiento',
    descripcion:
      'Aplico el tratamiento de forma profesional y realizo un seguimiento continuo, adaptando el plan según tu evolución para asegurar los mejores resultados.',
  },
]

export const TARIFAS = [
  {
    etiqueta: 'Sesión individual',
    nombre: 'Sesión única',
    precio: 45,
    unidad: 'por sesión',
    ahorro: null,
    destacada: false,
  },
  {
    etiqueta: 'Bono ahorro',
    nombre: 'Bono 5 sesiones',
    precio: 215,
    unidad: '43 € / sesión',
    ahorro: 'Ahorras 10 €',
    destacada: true,
  },
  {
    etiqueta: 'Mejor precio',
    nombre: 'Bono 10 sesiones',
    precio: 400,
    unidad: '40 € / sesión',
    ahorro: 'Ahorras 50 €',
    destacada: false,
  },
]

export const DISPONIBILIDAD = [
  { dia: 'Lunes', horas: ['17:00', '18:00'] },
  { dia: 'Martes', horas: ['17:00'] },
  { dia: 'Miércoles', horas: ['11:00', '12:00'] },
  { dia: 'Jueves', horas: ['11:00', '12:00'] },
  { dia: 'Viernes', horas: ['18:00', '19:00'] },
]

export const TESTIMONIOS = [
  {
    id: '1',
    nombre_paciente: 'Mireya Roura',
    texto: 'Estoy muy satisfecha con el trabajo que ha realizado Ana conmigo. Fui con mucha rigidez, dolor lumbar y cervical y únicamente con dos sesiones mi dolencia ha mejorado muchísimo. Quiero destacar el excelente trato a nivel personal y profesional.',
    puntuacion: 5,
    fecha: 'Hace 4 meses',
  },
  {
    id: '2',
    nombre_paciente: 'Laura Casas',
    texto: 'Acudí por un dolor en el codo y antebrazo izquierdo que me limitaba bastante. Desde el primer día el trato ha sido excelente, cercano, profesional y muy humano. Ana supo identificar el problema para poder aplicarme el tratamiento más adecuado para mi dolencia. He mejorado muchísimo y el dolor ha disminuido bastante. Totalmente recomendable',
    puntuacion: 5,
    fecha: 'Hace 8 meses',
  },
  {
    id: '3',
    nombre_paciente: 'Ángeles Rodríguez',
    texto: 'Acudí por dolor en el cuello y espalda desde hace meses y con la tercera sesión, que me puso punción seca, prácticamente ha desaparecido el dolor constante. El trato de Ana es muy profesional y cercano.',
    puntuacion: 5,
    fecha: 'Hace 2 semanas',
  },
  {
    id: '4',
    nombre_paciente: 'Estíbaliz Ruiz',
    texto: 'Llegué con una lesión con bastante dolor en la espalda y con las sesiones programadas con Ana he notado muchísima mejoría ya desde la primera sesión. De hecho ya después de la tercera sesión no tengo ningún síntoma ni dolor. Lo recomiendo sin duda, porque además el trato y la confianza es impecable. Muchísimas gracias por todo, Ana! Nos vemos después del verano!',
    puntuacion: 5,
    fecha: 'Hace 10 meses',
  },
]
