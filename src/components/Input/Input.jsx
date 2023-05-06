import cls from '../../utils/tailwind';

function Input(props) {
  const {
    type,
    value,
    placeholder,
    handleChange,
    isError,
    isComp,
    className,
    labelText,
  } = props;

  const renderClassNames = () => {
    // 특정 인자값을 받았을 때 케이스에 따라 다른 className을 리턴하게 하는 함수를 만들 수도 있구요
  };
  return (
    <div className="input-array">
      {/* label이 있을 경우 labelText props작성 */}
      {labelText && (
        <label
          htmlFor="input"
          className={cls('mb-1 text-left text-14 text-black-500')}
        >
          {labelText}
        </label>
      )}
      <input
        id="input"
        type={type}
        value={value}
        className={cls(
          'h-50  w-242 rounded-lg border-2 border-solid px-18 py-16 text-14 focus:outline-none',
          className,
        )}
        placeholder={placeholder}
        onChange={handleChange}
      />{' '}
      {/* 에러 시 isError 완료 시 isComp props에 안내문구 작성  */}
      {isError && <p className="input-text text-red-400">{isError}</p>}
      {isComp && <p className="input-text text-blue-500">{isComp}</p>}{' '}
    </div>
  );
}
export default Input;
