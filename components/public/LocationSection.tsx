import { MapPin, Navigation } from 'lucide-react'

interface LocationSectionProps {
  direccion: string
  mapsEmbedUrl: string
  mapsLink: string
  notas: string
}

export default function LocationSection({
  direccion,
  mapsEmbedUrl,
  mapsLink,
  notas,
}: LocationSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">¿Dónde estoy?</h2>
          <p className="text-slate-500">Paso consulta en domicilio propio, en Leganés Norte</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Map */}
          <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm aspect-video md:aspect-auto md:h-80">
            {mapsEmbedUrl ? (
              <iframe
                src={mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de la consulta"
              />
            ) : (
              <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
                Configura la URL del mapa desde el panel de administración
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            {direccion && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">Dirección</p>
                  <p className="text-slate-600 text-sm">{direccion}</p>
                </div>
              </div>
            )}

            {notas && (
              <div className="bg-teal-50 rounded-xl p-4">
                <p className="font-semibold text-teal-800 mb-2 text-sm">Cómo llegar</p>
                <div
                  className="text-teal-700 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: notas }}
                />
              </div>
            )}

            {mapsLink && (
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 text-white font-semibold hover:bg-teal-700 transition-colors"
              >
                <Navigation className="w-5 h-5" />
                Abrir en Google Maps
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
