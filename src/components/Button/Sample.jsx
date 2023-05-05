import React from 'react';
import cls from '../../utils/tailwind';

// 공통 컴포넌트를 만들 때 고려해야하는 것들은 무엇이 있을까요
// 여러 버튼들이 가지는 공통적인 요소들
// ex. click 했을 때 실행되는 이벤트 함수, 버튼들마다 디자인이 다를테니 그 디자인 속성을 포함하는 className 등이 있겠죠
// props 로 미리 정의를 해볼게용
// 너무 익숙해서 tsx 로 만들었네욬ㅋㅋㅋㅋㅋ ㅈㅅㅈㅅ
// 버튼이 small , medium 도 있을 수 있지만 전혀 다른 디자인이 나올 수도 있잖아요
// 버튼 컴포넌트들만이 무조건 가지는, 절대적으로 상속받는 css 속성이 있을거예요 걔네들은 공통 버튼 컴포넌트 안에 클래스네임을 선언해놓고 나머지 속성들만 같이 className에 정의되게 수정하겠습니다.
// flex items-center justify-center rounded-md bg-yellow-500 보니까 요정도?
// 그리고 다른 컴포넌트에서 사용되는 버튼이라면 따로 추가해주는 것도 괜찮을것같아요 ex. Pagination 컴포넌트에서만 사용되는 버튼인 경우, 디자인 요소뿐만 아니라 비즈니스로직도 달라지는 등 완전히 재사용하기가 어려운 경우
function SampleButton(props) {
  /* className, onClick, 버튼에 표시되어야하는 text 또는 icon 등이 포함된 엘리먼트가 될 수 있겟죠? */
  const { classNames, onClick, children } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cls(
        'flex items-center justify-center rounded-md bg-yellow-500 hover:bg-yellow-800 disabled:bg-yellow-200 disabled:text-white',
        classNames,
        // 이런 식으로 여러 css 속성들을 병렬적으로 표기해야할 때 cls 함수를 사용하면 됩니다.
      )}
    >
      {children}
    </button>
  );
}

export default SampleButton;
