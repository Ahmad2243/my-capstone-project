import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#14b8a6',
          600: '#0d9488',
          700: '#134e4a',
        },
        accent: '#f97316',
      },
    },
  },
  plugins: [],
}

export default config
