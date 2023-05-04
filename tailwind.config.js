const range = length => Array.from({ length }, (_, i) => i);

const pixels = range(1000 + 1).map(x => [x, `calc(${x}rem / 16)`]);

const px0To1000 = Object.fromEntries(pixels);

module.exports = {
  content: ['./src/**/*.{js,jsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
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
      },
      minWidth: px0To1000,
      minHeight: px0To1000,
      maxWidth: px0To1000,
      maxHeight: px0To1000,
      width: px0To1000,
      height: px0To1000,
      padding: px0To1000,
      fontSize: px0To1000,
    },
  },
  plugins: [],
  '@tailwind base': {
    '*': {
      boxSizing: 'border-box',
    },
  },
};
