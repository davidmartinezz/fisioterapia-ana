import { Resend } from 'resend'
import { Cita, Servicio } from '@/types'

function getResend() {
  if (!process.env.RESEND_API_KEY) throw new Error('RESEND_API_KEY not set')
  return new Resend(process.env.RESEND_API_KEY)
}

// Keep backward compatibility
const resend = { emails: { send: (...args: Parameters<Resend['emails']['send']>) => getResend().emails.send(...args) } }

function formatFecha(fecha: string): string {
  const d = new Date(fecha + 'T12:00:00')
  return d.toLocaleDateString('es-ES', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })
}

export async function sendConfirmationToPatient(
  cita: Cita,
  servicio: Servicio | null
): Promise<void> {
  if (!cita.email) return

  const nombreServicio = servicio?.nombre ?? 'Sesión de fisioterapia'
  const fecha = formatFecha(cita.fecha)

  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: cita.email,
    subject: `Tu cita con Ana María González — ${fecha} a las ${cita.hora_inicio}`,
    html: `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#1e293b">
  <div style="background:#0d9488;padding:24px;border-radius:8px 8px 0 0;text-align:center">
    <h1 style="color:white;margin:0;font-size:22px">Ana María González</h1>
    <p style="color:#ccfbf1;margin:4px 0 0">Fisioterapeuta · Leganés Norte, Madrid</p>
  </div>
  <div style="background:#f8fafc;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e2e8f0;border-top:none">
    <h2 style="color:#0d9488;margin-top:0">¡Solicitud de cita recibida!</h2>
    <p>Hola <strong>${cita.nombre_paciente}</strong>,</p>
    <p>Hemos recibido tu solicitud de cita. Ana la revisará y te confirmará en breve.</p>

    <div style="background:white;border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin:20px 0">
      <h3 style="margin:0 0 12px;color:#1e293b;font-size:16px">Detalles de tu cita</h3>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:6px 0;color:#64748b;width:40%">Servicio</td><td style="padding:6px 0;font-weight:bold">${nombreServicio}</td></tr>
        <tr><td style="padding:6px 0;color:#64748b">Fecha</td><td style="padding:6px 0;font-weight:bold;text-transform:capitalize">${fecha}</td></tr>
        <tr><td style="padding:6px 0;color:#64748b">Hora</td><td style="padding:6px 0;font-weight:bold">${cita.hora_inicio}</td></tr>
        <tr><td style="padding:6px 0;color:#64748b">Estado</td><td style="padding:6px 0"><span style="background:#fef3c7;color:#92400e;padding:2px 8px;border-radius:12px;font-size:13px">Pendiente de confirmación</span></td></tr>
      </table>
    </div>

    <p>Recibirás otro email cuando Ana confirme tu cita. Si tienes alguna duda, puedes contactar por WhatsApp.</p>
    <p style="color:#64748b;font-size:13px;border-top:1px solid #e2e8f0;padding-top:16px;margin-top:24px">
      Ana María González · Fisioterapeuta · Leganés Norte, Madrid
    </p>
  </div>
</body>
</html>`,
  })
}

export async function sendNotificationToAna(
  cita: Cita,
  servicio: Servicio | null
): Promise<void> {
  const emailAna = process.env.EMAIL_ANA
  if (!emailAna) return

  const nombreServicio = servicio?.nombre ?? 'No especificado'
  const fecha = formatFecha(cita.fecha)

  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: emailAna,
    subject: `Nueva solicitud de cita — ${cita.nombre_paciente} · ${cita.fecha} ${cita.hora_inicio}`,
    html: `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#1e293b">
  <h2 style="color:#0d9488">Nueva solicitud de cita</h2>
  <table style="width:100%;border-collapse:collapse;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px">
    <tr><td style="padding:8px;color:#64748b;width:35%">Paciente</td><td style="padding:8px;font-weight:bold">${cita.nombre_paciente}</td></tr>
    <tr style="background:white"><td style="padding:8px;color:#64748b">Teléfono</td><td style="padding:8px">${cita.telefono || '—'}</td></tr>
    <tr><td style="padding:8px;color:#64748b">Email</td><td style="padding:8px">${cita.email || '—'}</td></tr>
    <tr style="background:white"><td style="padding:8px;color:#64748b">Servicio</td><td style="padding:8px">${nombreServicio}</td></tr>
    <tr><td style="padding:8px;color:#64748b">Fecha</td><td style="padding:8px;text-transform:capitalize">${fecha}</td></tr>
    <tr style="background:white"><td style="padding:8px;color:#64748b">Hora</td><td style="padding:8px;font-weight:bold">${cita.hora_inicio}</td></tr>
    ${cita.motivo ? `<tr><td style="padding:8px;color:#64748b">Motivo</td><td style="padding:8px">${cita.motivo}</td></tr>` : ''}
  </table>
  <p style="margin-top:24px">
    <a href="${process.env.NEXT_PUBLIC_SUPABASE_URL ? process.env.VERCEL_URL || 'http://localhost:3000' : 'http://localhost:3000'}/admin/citas"
       style="background:#0d9488;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold">
      Ver en el panel de administración →
    </a>
  </p>
</body>
</html>`,
  })
}

export async function sendConfirmationStatusToPatient(
  cita: Cita,
  servicio: Servicio | null
): Promise<void> {
  if (!cita.email) return

  const isConfirmada = cita.estado === 'confirmada'
  const nombreServicio = servicio?.nombre ?? 'Sesión de fisioterapia'
  const fecha = formatFecha(cita.fecha)
  const colorEstado = isConfirmada ? '#16a34a' : '#dc2626'
  const textoEstado = isConfirmada ? 'Confirmada ✓' : 'Cancelada'
  const bgEstado = isConfirmada ? '#dcfce7' : '#fee2e2'
  const textColorEstado = isConfirmada ? '#166534' : '#991b1b'

  await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: cita.email,
    subject: `Tu cita ha sido ${isConfirmada ? 'confirmada' : 'cancelada'} — ${cita.fecha} ${cita.hora_inicio}`,
    html: `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#1e293b">
  <div style="background:${colorEstado};padding:24px;border-radius:8px 8px 0 0;text-align:center">
    <h1 style="color:white;margin:0;font-size:22px">Ana María González</h1>
    <p style="color:rgba(255,255,255,0.85);margin:4px 0 0">Fisioterapeuta · Leganés Norte, Madrid</p>
  </div>
  <div style="background:#f8fafc;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e2e8f0;border-top:none">
    <h2 style="color:${colorEstado};margin-top:0">Tu cita ha sido ${isConfirmada ? 'confirmada' : 'cancelada'}</h2>
    <p>Hola <strong>${cita.nombre_paciente}</strong>,</p>
    <div style="background:white;border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin:20px 0">
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:6px 0;color:#64748b;width:40%">Servicio</td><td style="padding:6px 0;font-weight:bold">${nombreServicio}</td></tr>
        <tr><td style="padding:6px 0;color:#64748b">Fecha</td><td style="padding:6px 0;font-weight:bold;text-transform:capitalize">${fecha}</td></tr>
        <tr><td style="padding:6px 0;color:#64748b">Hora</td><td style="padding:6px 0;font-weight:bold">${cita.hora_inicio}</td></tr>
        <tr><td style="padding:6px 0;color:#64748b">Estado</td><td style="padding:6px 0"><span style="background:${bgEstado};color:${textColorEstado};padding:2px 8px;border-radius:12px;font-size:13px">${textoEstado}</span></td></tr>
      </table>
    </div>
    ${isConfirmada
      ? '<p>¡Nos vemos pronto! Si necesitas cancelar o cambiar la cita, contáctame por WhatsApp con la mayor antelación posible.</p>'
      : '<p>Lamentamos cancelar tu cita. Si quieres reprogramarla, puedes reservar un nuevo hueco en la web o contactarme por WhatsApp.</p>'
    }
  </div>
</body>
</html>`,
  })
}
