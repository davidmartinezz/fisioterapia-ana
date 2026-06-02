import { DisponibilidadSemanal, Bloqueo, Cita } from '@/types'

function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60).toString().padStart(2, '0')
  const m = (minutes % 60).toString().padStart(2, '0')
  return `${h}:${m}`
}

export function calcularHuecosLibres(
  fecha: string, // 'YYYY-MM-DD'
  disponibilidad: DisponibilidadSemanal[],
  citasDelDia: Cita[],
  bloqueos: Bloqueo[]
): string[] {
  // ISO weekday: getDay() returns 0=Sunday..6=Saturday → convert to 1=Mon..7=Sun
  const d = new Date(fecha + 'T12:00:00Z')
  const diaSemana = d.getDay() === 0 ? 7 : d.getDay()

  const regla = disponibilidad.find(
    (r) => r.dia_semana === diaSemana && r.activo
  )
  if (!regla) return []

  const inicio = timeToMinutes(regla.hora_inicio)
  const fin = timeToMinutes(regla.hora_fin)
  const paso = regla.duracion_hueco_min

  // Generar todos los huecos del día
  const huecos: string[] = []
  for (let t = inicio; t + paso <= fin; t += paso) {
    huecos.push(minutesToTime(t))
  }

  // Horas ya ocupadas por citas (estado ≠ cancelada)
  const horasOcupadas = new Set(
    citasDelDia
      .filter((c) => c.estado !== 'cancelada')
      .map((c) => c.hora_inicio.slice(0, 5))
  )

  // Bloqueos que afectan a este día
  const fechaInicio = new Date(fecha + 'T00:00:00')
  const fechaFin = new Date(fecha + 'T23:59:59')

  const bloqueosDia = bloqueos.filter((b) => {
    const bi = new Date(b.inicio)
    const bf = new Date(b.fin)
    return bi <= fechaFin && bf >= fechaInicio
  })

  return huecos.filter((hora) => {
    if (horasOcupadas.has(hora)) return false
    const horaMin = timeToMinutes(hora)
    const horaEnd = horaMin + paso
    const horaFechaInicio = new Date(`${fecha}T${minutesToTime(horaMin)}:00`)
    const horaFechaFin = new Date(`${fecha}T${minutesToTime(horaEnd)}:00`)
    for (const b of bloqueosDia) {
      if (new Date(b.inicio) < horaFechaFin && new Date(b.fin) > horaFechaInicio) {
        return false
      }
    }
    return true
  })
}

// No mostrar fechas pasadas
export function esFechaValida(fecha: string): boolean {
  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0)
  return new Date(fecha) >= hoy
}
