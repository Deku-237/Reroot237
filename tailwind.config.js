/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'african-brown': '#D2B48C',
        'african-orange': '#FF8C00',
        'earth-red': '#CD853F',
        'savanna-gold': '#DAA520',
        'forest-green': '#228B22',
        'kente-purple': '#8B4513',
        'ndop-blue': '#4682B4',
        'duo-green': {
          '400': '#58CC02',
          '500': '#58CC02',
          '600': '#4CAF00',
        },
        'duo-blue': {
          '50': '#E3F2FD',
          '100': '#BBDEFB',
          '500': '#1CB0F6',
        },
      },
      animation: {
        'fadeIn': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      fontFamily: {
        'african': ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'kente-pattern': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23FF8C00\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
      }
    },
  },
  plugins: [],
};
