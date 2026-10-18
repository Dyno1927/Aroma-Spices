export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  safelist: ['text-yellow-400', 'text-gray-300'],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#E7F0F5',
          100: '#A8C5D6',
          200: '#5F8FB3',
          300: '#3D6B8A',
          400: '#2D5070',
          500: '#1E3A5F',
          600: '#1B3952',
          700: '#13263A',
          800: '#0B1420',
          900: '#070D14',
        },
        sand: {
          50: '#F7F6F2',
          100: '#F5F1EA',
          200: '#E8E0D0',
          300: '#D8C3A5',
          400: '#AEBBC7',
          500: '#5C7285',
          600: '#4A5E6F',
        },
      },
      backgroundImage: {
        'ocean-gradient': 'linear-gradient(135deg, #1E3A5F 0%, #3D6B8A 100%)',
      },
      keyframes: {
        shimmer: {
          '0%': {
            backgroundPosition: '-200% 0',
          },
          '100%': {
            backgroundPosition: '200% 0',
          },
        },
      },
      animation: {
        shimmer: 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
};
