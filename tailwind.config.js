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
        // 深空蓝背景
        'space-bg': '#020c1b',
        'space-card': '#0a192f',
        'space-border': '#112240',
        // 科技青点缀
        'neon-cyan': '#64ffda',
        // 纯白文字
        'text-main': '#ccd6f6',
        'text-light': '#8892b0',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}
