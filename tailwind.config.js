/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        ink: '#0a0a0a',
        paper: '#f5f5f5',
        accent: '#6C63FF',
        'accent-light': '#EEEdFF',
        muted: '#888888',
        border: '#E0E0E0',
      },
      keyframes: {
        pulse_ring: {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        fade_in: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        pulse_ring: 'pulse_ring 1s ease-out infinite',
        fade_in: 'fade_in 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
}
