// 잠깐 생각좀요 ㅎㅎ

import cls from '../../utils/tailwind';

// props 로 받을 수 있는 것들이...... type, value, placeholder, onChange, classNames, onFocus, onBlur,

function SampleInput(props) {
  const { type, value, placeholder, handleChange, isError, className } = props;

  // invalid, valid 속성 사용해도 되고, 아니면 isError 에 따라 조건부로 다른 className을 리턴하게 해보겠습니다.

  const renderClassNames = () => {
    // 특정 인자값을 받았을 때 케이스에 따라 다른 className을 리턴하게 하는 함수를 만들 수도 있구요
  };
  return (
    <div>
      <input
        type={type}
        value={value}
        className={cls(
          'h-50  w-242 rounded-lg border-2 border-solid  px-18 py-16 text-14 focus:outline-none',
          isError ? 'border-red-400' : className, // 이 인풋컴포넌트를 사용하는 부모컴포넌트에서 classname을 상속받아서 쓰게 하는 게 재사용성을 높일 수 있을 것같아요 (fail/success 여부에 따라 className을 상속받게 처리)
        )}
        placeholder={placeholder}
        onChange={handleChange}
      />{' '}
      {/* 에러메세지도 표시될 수 있으므로 */}
      {isError && <p className="text-red">{isError}</p>}{' '}
      {/* error메세지 string 이 존재하면 해당 p 태그가 조건부렌더링됩니다. */}
    </div>
  );
}
export default SampleInput;
