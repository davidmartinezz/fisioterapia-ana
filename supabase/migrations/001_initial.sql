-- ============================================================
-- FISIOTERAPIA ANA MARÍA GONZÁLEZ — Esquema inicial
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- ============================================================

-- Extensiones necesarias
create extension if not exists "pgcrypto";

-- ============================================================
-- 1. CONTENIDO DEL SITIO (CMS de texto)
-- ============================================================
create table if not exists contenido_sitio (
  id         uuid primary key default gen_random_uuid(),
  clave      text unique not null,
  valor      text not null default '',
  tipo       text not null default 'texto', -- 'texto' | 'html' | 'json' | 'url'
  etiqueta   text,
  ayuda      text,
  updated_at timestamptz default now()
);

-- Trigger para actualizar updated_at automáticamente
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger contenido_sitio_updated_at
  before update on contenido_sitio
  for each row execute function update_updated_at();

-- Datos iniciales del CMS
insert into contenido_sitio (clave, tipo, etiqueta, ayuda, valor) values
  ('hero_titulo',           'texto', 'Título principal (portada)',    'Es lo primero que ven los visitantes al entrar en la web.',                           'Ana María González — Fisioterapeuta'),
  ('hero_eslogan',          'texto', 'Eslogan debajo del título',     'Una frase corta y directa que describe lo que ofreces.',                              'Fisioterapia profesional en tu propia casa, en Leganés Norte'),
  ('hero_foto_url',         'url',   'Foto principal (portada)',      'Foto tuya o de tu consulta que aparece en la portada. Sube la imagen en "Fotos".',    ''),
  ('sobre_mi_bio',          'html',  'Tu biografía (Sobre mí)',       'Tu historia: experiencia, formación, filosofía. Puedes usar texto largo.',            '<p>Soy fisioterapeuta colegiada con más de 10 años de experiencia en fisioterapia manual, deportiva y neurológica. Mi pasión por la salud y el bienestar de las personas me llevó a especializarme con un Máster en Fisioterapia Avanzada.</p><p>Ofrezco atención completamente personalizada en tu domicilio o en mi consulta privada en Leganés Norte, con equipamiento de última generación para garantizarte el mejor tratamiento posible.</p>'),
  ('sobre_mi_foto_url',     'url',   'Tu foto (Sobre mí)',            'Foto tuya que aparece en la sección "Sobre mí".',                                    ''),
  ('proyecto_clinica_titulo','texto','Título del bloque "Tu clínica"','Título del apartado donde explicas tu proyecto de clínica propia.',                  'Estás con la profesional desde el principio'),
  ('proyecto_clinica_texto','html',  'Texto del bloque "Tu clínica"', 'Aquí puedes explicar tu sueño de montar tu propia clínica y por qué es importante reservar ahora.', '<p>Esta consulta a domicilio es el primer paso hacia mi futura clínica de fisioterapia propia. Quien reserva hoy no solo recibe un trato cercano y personalizado, sino que <strong>apoya directamente el proyecto de una profesional que pone el alma en cada sesión</strong>.</p><p>Estarás con la mejor fisioterapeuta desde el inicio de su camino — y cuando abra su clínica, ya serás parte de la historia.</p>'),
  ('por_que_elegirme_items','json',  'Bloques "¿Por qué elegirme?"', 'Lista de razones para elegirte. Cada bloque tiene un icono, un título y una descripción corta.', '[{"icono":"Award","titulo":"Más de 10 años de experiencia","descripcion":"Formación continuada y especialización en fisioterapia manual, deportiva y neurológica."},{"icono":"Star","titulo":"Equipamiento de alta gama","descripcion":"Camilla profesional, aparatología de última generación y materiales clínicos de primer nivel."},{"icono":"Heart","titulo":"Atención 100% personalizada","descripcion":"Cada sesión es única. Sin prisas, solo tú y el tratamiento que necesitas."},{"icono":"GraduationCap","titulo":"Formación avanzada","descripcion":"Máster en Fisioterapia Avanzada y cursos de especialización nacionales e internacionales."}]'),
  ('seo_titulo',            'texto', 'Título SEO (pestaña del navegador)', 'Aparece en la pestaña del navegador y en Google. Incluye tu nombre y ubicación.',  'Ana María González — Fisioterapeuta en Leganés Norte | Madrid'),
  ('seo_descripcion',       'texto', 'Descripción SEO (Google)',      'Texto que aparece bajo el título en los resultados de Google (máx. 160 caracteres).', 'Fisioterapeuta a domicilio en Leganés Norte (Madrid). Tratamientos personalizados: fisioterapia manual, deportiva, punción seca y más. Reserva tu cita online.'),
  ('seo_palabras_clave',    'texto', 'Palabras clave SEO',            'Palabras separadas por comas que describen tu servicio.',                             'fisioterapeuta Leganés, fisio a domicilio Leganés Norte, fisioterapia Madrid sur, punción seca Leganés, masaje terapéutico Leganés'),
  ('ubicacion_direccion',   'texto', 'Dirección de la consulta',      'La dirección completa donde recibes a los pacientes.',                                'Leganés Norte, Leganés, Madrid'),
  ('ubicacion_maps_embed_url','url', 'URL del mapa embebido',         'Pega aquí la URL de Google Maps para mostrar el mapa en la web. Ve a maps.google.com, busca tu dirección, haz clic en "Compartir" → "Insertar mapa" y copia solo la URL del atributo src.', 'https://maps.google.com/maps?q=Leg%C3%A1n%C3%A9s+Norte%2C+Legan%C3%A9s%2C+Madrid&output=embed'),
  ('ubicacion_maps_link',   'url',   'Enlace "Cómo llegar"',          'Enlace que abre Google Maps con la ruta a tu consulta. Cópialo desde Google Maps con tu dirección.', 'https://www.google.com/maps/search/?api=1&query=Legan%C3%A9s+Norte%2C+Legan%C3%A9s%2C+Madrid'),
  ('ubicacion_notas',       'html',  'Notas de acceso',               'Indicaciones para llegar: número de timbre, planta, aparcamiento cercano, transporte público...', '<p><strong>Aparcamiento:</strong> Hay parking gratuito en la calle.</p><p><strong>Transporte:</strong> Autobús línea L1 parada Leganés Norte.</p><p>Cuando llegues, llama al timbre 3B.</p>'),
  ('aviso_legal_texto',     'html',  'Texto del Aviso Legal',         'Texto completo del aviso legal. Consúltalo con un asesor legal si lo necesitas.',   '<h2>Aviso Legal</h2><p><strong>Titular:</strong> Ana María González García<br/><strong>Actividad:</strong> Fisioterapia<br/><strong>Dirección:</strong> Leganés Norte, Leganés, Madrid<br/><strong>Email:</strong> info@fisioterapiaana.es</p><p>El acceso y uso de esta web atribuye la condición de usuario e implica la aceptación de este aviso legal. El titular se reserva el derecho de modificar este texto cuando lo estime conveniente.</p>'),
  ('privacidad_texto',      'html',  'Política de Privacidad',        'Texto completo de la política de privacidad. Importante: al recoger datos de salud (motivo de consulta), consúltalo con un asesor legal.',   '<h2>Política de Privacidad</h2><p>En cumplimiento del Reglamento (UE) 2016/679 (RGPD) y la LOPDGDD, te informamos:</p><p><strong>Responsable:</strong> Ana María González García<br/><strong>Finalidad:</strong> Gestionar las citas y comunicaciones con los pacientes.<br/><strong>Legitimación:</strong> Consentimiento del interesado y ejecución del contrato de servicios.<br/><strong>Destinatarios:</strong> No se ceden datos a terceros, salvo obligación legal.<br/><strong>Derechos:</strong> Puedes ejercer tus derechos de acceso, rectificación, supresión, portabilidad y oposición escribiendo a info@fisioterapiaana.es.</p>')
on conflict (clave) do nothing;

-- ============================================================
-- 2. SERVICIOS
-- ============================================================
create table if not exists servicios (
  id           uuid primary key default gen_random_uuid(),
  nombre       text not null,
  descripcion  text default '',
  duracion_min int,
  precio       numeric(8,2),
  foto_url     text default '',
  orden        int default 0,
  activo       boolean default true,
  created_at   timestamptz default now()
);

insert into servicios (nombre, descripcion, duracion_min, precio, orden) values
  ('Sesión de fisioterapia',   'Evaluación y tratamiento manual personalizado para tu dolencia. Incluye exploración, terapia manual y pautas de ejercicio.',         60, 55.00, 1),
  ('Punción seca',             'Técnica de punción intramuscular con aguja fina para tratar puntos gatillo y dolor muscular crónico.',                              45, 50.00, 2),
  ('Masaje terapéutico',       'Masaje orientado a la recuperación muscular y alivio del dolor, adaptado a tus necesidades específicas.',                           60, 50.00, 3),
  ('Recuperación deportiva',   'Tratamiento especializado para deportistas: recuperación post-esfuerzo, prevención de lesiones y optimización del rendimiento.',    60, 55.00, 4),
  ('Vendaje neuromuscular',    'Aplicación de kinesiotape para facilitar la recuperación de lesiones, reducir el dolor y mejorar la propiocepción.',               30, 30.00, 5),
  ('Primera consulta + valoración', 'Evaluación completa de tu estado físico, historial clínico y elaboración de un plan de tratamiento personalizado.',           60, 60.00, 6)
on conflict do nothing;

-- ============================================================
-- 3. FORMACIÓN
-- ============================================================
create table if not exists formacion (
  id          uuid primary key default gen_random_uuid(),
  titulo      text not null,
  institucion text default '',
  anio        int,
  orden       int default 0
);

insert into formacion (titulo, institucion, anio, orden) values
  ('Grado en Fisioterapia',                           'Universidad Rey Juan Carlos, Madrid',     2013, 1),
  ('Máster en Fisioterapia Avanzada y Terapia Manual','Universidad Europea de Madrid',            2015, 2),
  ('Especialización en Punción Seca',                 'Instituto de Fisioterapia Avanzada',       2016, 3),
  ('Curso de Fisioterapia Neurológica (Bobath)',       'Asociación Española de Fisioterapeutas',  2018, 4),
  ('Certificación en Kinesiotaping',                  'International Kinesiotaping Association',  2019, 5)
on conflict do nothing;

-- ============================================================
-- 4. TESTIMONIOS
-- ============================================================
create table if not exists testimonios (
  id              uuid primary key default gen_random_uuid(),
  nombre_paciente text not null,
  texto           text not null,
  puntuacion      int default 5 check (puntuacion between 1 and 5),
  activo          boolean default true,
  created_at      timestamptz default now()
);

insert into testimonios (nombre_paciente, texto, puntuacion) values
  ('María J.',    'Ana es increíble. Llevaba meses con contracturas cervicales que no se me iban con nada, y en tres sesiones el cambio fue notable. Muy profesional y cercana.', 5),
  ('Carlos R.',   'Me operé de la rodilla y Ana me ayudó con la rehabilitación. Es muy meticulosa y explica todo lo que hace. 100% recomendable.', 5),
  ('Lucía M.',    'Fui por dolor lumbar crónico. Combina muy bien la terapia manual con ejercicios en casa. El hecho de que venga a domicilio es un plus enorme.', 5),
  ('Sergio T.',   'Como runner, Ana me ha salvado varias veces. Entiende perfectamente las lesiones deportivas y te da pautas muy prácticas para seguir entrenando con seguridad.', 5)
on conflict do nothing;

-- ============================================================
-- 5. GALERÍA DE FOTOS
-- ============================================================
create table if not exists galeria_fotos (
  id         uuid primary key default gen_random_uuid(),
  url        text not null,
  alt_texto  text default '',
  seccion    text default 'general', -- 'hero' | 'sobre_mi' | 'equipamiento' | 'general'
  orden      int default 0
);

-- ============================================================
-- 6. DISPONIBILIDAD SEMANAL
-- ============================================================
create table if not exists disponibilidad_semanal (
  id                  uuid primary key default gen_random_uuid(),
  dia_semana          int not null check (dia_semana between 1 and 7), -- 1=Lunes..7=Domingo (ISO)
  hora_inicio         time not null,
  hora_fin            time not null,
  duracion_hueco_min  int not null default 60,
  activo              boolean default true
);

-- Disponibilidad inicial: Lunes a Viernes 9:00-18:00
insert into disponibilidad_semanal (dia_semana, hora_inicio, hora_fin, duracion_hueco_min) values
  (1, '09:00', '18:00', 60),
  (2, '09:00', '18:00', 60),
  (3, '09:00', '18:00', 60),
  (4, '09:00', '18:00', 60),
  (5, '09:00', '14:00', 60)
on conflict do nothing;

-- ============================================================
-- 7. BLOQUEOS MANUALES
-- ============================================================
create table if not exists bloqueos (
  id      uuid primary key default gen_random_uuid(),
  inicio  timestamptz not null,
  fin     timestamptz not null,
  motivo  text default ''
);

-- ============================================================
-- 8. CITAS
-- ============================================================
create table if not exists citas (
  id              uuid primary key default gen_random_uuid(),
  servicio_id     uuid references servicios(id) on delete set null,
  fecha           date not null,
  hora_inicio     time not null,
  nombre_paciente text not null,
  telefono        text default '',
  email           text default '',
  motivo          text default '',
  estado          text not null default 'pendiente'
                  check (estado in ('pendiente','confirmada','cancelada')),
  notas_admin     text default '',
  created_at      timestamptz default now()
);

create index if not exists citas_fecha_idx on citas (fecha, hora_inicio);
create index if not exists citas_estado_idx on citas (estado);

-- ============================================================
-- 9. CONTACTO
-- ============================================================
create table if not exists contacto (
  id       uuid primary key default gen_random_uuid(),
  clave    text unique not null,
  valor    text not null default '',
  etiqueta text
);

insert into contacto (clave, etiqueta, valor) values
  ('whatsapp',          'Número de WhatsApp (solo números, con prefijo internacional)', '34600000000'),
  ('email_contacto',    'Email de contacto (visible en la web)',                         'info@fisioterapiaana.es'),
  ('instagram',         'Usuario de Instagram (sin la @)',                               ''),
  ('facebook',          'Página de Facebook (URL completa)',                              ''),
  ('horario_texto',     'Horario de atención (texto libre)',                              'Lunes a Viernes: 9:00 - 18:00\nSábados: 9:00 - 14:00')
on conflict (clave) do nothing;

-- ============================================================
-- 10. ROW LEVEL SECURITY
-- ============================================================
-- La API usa SUPABASE_SERVICE_ROLE_KEY que bypasea RLS.
-- Habilitamos RLS como capa de seguridad adicional.
alter table contenido_sitio     enable row level security;
alter table servicios           enable row level security;
alter table formacion           enable row level security;
alter table testimonios         enable row level security;
alter table galeria_fotos       enable row level security;
alter table disponibilidad_semanal enable row level security;
alter table bloqueos            enable row level security;
alter table citas               enable row level security;
alter table contacto            enable row level security;

-- Política pública de lectura (anon puede leer lo que necesita la web)
create policy "Lectura pública contenido"    on contenido_sitio     for select using (true);
create policy "Lectura pública servicios"    on servicios           for select using (activo = true);
create policy "Lectura pública formacion"    on formacion           for select using (true);
create policy "Lectura pública testimonios"  on testimonios         for select using (activo = true);
create policy "Lectura pública fotos"        on galeria_fotos       for select using (true);
create policy "Lectura pública disponibilidad" on disponibilidad_semanal for select using (activo = true);
create policy "Lectura pública bloqueos"     on bloqueos            for select using (true);
create policy "Lectura pública contacto"     on contacto            for select using (true);

-- Solo el service role puede escribir (INSERT/UPDATE/DELETE lo hace la API con service_role_key)
-- No añadimos políticas de escritura para anon → solo service_role tiene acceso de escritura

-- Las citas: anon puede insertar (reserva pública), pero no leer ni modificar
create policy "Insertar cita pública" on citas for insert with check (true);

-- ============================================================
-- 11. STORAGE (ejecutar por separado si es necesario)
-- ============================================================
-- Crear bucket 'fisioterapia-media' como PÚBLICO desde el dashboard de Supabase:
-- Storage → New bucket → nombre: fisioterapia-media → Public: ON
