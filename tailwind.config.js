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
          50: '#E6F3FF',
          100: '#CCE7FF',
          200: '#99CFFF',
          300: '#66B7FF',
          400: '#339FFF',
          500: '#005A8B',
          600: '#004A73',
          700: '#003A5B',
          800: '#002A43',
          900: '#001A2B'
        },
        secondary: {
          50: '#E8F4F6',
          100: '#D1E9ED',
          200: '#A3D3DB',
          300: '#75BDC9',
          400: '#47A7B7',
          500: '#00698F',
          600: '#005A79',
          700: '#004B63',
          800: '#003C4D',
          900: '#002D37'
        },
        accent: {
          50: '#FFF3E6',
          100: '#FFE7CC',
          200: '#FFCF99',
          300: '#FFB766',
          400: '#FF9F33',
          500: '#FF6B00',
          600: '#E55A00',
          700: '#CC4900',
          800: '#B23800',
          900: '#992700'
        },
        success: {
          50: '#E8F7F2',
          100: '#D1EFE5',
          200: '#A3DFCB',
          300: '#75CFB1',
          400: '#47BF97',
          500: '#00875A',
          600: '#00734D',
          700: '#005F40',
          800: '#004B33',
          900: '#003726'
        },
        warning: {
          50: '#FFF8E6',
          100: '#FFF1CC',
          200: '#FFE399',
          300: '#FFD566',
          400: '#FFC733',
          500: '#FF991F',
          600: '#E5821B',
          700: '#CC6B17',
          800: '#B25413',
          900: '#993D0F'
        },
        error: {
          50: '#FFEBE6',
          100: '#FFD7CC',
          200: '#FFAF99',
          300: '#FF8766',
          400: '#FF5F33',
          500: '#DE350B',
          600: '#C52D09',
          700: '#AC2507',
          800: '#931D05',
          900: '#7A1503'
        },
        info: {
          50: '#E6F2FF',
          100: '#CCE5FF',
          200: '#99CBFF',
          300: '#66B1FF',
          400: '#3397FF',
          500: '#0065BD',
          600: '#0056A1',
          700: '#004785',
          800: '#003869',
          900: '#00294D'
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        'soft': '0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'elevated': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}