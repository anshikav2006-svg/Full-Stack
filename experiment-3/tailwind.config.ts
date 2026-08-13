import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        babypink: '#FFD6E8',
        blush: '#FFC1D8',
        lavender: '#E5D4FF',
        pastelPurple: '#D9C4FF',
        cream: '#FFF8F0',
        roseGold: '#B76E79',
        roseGoldLight: '#E8B4B8',
      },
      fontFamily: {
        display: ['"Poppins"', 'sans-serif'],
        body: ['"Quicksand"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 30px rgba(183, 110, 121, 0.15)',
        glow: '0 0 40px rgba(217, 196, 255, 0.35)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '2rem',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.9)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
        heartFloat: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0.8' },
          '100%': { transform: 'translateY(-120px) scale(0.6)', opacity: '0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        float2: 'float 8s ease-in-out infinite',
        sparkle: 'sparkle 2s ease-in-out infinite',
        heart: 'heartFloat 4s ease-in forwards',
      },
    },
  },
  plugins: [],
} satisfies Config;
