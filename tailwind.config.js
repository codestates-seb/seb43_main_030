const range = length => Array.from({ length }, (_, i) => i);

const pixels = range(1000 + 1).map(x => [x, `calc(${x}rem / 16)`]);

const px0To1000 = Object.fromEntries(pixels);
const px0To64 = Object.fromEntries(pixels.slice(0, 64 + 1));
const px0To30 = Object.fromEntries(pixels.slice(0, 30 + 1));

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        red: '#991b1b',
        'yellow-050': '#FFF9E5',
        'yellow-100': '#FFF2C2',
        'yellow-200': '#FFEA9E',
        'yellow-300': '#FFE175',
        'yellow-500': '#FFD337',
        'yellow-600': '#FFC72E',
        'yellow-800': '#FFBA24',
        'yellow-900': '#FFAF1A',

        'black-025': '#F8F9F9',
        'black-050': '#F1F2F3',
        'black-070': '#E3E5E8',
        'black-100': '#D6D9DC',
        'black-150': '#D8DBDE',
        'black-200': '#BABFC4',
        'black-350': '#9199A1',
        'black-500': '#6A737C',
        'black-600': '#525960',
        'black-700': '#434343',
        'black-750': '#3B4045',
        'black-800': '#232629',
        'black-900': '#121210',

        'blue-500': '#2094F3',

        'red-400': '#DE4F54',

        'green-400': '#25B865',
      },
      minWidth: px0To1000,
      minHeight: px0To1000,
      maxWidth: px0To1000,
      maxHeight: px0To1000,
      width: px0To1000,
      height: px0To1000,
      padding: px0To1000,
      borderRadius: px0To30,
      fontSize: px0To64,
      margin: px0To1000,
      boxShadow: {
        dropDownShadow: '0px 0px 10px rgba(0, 0, 0, 0.08)',
        pinShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        headerShadow: '0px 2px 6px rgba(0, 0, 0, 0.04)',
        cardShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
      },
      gridTemplateColumns: {
        cardGrid: 'repeat(auto-fit, minmax(302px, 1fr))',
      },
      screens: {
        onlyMobile: { max: '767px' },
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require('tailwind-children')],
  '@tailwind base': {
    '*': {
      boxSizing: 'border-box',
    },
  },
};
