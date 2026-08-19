/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
      extend: {
          colors: {
              primary: {
                  light: '#1B365D', // Dark Blue for light mode button
                  dark: '#00B4D8',  // Light Blue for dark mode button
                  DEFAULT: '#1B365D'
              },
              vlearnRed: '#D32F2F',
              surface: {
                  light: '#FFFFFF',
                  dark: '#1E293B' // Slate 800
              },
              background: {
                  light: '#F8FAFC',
                  dark: '#0F172A' // Slate 900
              },
              textMain: {
                  light: '#1E293B',
                  dark: '#F8FAFC'
              },
              textMuted: {
                  light: '#64748B',
                  dark: '#94A3B8'
              },
              inputBg: {
                  light: '#F1F5F9', // Slate 100
                  dark: '#334155'   // Slate 700
              },
              inputBorder: {
                  light: '#CBD5E1', // Slate 300
                  dark: '#475569'   // Slate 600
              }
          },
          fontFamily: {
              sans: ['Inter', 'sans-serif'],
          }
      }
  },
  plugins: [],
}
