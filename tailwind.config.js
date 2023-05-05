const range = length => Array.from({ length }, (_, i) => i);

const pixels = range(1000 + 1).map(x => [x, `calc(${x}rem / 16)`]);

const px0To1000 = Object.fromEntries(pixels);
const px0To64 = Object.fromEntries(pixels.slice(0, 64 + 1));
const px0To30 = Object.fromEntries(pixels.slice(0, 30 + 1));

/* 팁 하나 더 놓고 갈게요 */

const isDev = [undefined, 'development'].includes(process.env.NODE_ENV);
const PRODUCTION_STATIC_URL = ''; // 배포된 서버 주소
const LOCAL_STATIC_URL = ''; // 로컬주소
const STATIC_URL = () => {
  if (process.env.STATIC_URL) {
    return process.env.STATIC_URL;
  }
  if (isDev) {
    return LOCAL_STATIC_URL;
  }
  return PRODUCTION_STATIC_URL;
};

// 이렇게 STATIC_URL 주소를 선언하는 이유가 뭘까여

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
      },
      minWidth: px0To1000,
      minHeight: px0To1000,
      maxWidth: px0To1000,
      maxHeight: px0To1000,
      width: px0To1000,
      height: px0To1000,
      padding: px0To1000, // 1000패딩까지 쓸 일이 없겠죠? 새로 변수를 선언해줍시다. (생성되는 클래스네임 개수를 줄이기위해서)
      borderRadius: px0To30,
      fontSize: px0To64, // font사이즈는 1000까지 쓸 일이 없으므로 1000개의 클래스명을 만들어줄 이유가 없습니다.
      boxShadow: {
        dropDownShadow: '0px 0px 10px rgba(0, 0, 0, 0.08)',
        pinShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
      },
    },
    // 만약에 정적 이미지 파일 경로를 정의하고 싶을 때
    backgroundImage: {
      landing_image: `url(${STATIC_URL}/images/.,..)`, // 요런 식으로 동적 경로 설정이 가능합니다. (당장 적용하실 필요는 없고 이런 방법이 있다정도만 알아두세용) 넹!
    },
  },
  plugins: [require('tailwind-children')],
  '@tailwind base': {
    '*': {
      boxSizing: 'border-box',
    },
  },
};
