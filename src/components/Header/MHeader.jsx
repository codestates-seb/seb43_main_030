import { useState } from 'react';
import InputBtn from '../InputBtn';
import { ReactComponent as Menu } from '../../images/menu.svg';
import DropDownMenuM from '../DropDownMenuM';

function MHeader() {
  const [isLogin, setIsLogin] = useState(true);
  const [nickname, setNickname] = useState('쫑이콩이맘');
  const [dropDown, setDropDown] = useState(false);

  function onDropDown() {
    setDropDown(!dropDown);
  }

  return (
    <div
      className={`${
        dropDown ? '' : 'shadow-headerShadow'
      } relative mb-500 flex h-64 w-744 items-center justify-between border-b border-black-050 px-24 py-8`}
    >
      <div className="logo flex-center h-48 min-w-48 bg-yellow-500">로고</div>
      <InputBtn className="max-h-48 w-796" />
      {dropDown ? (
        <button
          className="h-32 w-32"
          type="button"
          onClick={() => onDropDown()}
        >
          X
        </button>
      ) : (
        <Menu className="h-32 w-32" onClick={() => onDropDown()} />
      )}
      {dropDown ? (
        isLogin ? (
          <DropDownMenuM />
        ) : (
          <ul>
            <li>리스트보기</li>
            <li>로그인</li>
            <li>로그아웃</li>
          </ul>
        )
      ) : null}
    </div>
  );
}

export default MHeader;
