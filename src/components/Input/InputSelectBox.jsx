import { useState, useRef, useEffect } from 'react';
import { ReactComponent as ArrowOpen } from '../../images/arrow-open.svg';
import { ReactComponent as ArrowClose } from '../../images/arrow-close.svg';

function InputSelectBox(props) {
  // options: 셀렉트박스 펼칠 때 나오는 옵션 리스트. <InputSelectBox option="a,b,c" />형태로 입력
  const { options, placeholder } = props;
  const profiles = options.split(',');
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectUser, setSelectUser] = useState(placeholder);
  const [focus, setFocus] = useState(false);
  const [errorCheck, setErrorCheck] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const profileActive = event => {
    const index = Number(event.target.className.split(' ')[1].slice(-1));
    setActiveIndex(index);
    setSelectUser(profiles[index]);
    setErrorCheck(false);
    setFocus(false);
  };

  const handleButtonClick = () => {
    setClickCount(clickCount + 1);
    if (clickCount > 0 && selectUser === placeholder) {
      setErrorCheck(true);
    }
    setFocus(!focus);
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
  }, [wrapperRef]);

  return (
    <div ref={wrapperRef}>
      <button
        onClick={handleButtonClick}
        type="button"
        className={
          errorCheck
            ? 'input-select-default w-full border-red-400'
            : 'input-default input-select-default w-full'
        }
      >
        {selectUser}
        {focus ? <ArrowClose /> : <ArrowOpen />}
      </button>
      {errorCheck && !focus ? (
        <p className="input-text text-red-400">{placeholder}</p>
      ) : (
        ''
      )}
      {focus && (
        <div className="flex flex-col items-start justify-center rounded-[10px] px-12 py-16 shadow-dropDownShadow">
          <ul className="ul profile w-full px-8 py-12 text-left">
            {profiles.map((profile, idx) => {
              const activeClass = activeIndex === idx ? 'font-bold' : '';
              return (
                <li
                  className={`li profile${idx} w-full cursor-pointer p-12 text-14 ${activeClass} rounded-lg hover:bg-black-025`}
                  onClick={profileActive}
                  role="presentation"
                >
                  {profile}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
export default InputSelectBox;
