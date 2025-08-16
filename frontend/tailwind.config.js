/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // Primary brand colors - Professional blue tones
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Main primary
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Secondary colors - Trustworthy green tones
        secondary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e', // Main secondary
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        // Accent colors - Warm gold for highlights
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // Main accent
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Neutral colors - Professional grays
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        // Semantic colors
        success: {
          DEFAULT: '#10b981',
          hover: '#059669',
          light: '#d1fae5',
        },
        warning: {
          DEFAULT: '#f59e0b',
          hover: '#d97706',
          light: '#fef3c7',
        },
        danger: {
          DEFAULT: '#ef4444',
          hover: '#dc2626',
          light: '#fee2e2',
        },
        info: {
          DEFAULT: '#3b82f6',
          hover: '#2563eb',
          light: '#dbeafe',
        },
        // Background colors - Light theme
        background: {
          DEFAULT: '#fafafa',
          card: '#ffffff',
          sidebar: '#f8fafc',
          elevated: '#ffffff',
        },
        // Text colors - Light theme
        text: {
          DEFAULT: '#1f2937',
          muted: '#6b7280',
          disabled: '#9ca3af',
          inverse: '#ffffff',
        },
        // Border colors - Light theme
        border: {
          DEFAULT: '#e5e7eb',
          hover: '#d1d5db',
          focus: '#3b82f6',
        },
        // Dark theme colors
        dark: {
          background: {
            DEFAULT: '#0f172a',
            card: '#1e293b',
            sidebar: '#1e293b',
            elevated: '#334155',
          },
          text: {
            DEFAULT: '#f1f5f9',
            muted: '#94a3b8',
            disabled: '#64748b',
            inverse: '#0f172a',
          },
          border: {
            DEFAULT: '#334155',
            hover: '#475569',
            focus: '#3b82f6',
          },
        },
        // Chart colors for better data visualization
        chart: {
          1: '#3b82f6', // Blue
          2: '#10b981', // Green
          3: '#f59e0b', // Amber
          4: '#ef4444', // Red
          5: '#8b5cf6', // Purple
          6: '#06b6d4', // Cyan
          7: '#f97316', // Orange
          8: '#ec4899', // Pink
        },
      },
      boxShadow: {
        soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        medium:
          '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        large:
          '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        'dark-soft':
          '0 2px 15px -3px rgba(0, 0, 0, 0.3), 0 10px 20px -2px rgba(0, 0, 0, 0.2)',
        'dark-medium':
          '0 4px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
        'dark-large':
          '0 10px 40px -10px rgba(0, 0, 0, 0.5), 0 20px 25px -5px rgba(0, 0, 0, 0.4)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
