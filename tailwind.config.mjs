/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50:  '#fdf9f8',
          100: '#f8efee',
          200: '#f2e0de',
          300: '#e8cbc8',
        },
        gold: {
          300: '#d4a84b',
          400: '#c49235',
          500: '#b87e27',
          600: '#9a681e',
          700: '#7d5318',
        },
        charcoal: {
          800: '#2c2420',
          900: '#1a1410',
        }
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        accent: ['Cormorant Infant', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #d4a84b 0%, #b87e27 50%, #7d5318 100%)',
        'cream-gradient': 'linear-gradient(180deg, #f8efee 0%, #f2e0de 50%, #e8cbc8 100%)',
        'hero-gradient': 'linear-gradient(160deg, #f8efee 0%, #f4e6e3 40%, #ecddd8 70%, #e0cec8 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};
