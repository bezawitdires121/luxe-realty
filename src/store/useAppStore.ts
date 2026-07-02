import { create } from 'zustand'
import type { Property } from '@/types src'

interface AppState {
  // Navigation
  navOpen: boolean
  setNavOpen: (open: boolean) => void

  // Property preview
  activeProperty: Property | null
  previewOpen: boolean
  openPreview: (property: Property) => void
  closePreview: () => void

  // Cursor
  cursorVariant: 'default' | 'hover' | 'drag' | 'view'
  setCursorVariant: (variant: AppState['cursorVariant']) => void
  cursorLabel: string
  setCursorLabel: (label: string) => void

  // Audio
  audioEnabled: boolean
  toggleAudio: () => void

  // Loading
  siteLoaded: boolean
  setSiteLoaded: (loaded: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  navOpen: false,
  setNavOpen: (open) => set({ navOpen: open }),

  activeProperty: null,
  previewOpen: false,
  openPreview: (property) => set({ activeProperty: property, previewOpen: true }),
  closePreview: () => set({ previewOpen: false }),

  cursorVariant: 'default',
  setCursorVariant: (variant) => set({ cursorVariant: variant }),
  cursorLabel: '',
  setCursorLabel: (label) => set({ cursorLabel: label }),

  audioEnabled: false,
  toggleAudio: () => set((s) => ({ audioEnabled: !s.audioEnabled })),

  siteLoaded: false,
  setSiteLoaded: (loaded) => set({ siteLoaded: loaded }),
}))