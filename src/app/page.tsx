'use client'

import { useLenis } from '@/hooks src/useLenis'
import { useAppStore } from '@/store/useAppStore'
import Loader from '@/components/ui/Loader'
import CustomCursor from '@/components/ui/CustomCursor'
import Navbar from '@/components/navigation/Navbar'
import Hero from '@/components/hero/Hero'
import Properties from '@/components/sections/Properties'
import TowerDashboard from '@/components/sections/TowerDashboard'
import Amenities from '@/components/sections/Amenities'
import Interiors from '@/components/sections/BuildingExplorer'
import Penthouses from '@/components/sections/Penthouses'
import PrivateViewing from '@/components/sections/PrivateViewing'
import Stats from '@/components/sections/Stats'
import Vision from '@/components/sections/Vision'
import MapSection from '@/components/sections/MapSection'
import Testimonials from '@/components/sections/Testimonials'
import AboutContact from '@/components/sections/AboutContact'
import Footer from '@/components/layout/Footer'
import PropertyPreview from '@/components/property/PropertyPreview'
import AIAssistant from '@/components/ui/AIAssistant'

export default function Home() {
  useLenis()
  const siteLoaded = useAppStore((s) => s.siteLoaded)

  return (
    <>
      <CustomCursor />
      <Loader />
      {siteLoaded && (
        <>
          <Navbar />
          <AIAssistant />
          <PropertyPreview />
          <main style={{ background: '#050508', overflowX: 'hidden' }}>
            <Hero />
            <Properties />
            <TowerDashboard />
            <Amenities />
            <Penthouses />
            <Interiors />
            <Stats />
            <Vision />
            <MapSection />
            <Testimonials />
            <PrivateViewing />
            <AboutContact />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}