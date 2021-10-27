module.exports = {
  purge: [
      './resource/**/*.blade.php',
      './resource/**/*.js',
      './resource/**/*.jsx',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        colors: {
            pink: {
                450: '#ff2484'
            }
        }
    },
    fontFamily:{
      'default':["'Poppins'",],
    },
    rotate: {
       '-180': '-180deg',
        '-90': '-90deg',
       '-45': '-45deg',
        '0': '0',
        '45': '45deg',
        '90': '90deg',
       '135': '135deg',
        '180': '180deg',
       '270': '270deg',
    },
    maxWidth: {
       '1/4': '25%',
       '1/2': '50%',
       '3/4': '75%',
      }
  },



  variants: {
    extend: {},
  },
  plugins: [],

}
