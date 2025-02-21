/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4C88D9', // Soft Blue
          hover: '#3b70b1', // Lighter Soft Blue for hover
        },
        success: {
          DEFAULT: '#4CAF50', // Soft Green
          hover: '#45a247', // Lighter Soft Green for hover
        },
        warning: {
          DEFAULT: '#FFA500', // Soft Orange
          hover: '#e68a00', // Lighter Soft Orange for hover
        },
        danger: {
          DEFAULT: '#F44336', // Soft Red
          hover: '#e0312d', // Lighter Soft Red for hover
        },
        background: {
          DEFAULT: '#F4F4F4', // Light Gray
          card: '#FFFFFF', // Off-White
          sidebar: '#F5F5F5', // Soft Beige
        },
        text: {
          DEFAULT: '#333333', // Dark Gray
          muted: '#707070', // Muted Gray
          disabled: '#BDBDBD', // Light Gray for disabled text
        },
        border: '#E0E0E0', // Soft Light Gray Border
      },
    },
  },
  plugins: [],
};
