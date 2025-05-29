// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
    
  ],
  server: {port:5173}
  //  optimizeDeps: {
  //   include: ['fabric']
  // }
})

// export default {
  // optimizeDeps: {
  //   include: ['fabric']
  // }
// }



// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {
//       animation: {
//         'float': 'float 6s ease-in-out infinite',
//         'shine': 'shine 1.5s infinite',
//       },
//       keyframes: {
//         float: {
//           '0%, 100%': { transform: 'translateY(0px)' },
//           '50%': { transform: 'translateY(-10px)' },
//         },
//         shine: {
//           '0%': { transform: 'translateX(-100%) rotate(-45deg)' },
//           '100%': { transform: 'translateX(100%) rotate(-45deg)' },
//         },
//       },
//       boxShadow: {
//         'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
//       },
//       transitionProperty: {
//         'height': 'height',
//         'spacing': 'margin, padding',
//       },
//     },
//   },
//   plugins: [],
// }