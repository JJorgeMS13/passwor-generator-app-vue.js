module.exports = {
  configureWebpack: {
    plugins: [
      // DefinePlugin permite definir variables globales en tu código
      new (require('webpack')).DefinePlugin({
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': JSON.stringify(false), // Ajusta el valor según sea necesario
      }),
    ],
  },
};