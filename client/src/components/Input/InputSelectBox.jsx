import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAreaFilter, setSearchValue } from '../../actions/areaFilterActions';
import cls from '../../utils/tailwind';
import { ReactComponent as ArrowOpen } from '../../images/arrow-open.svg';
import { ReactComponent as ArrowClose } from '../../images/arrow-close.svg';

function InputSelectBox(props) {
  const { options, placeholder, className, width } = props;
  // options: 셀렉트박스 펼칠 때 나오는 옵션 리스트. <InputSelectBox options="a,b,c" />형태로 입력
  // className: button에 추가
  // width: <InputSelectBox width="w-500" /> 형태로 입력
  const profiles = options.split(',');
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectUser, setSelectUser] = useState(placeholder);
  const [focus, setFocus] = useState(false);
  const areaFilter = useSelector(state => state.areaFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof areaFilter === 'number') {
      setSelectUser(profiles[areaFilter]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [areaFilter]);

  const profileActive = event => {
    const index = Number(event.target.className.split(' ')[1].slice(-1));
    setActiveIndex(index);
    setSelectUser(profiles[index]);
    dispatch(setAreaFilter(index));
    setFocus(false);
    dispatch(setSearchValue(''));
  };

  const handleButtonClick = () => {
    setFocus(!focus);
  };

  return (
    <div className="relative">
      <button
        onClick={handleButtonClick}
        type="button"
        className={cls('input-default input-select-default ', className, width)}
      >
        {selectUser}
        {focus ? <ArrowClose /> : <ArrowOpen />}
      </button>
      {focus && (
        <div
          className={cls(
            'absolute left-0 top-[58px] z-50 flex flex-col items-start justify-center rounded-[10px] bg-white shadow-dropDownShadow',
            width,
          )}
        >
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
