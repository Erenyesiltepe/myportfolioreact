import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        'move-right': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'move-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        'move-up': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' }
        },
        'move-down': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' }
        },
        'move-right-fixed': {
          '0%': { transform: 'translate(-50%, -50%)' },
          '100%': { transform: 'translate(calc(50vw - 3rem), -50%)' }
        },
        'move-left-fixed': {
          '0%': { transform: 'translate(50%, -50%)' },
          '100%': { transform: 'translate(calc(-50vw + 3rem), -50%)' }
        },
        'move-up-fixed': {
          '0%': { transform: 'translate(-50%, 50%)' },
          '100%': { transform: 'translate(-50%, calc(-50vh + 2.5rem))' }
        },
        'move-down-fixed': {
          '0%': { transform: 'translate(-50%, -50%)' },
          '100%': { transform: 'translate(-50%, calc(50vh - 2.5rem))' }
        }
      },
      animation: {
        'move-right': 'move-right 3s linear infinite',
        'move-left': 'move-left 3s linear infinite',
        'move-up': 'move-up 3s linear infinite',
        'move-down': 'move-down 3s linear infinite',
        'move-right-fixed': 'move-right-fixed 3s linear infinite',
        'move-left-fixed': 'move-left-fixed 3s linear infinite',
        'move-up-fixed': 'move-up-fixed 3s linear infinite',
        'move-down-fixed': 'move-down-fixed 3s linear infinite'
      }
    },
  },
  plugins: [
    typography,
  ],
  variants: {
    scrollbar: ['rounded']
  },
  layer: {
    utilities: {
      '.scrollbar': {
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#1f2937', // gray-800
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#0891b2', // cyan-600
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#06b6d4', // cyan-500
        },
        'scrollbar-width': 'thin',
        'scrollbar-color': '#0891b2 #1f2937',
      },
    },
  },
} satisfies Config;
