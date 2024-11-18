module.exports = {
  content: [
    './views/**/*.html',     // Incluye todos los archivos HTML en la carpeta views
    './dist/**/*.css', // Incluye los archivos CSS generados
    './styles/**/*.css' // Incluye todos los archivos CSS de estilos
  ],
  theme: {
    extend: {
      colors: {
        lilac: '#E6E6FA',  // Color lila
        vine: '#800020',   // Color vino
        purple: '#800080', // Color púrpura
      },
    },
  },
  plugins: [],
}


