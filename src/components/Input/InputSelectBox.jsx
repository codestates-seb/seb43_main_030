import { useState, useRef, useEffect } from 'react';
import { ReactComponent as ArrowOpen } from '../../images/arrow-open.svg';
import { ReactComponent as ArrowClose } from '../../images/arrow-close.svg';

function InputSelectBox() {
  const profiles = ['1', '2', '3'];
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectUser, setSelectUser] = useState('선택해주세요.');
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
    if (clickCount > 0 && selectUser === '선택해주세요.') {
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
            ? 'input-select-default border-red-400'
            : 'input-default input-select-default'
        }
      >
        {selectUser}
        {focus ? <ArrowOpen /> : <ArrowClose />}
      </button>
      {errorCheck && !focus ? (
        <p className="input-text text-red-400">선택해주세요.</p>
      ) : (
        ''
      )}
      {focus && (
        <div className="flex w-226 flex-col items-start justify-center rounded-[10px] px-12 py-16 shadow-dropDownShadow">
          <ul className="ul profile w-202 px-8 py-12 text-left">
            {profiles.map((profile, idx) => {
              const activeClass = activeIndex === idx ? 'font-bold' : '';
              return (
                <li
                  className={`li profile${idx} cursor-pointer py-12 text-14 ${activeClass} rounded-lg hover:bg-black-025`}
                  onClick={profileActive}
                  role="presentation"
                >
                  {profiles[idx]}
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
