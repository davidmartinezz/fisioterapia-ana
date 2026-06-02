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
      'Movilizaciones articulares, manipulaciones y técnicas de tejido blando para restaurar el movimiento y reducir el dolor.',
  },
  {
    icono: 'Syringe',
    titulo: 'Punción Seca',
    descripcion:
      'Técnica invasiva con aguja fina para el tratamiento de puntos gatillo miofasciales. Muy eficaz en el dolor muscular crónico.',
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
    icono: 'Stethoscope',
    titulo: 'Cervicalgias',
    descripcion: 'Dolor cervical, contracturas y limitación de movimiento en la zona del cuello.',
  },
  {
    icono: 'Shield',
    titulo: 'Lumbalgias',
    descripcion: 'Dolor lumbar agudo y crónico, hernias discales y ciática.',
  },
  {
    icono: 'Zap',
    titulo: 'Tendinopatías',
    descripcion: 'Tendinitis y tendinosis de hombro, rodilla, codo y otras articulaciones.',
  },
  {
    icono: 'MessageCircle',
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
      'Tratamiento agudo y rehabilitación de esguinces con protocolo de vuelta a la actividad.',
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
  { dia: 'Lunes', hora: '17:00 – 18:00' },
  { dia: 'Martes', hora: '17:00' },
  { dia: 'Miércoles', hora: '11:00 – 12:00' },
  { dia: 'Jueves', hora: '11:00 – 12:00' },
  { dia: 'Viernes', hora: '18:00 – 19:00' },
]

export const TESTIMONIOS = [
  {
    id: '1',
    nombre_paciente: 'Paciente',
    texto: 'Estoy muy satisfecha con el trabajo que ha realizado Ana conmigo. Fui con mucha rigidez, dolor lumbar y cervical y únicamente con dos sesiones mi dolencia ha mejorado muchísimo. Quiero destacar el excelente trato a nivel personal y profesional.',
    puntuacion: 5,
    fecha: 'Hace 4 meses',
  },
  {
    id: '2',
    nombre_paciente: 'Paciente',
    texto: 'Acudí por un dolor en el codo y antebrazo izquierdo que me limitaba bastante. Desde el primer día el trato ha sido excelente, cercano, profesional y muy humano. Ana supo identificar el problema para poder aplicarme el tratamiento más adecuado para mi dolencia. He mejorado muchísimo y el dolor ha disminuido bastante. Totalmente recomendable.',
    puntuacion: 5,
    fecha: 'Hace 6 meses',
  },
  {
    id: '3',
    nombre_paciente: 'Paciente',
    texto: 'Acudí por dolor en el cuello y espalda desde hace meses y con la tercera sesión, que me pusieron punción seca, prácticamente ha desaparecido el dolor constante. El trato de Ana es muy profesional y cercano.',
    puntuacion: 5,
    fecha: 'Hace 2 semanas',
  },
]
