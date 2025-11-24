/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#2563EB',
          green: '#10B981',
          red: '#EF4444',
          yellow: '#F59E0B',
          disabled: '#94A3B8'
        },
        neutral: {
          white: '#FFFFFF',
          surface: '#F8FAFC',
          border: '#E2E8F0',
          'border-error': '#FECACA',
          'border-success': '#A7F3D0',
          'text-primary': '#1E293B',
          'text-secondary': '#64748B',
          'text-disabled': '#94A3B8',
          'text-error': '#DC2626'
        },
        status: {
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#3B82F6'
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
      },
      fontSize: {
        'h1': ['32px', { lineHeight: '1.2', fontWeight: '600' }],
        'h2': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'h3': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.5', fontWeight: '400' }],
        'body': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'label': ['12px', { lineHeight: '1.4', fontWeight: '500' }],
        'error': ['14px', { lineHeight: '1.5', fontWeight: '400' }]
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px'
      }
    },
  },
  plugins: [],
}