'use client'
import { ROOMS } from '@/lib src/data' 
import { motion } from 'framer-motion'

export default function Interiors() {
  return (
    <section
      id="interiors"
      className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src="/images/interior.jpg"
          alt="Luxury Interior"
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6"
      >
        <p className="uppercase tracking-[0.4em] text-sm text-neutral-300 mb-4">
          Interiors
        </p>

        <h2 className="text-5xl md:text-7xl font-light mb-6">
          Crafted For Modern Luxury
        </h2>

        <p className="max-w-2xl mx-auto text-neutral-300 text-lg leading-relaxed">
          Every residence blends timeless architecture with immersive modern
          living — panoramic skyline views, premium finishes, and refined
          spatial design.
        </p>
      </motion.div>
    </section>
  )
}