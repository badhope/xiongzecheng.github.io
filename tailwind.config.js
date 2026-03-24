/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#020510',
        foreground: '#e8e8f0',
        gold: {
          DEFAULT: '#d4af37',
          light: '#ffd700',
          dark: '#b8960c',
          glow: 'rgba(212, 175, 55, 0.3)',
        },
        cosmic: {
          blue: '#1a73e8',
          purple: '#7c3aed',
          cyan: '#06b6d4',
          pink: '#ec4899',
          teal: '#14b8a6',
        },
        space: {
          deep: '#020510',
          primary: '#050a1a',
          secondary: '#0a1128',
          tertiary: '#0f1a3a',
        },
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        terminal: ['Share Tech Mono', 'monospace'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
};
