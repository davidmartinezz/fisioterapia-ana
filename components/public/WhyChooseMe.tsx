import { Award, Star, Heart, GraduationCap, Shield, Zap, Clock, Users } from 'lucide-react'
import { PorQueItem } from '@/types'

const ICON_MAP: Record<string, React.ElementType> = {
  Award, Star, Heart, GraduationCap, Shield, Zap, Clock, Users,
}

interface WhyChooseMeProps {
  items: PorQueItem[]
}

export default function WhyChooseMe({ items }: WhyChooseMeProps) {
  if (!items?.length) return null

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">¿Por qué elegirme?</h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Atención completamente personalizada con el mejor equipamiento, en la comodidad de tu casa.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => {
            const Icon = ICON_MAP[item.icono] ?? Award
            return (
              <div
                key={i}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-teal-50 hover:bg-teal-100 transition-colors"
              >
                <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">{item.titulo}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.descripcion}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
