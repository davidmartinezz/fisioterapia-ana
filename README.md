# Tu web de fisioterapia — Guía para Ana

Esta es la guía completa de tu web. Aquí encontrarás todo lo que necesitas para gestionar tu web, cambiar textos y fotos, y gestionar tus citas.

---

## 1. Cómo entrar al panel de administración

Ve a tu web y añade `/admin/login` al final de la dirección.

**Ejemplo:** `https://fisioterapiaana.es/admin/login`

- **Email:** el que configures en Vercel (variable `ADMIN_EMAIL`)
- **Contraseña:** la que configures en Vercel (variable `ADMIN_PASSWORD`)

Una vez dentro verás el panel principal con un resumen de tus citas.

---

## 2. Cambiar textos y contenidos de la web

Desde el panel, haz clic en **"Textos de la web"** en el menú de la izquierda.

Encontrarás todas las secciones:
- **Portada:** título, eslogan y foto principal
- **Sobre mí:** tu biografía completa
- **Bloque "Mi proyecto de clínica":** el texto emocional sobre tu futuro
- **Ubicación:** dirección, enlace al mapa, instrucciones de acceso
- **SEO:** título y descripción que ve Google
- **Textos legales:** aviso legal y política de privacidad

Cada campo tiene un botón **"Guardar"**. Los cambios se reflejan en la web inmediatamente.

---

## 3. Cambiar y subir fotos

Haz clic en **"Fotos"** en el menú lateral. Verás 4 secciones:
- **Foto de portada:** la que aparece junto a tu nombre en la página principal
- **Fotos de "Sobre mí":** fotos tuyas para la página de presentación
- **Equipamiento:** fotos de tu camilla, aparatos, etc.
- **Galería general:** otras fotos

**Para subir una foto:**
1. Selecciona la sección donde quieres subirla
2. Arrastra la foto a la zona punteada, o haz clic y selecciónala
3. La foto se sube automáticamente

**Para borrar una foto:** pasa el cursor por encima y haz clic en el icono de papelera.

> **Nota sobre la foto de portada:** una vez subida la foto en la sección "Fotos de portada", copia la URL que aparece y pégala en *Textos de la web → Portada → Foto de portada*.

---

## 4. Gestionar servicios y precios

Haz clic en **"Servicios y precios"**.

- **Para añadir un servicio:** botón "Nuevo servicio" (arriba a la derecha)
- **Para editar:** botón "Editar" en el servicio que quieras cambiar
- **Para eliminar:** icono de papelera
- **Para ordenar:** cambia el número de "Posición" (menor número = aparece primero)

Cada servicio tiene: nombre, descripción, duración en minutos, precio y si está activo o no.

---

## 5. Gestionar tus citas

Haz clic en **"Citas"** en el menú.

Verás un calendario mensual. Los días con citas tienen un punto:
- 🟡 **Amarillo:** cita pendiente de confirmar
- 🟢 **Verde:** cita confirmada

**Haz clic en un día** para ver las citas de ese día.

**Acciones disponibles en cada cita:**
- **Confirmar:** envía un email de confirmación al paciente automáticamente
- **Cancelar:** envía un email de cancelación al paciente
- **Añadir nota:** notas internas que solo tú verás
- **Eliminar:** borra la cita permanentemente (solo si es necesario)

---

## 6. Configurar tus horarios

Haz clic en **"Horarios"** en el menú.

Aquí defines qué días de la semana trabajas y en qué horario. Por ejemplo:
- Lunes: 9:00 a 18:00, citas de 60 minutos
- Viernes: 9:00 a 14:00, citas de 60 minutos

El sistema calculará automáticamente los huecos disponibles para que los pacientes puedan reservar. Si ya hay una cita en un hueco, ese hueco desaparece automáticamente.

**Para bloquear días libres o vacaciones:**
Ve a **"Citas"** y haz clic en el botón "Bloquear días" (arriba a la derecha). Pon las fechas de inicio y fin del bloqueo.

---

## 7. Cambiar los datos de contacto

Haz clic en **"Datos de contacto"** en el menú.

Aquí puedes cambiar:
- Número de WhatsApp (el del botón flotante y pie de página)
- Email de contacto
- Instagram y Facebook
- Horario de atención visible en el pie de página

---

## 8. Desplegar/actualizar la web

La web está en Vercel y se actualiza automáticamente cuando haces cambios en el código. Si no tocas el código, la web se actualiza sola con los cambios que hagas desde el panel de administración.

**Si necesitas hacer cambios en el código** (solo si eres desarrolladora o tienes ayuda técnica):
1. Haz los cambios en el código
2. En la terminal: `git add . && git commit -m "descripción" && git push`
3. Vercel desplegará automáticamente en 1-2 minutos

---

## 9. Configuración inicial (solo la primera vez)

Si acabas de desplegar la web por primera vez, necesitas:

### Crear el proyecto en Supabase
1. Ve a [supabase.com](https://supabase.com) y crea una cuenta gratuita
2. Crea un nuevo proyecto
3. Ve a **SQL Editor** y ejecuta el contenido del archivo `supabase/migrations/001_initial.sql`
4. Ve a **Storage** → **New bucket** → nombre: `fisioterapia-media` → activa "Public bucket"

### Configurar las variables de entorno en Vercel
En tu proyecto de Vercel, ve a **Settings → Environment Variables** y añade:
- `NEXT_PUBLIC_SUPABASE_URL` — URL de tu proyecto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Anon key de Supabase
- `SUPABASE_SERVICE_ROLE_KEY` — Service role key de Supabase
- `ADMIN_EMAIL` — tu email para entrar al panel
- `ADMIN_PASSWORD` — contraseña del panel (pon una segura)
- `ADMIN_SESSION_SECRET` — string aleatorio de 32+ caracteres
- `RESEND_API_KEY` — tu API key de Resend (gratis en resend.com)
- `EMAIL_FROM` — email desde el que se envían las confirmaciones
- `EMAIL_ANA` — tu email donde recibes las notificaciones de citas

### Crear cuenta en Resend (para los emails)
1. Ve a [resend.com](https://resend.com) y crea una cuenta gratuita
2. Copia tu API key y ponla en la variable `RESEND_API_KEY`
3. Para empezar puedes usar `onboarding@resend.dev` como `EMAIL_FROM` (solo funciona enviando a tu propio email)
4. Para enviar desde tu dominio propio, verifica el dominio en Resend siguiendo sus instrucciones

---

## Preguntas frecuentes

**¿Puedo cambiar el número de WhatsApp desde el panel?**
Sí, en "Datos de contacto".

**¿Cómo cambio el enlace de Google Maps?**
En "Textos de la web" → Ubicación → "URL del mapa embebido" y "Enlace Cómo llegar".

**¿Los pacientes reciben email al reservar?**
Sí, automáticamente. También tú recibes una notificación. Solo hay que tener configurado Resend.

**¿Qué pasa si la web se cae?**
Contacta con el desarrollador. La web está en Vercel (muy estable), la base de datos en Supabase (plan gratuito tiene 500MB y es muy fiable).

**¿Puedo cambiar los colores de la web?**
Sí, pero requiere editar el código. Habla con el desarrollador.

---

Cualquier duda, contacta con el desarrollador que ha creado esta web.
