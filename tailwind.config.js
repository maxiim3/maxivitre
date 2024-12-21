import daisyui from 'daisyui';
import tailwindTypography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      gridTemplateColumns: {
        nav: '1fr auto 1fr',
      },
    },
  },
  plugins: [daisyui, tailwindTypography],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#12CEF9',
          'primary-content': '#000f15',
          secondary: '#001f42',
          'secondary-content': '#c6ced7',
          accent: '#00c3ff',
          'accent-content': '#000e16',
          neutral: '#111827',
          'neutral-content': '#c9cbcf',
          'base-100': '#ffffff',
          'base-200': '#dedede',
          'base-300': '#bebebe',
          'base-content': '#161616',
          info: '#00ebff',
          'info-content': '#001316',
          success: '#86efac',
          'success-content': '#06140b',
          warning: '#facc15',
          'warning-content': '#150f00',
          error: '#f87171',
          'error-content': '#150404',
        },
      },
    ], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ':root', // The element that receives theme color CSS variables
  },
};
