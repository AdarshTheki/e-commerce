/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-delay-100': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.1s',
        'pulse-delay-200': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.2s',
      },
    },
  },
  plugins: [],
};
