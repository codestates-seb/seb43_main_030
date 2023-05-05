/* 이 함수는 클래스네임들을 여러 개 중첩해서 사용하는 경우에 쓸 수 있습니다. */

const cls = (...classnames) => {
  return classnames.join(' ');
};

export default cls;
