import { useState, useRef, useEffect } from 'react';
import cls from '../../utils/tailwind';

function InputError(props) {
  const { isError, placeholder, labelText } = props;

  const [focus, setFocus] = useState(false);
  const [errorCheck, setErrorCheck] = useState(false);
  //   ToDo : 사용성을 위해 처음 한 번은 클릭해도 error가 노출되지 않도록 클릭 수를 세고있음. 일회성인데 state계속 수정되어 논의 필요함
  const [clickCount, setClickCount] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const handleButtonClick = event => {
    // setInputValue(event.target.value);
    // setClickCount(clickCount + 1);
    if (inputValue === '') {
      setErrorCheck(true);
    } else {
      setErrorCheck(false);
    }
    setFocus(focus);
  };
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setFocus(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef, clickCount]);

  return (
    <div ref={wrapperRef} className="flex flex-col">
      {labelText && (
        <label
          htmlFor="input"
          className={cls('mb-1 text-left text-14 text-black-500')}
        >
          {labelText}
        </label>
      )}
      <input
        placeholder={placeholder}
        onClick={e => {
          handleButtonClick();
        }}
        onChange={e => {
          setInputValue(e.target.value);
          handleButtonClick();
        }}
        type="text"
        className={
          errorCheck
            ? 'input-select-default border-red-400 focus:outline-none'
            : 'input-default input-select-default focus:outline-none'
        }
      />
      {errorCheck && !focus ? (
        <p className="input-text text-red-400">{isError}</p>
      ) : (
        ''
      )}
    </div>
  );
}
export default InputError;
