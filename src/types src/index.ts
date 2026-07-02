export type PropertyStatus = 'available' | 'reserved' | 'sold'
export type PropertyType = 'Penthouse' | 'Villa' | 'Sky Villa' | 'Residence' | 'Townhouse'

export interface Property {
  id: string
  slug: string
  name: string
  tagline: string
  type: PropertyType
  status: PropertyStatus
  tag?: string
  location: string
  city: string
  price: number
  currency: string
  priceLabel: string
  beds: number
  baths: number
  area: number
  floors?: number
  description: string
  features: string[]
  images: string[]
  videoSrc?: string
  modelSrc?: string
  coordinates?: { lat: number; lng: number }
  accentColor: string
}

export interface FloorUnit {
  id: string
  floor: number
  type: string
  beds: number
  baths: number
  area: number
  balconies: number
  status: PropertyStatus
  price: number
}

export interface Room {
  id: string
  name: string
  type: string
  description: string
  materials: string[]
  area: string
  ceiling: string
  image: string
  accentColor: string
}
export interface AmenityItem {
  id: string
  category: string
  name: string
  tagline: string
  description: string
  features: string[]
  level: string
  image: string
  accentColor: string
  icon: string
}