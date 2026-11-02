/** Tailwind CSS build configuration for Nexus Admin
 *  Rebuild the stylesheet with:  npm install  &&  npm run build   */
module.exports = {
  darkMode: 'class',                                   // dark mode is switched by the "dark" class on <html>
  content: ['./*.html', './assets/js/app.js'],         // every file that contains Tailwind class names
  theme: {
    extend: {
      keyframes: {
        'gradient-shift': { '0%, 100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        'glow-pulse': { '0%, 100%': { opacity: '.55' }, '50%': { opacity: '1' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
      },
      animation: {
        'gradient-shift': 'gradient-shift 10s ease infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
