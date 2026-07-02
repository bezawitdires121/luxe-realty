import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        void:       '#050508',
        ink:        '#0A0A0F',
        ivory:      '#F2EDE4',
        travertine: '#C9B99A',
        signal:     '#4A7FA5',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body:    ['DM Sans', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      transitionTimingFunction: {
        'out-expo':   'cubic-bezier(0.16, 1, 0.3, 1)',
        'cinematic':  'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      transitionDuration: {
        '900':  '900ms',
        '1800': '1800ms',
      },
    },
  },
  plugins: [],
}

export default config