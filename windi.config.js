import { defineConfig } from 'windicss/helpers'
import formsPlugin from 'windicss/plugin/forms'

export default defineConfig({
  attributify: true,
  darkMode: 'class',
  safelist: 'p-3 p-4 p-5',
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      primary: '#3490dc',
      secondary: '#ffed4a',
      bb: '#e3342f',
    }), 
    extend: {
      animation: {
        'spin': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [formsPlugin],
})