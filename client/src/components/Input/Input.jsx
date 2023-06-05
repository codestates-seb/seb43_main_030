import cls from '../../utils/tailwind';

function Input(props) {
  const {
    type,
    value,
    placeholder,
    isError,
    isComp,
    className,
    labelText,
    onChange,
    disabled,
  } = props;

  return (
    // <div className="input-array">
    <div className={cls('flex w-full flex-col')}>
      {/* label이 있을 경우 labelText props작성 */}
      {labelText && (
        <label
          htmlFor="input"
          className={cls('mb-6 text-left text-14 text-black-350', className)}
        >
          {labelText}
        </label>
      )}
      <input
        id="input"
        type={type}
        value={value}
        className={cls(
          'h-50 rounded-lg border-[1px] border-solid px-18 py-16 text-14 placeholder:text-black-200 focus:border-yellow-500 focus:outline-none disabled:bg-black-050 disabled:text-black-200',
          className,
        )}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />{' '}
      {/* 에러 시 isError 완료 시 isComp props에 안내문구 작성  */}
      {isError && <p className="input-text text-red-400">{isError}</p>}
      {isComp && <p className="input-text text-blue-500">{isComp}</p>}{' '}
    </div>
    // </div>
  );
}
export default Input;
