import Hero from '@/components/public/Hero'
import TechniquesSection from '@/components/public/TechniquesSection'
import MethodologySection from '@/components/public/MethodologySection'
import PricingSection from '@/components/public/PricingSection'
import ContactSection from '@/components/public/ContactSection'
import StaticTestimonials from '@/components/public/StaticTestimonials'
import AboutPreview from '@/components/public/AboutPreview'
import { SITE, TESTIMONIOS } from '@/lib/static-data'

export default function HomePage() {
  return (
    <>
      <Hero
        titulo={SITE.nombre}
        eslogan={SITE.eslogan}
        fotoUrl=""
        mapsUrl="#contacto"
      />
      <AboutPreview />
      <TechniquesSection />
      <MethodologySection />
      <PricingSection />
      <StaticTestimonials testimonios={TESTIMONIOS} />
      <ContactSection />
    </>
  )
}
