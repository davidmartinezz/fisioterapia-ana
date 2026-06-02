// ============================================================
// Tipos compartidos — Fisioterapia Ana María González
// ============================================================

export interface ContenidoSitio {
  id: string
  clave: string
  valor: string
  tipo: 'texto' | 'html' | 'json' | 'url'
  etiqueta: string | null
  ayuda: string | null
  updated_at: string
}

export type ContenidoMap = Record<string, string>

export interface Servicio {
  id: string
  nombre: string
  descripcion: string
  duracion_min: number | null
  precio: number | null
  foto_url: string
  orden: number
  activo: boolean
  created_at: string
}

export interface Formacion {
  id: string
  titulo: string
  institucion: string
  anio: number | null
  orden: number
}

export interface Testimonio {
  id: string
  nombre_paciente: string
  texto: string
  puntuacion: number
  activo: boolean
  created_at: string
}

export interface GaleriaFoto {
  id: string
  url: string
  alt_texto: string
  seccion: 'hero' | 'sobre_mi' | 'equipamiento' | 'general'
  orden: number
}

export interface DisponibilidadSemanal {
  id: string
  dia_semana: number // 1=Lunes … 7=Domingo
  hora_inicio: string // 'HH:MM'
  hora_fin: string
  duracion_hueco_min: number
  activo: boolean
}

export interface Bloqueo {
  id: string
  inicio: string // ISO timestamptz
  fin: string
  motivo: string
}

export type EstadoCita = 'pendiente' | 'confirmada' | 'cancelada'

export interface Cita {
  id: string
  servicio_id: string | null
  fecha: string // 'YYYY-MM-DD'
  hora_inicio: string // 'HH:MM'
  nombre_paciente: string
  telefono: string
  email: string
  motivo: string
  estado: EstadoCita
  notas_admin: string
  created_at: string
  servicios?: { nombre: string } | null
}

export interface ContactoItem {
  id: string
  clave: string
  valor: string
  etiqueta: string | null
}

export type ContactoMap = Record<string, string>

export interface HuecoDisponible {
  hora: string // 'HH:MM'
  disponible: boolean
}

// Elemento de la lista "Por qué elegirme"
export interface PorQueItem {
  icono: string
  titulo: string
  descripcion: string
}
