import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import InputBtn from '../InputBtn';
import { ReactComponent as Menu } from '../../images/menu.svg';
import { ReactComponent as LogoSymbol } from '../../images/logo-symbol.svg';
import { ReactComponent as Close } from '../../images/close.svg';
import DropDownMenuM from '../DropDownMenuM';

function MHeader(props) {
  const [isLogin, setIsLogin] = useState(false);
  const [nickname, setNickname] = useState('쫑이콩이맘');
  const [dropDown, setDropDown] = useState(false);
  const {
    inputValue,
    setInputValue,
    auth,
    setAuth,
    searchValue,
    setSearchValue,
  } = props;

  const navi = useNavigate();

  function onDropDown() {
    setDropDown(!dropDown);
  }

  function reload() {
    navi('/');
    window.location.reload();
  }

  return (
    <div
      className={`${
        dropDown ? '' : 'shadow-headerShadow'
      } fixed z-10 flex h-64 w-[100%] items-center justify-between border-b border-black-050 bg-white px-24 py-8`}
    >
      <Link to="/">
        <div
          className="flex-center w-48 cursor-pointer"
          onClick={reload}
          role="presentation"
        >
          <LogoSymbol />
        </div>
      </Link>
      <div className="input-array">
        <InputBtn
          inputValue={inputValue}
          setInputValue={setInputValue}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </div>
      {dropDown ? (
        <button
          className="h-32 w-32"
          type="button"
          onClick={() => onDropDown()}
        >
          <Close />
        </button>
      ) : (
        <Menu className="h-32 w-32" onClick={() => onDropDown()} />
      )}
      {dropDown ? (
        isLogin ? (
          <DropDownMenuM />
        ) : (
          <div className="absolute right-0 top-[64px] flex w-full flex-col items-start justify-center rounded-[10px] border-b border-black-050 bg-white px-24 py-8 shadow-headerShadow">
            <ul className="w-full px-8 text-left">
              <li className="flex h-58 cursor-pointer items-center py-12 text-14">
                리스트보기
              </li>
              <div className="h-1 w-full border-b" />
              <Link to="/login">
                <li className="flex h-58 cursor-pointer items-center py-12 text-14">
                  로그인
                </li>
              </Link>
              <Link to="/signup">
                <li className="flex h-58 cursor-pointer items-center py-12 text-14">
                  회원가입
                </li>
              </Link>
            </ul>
          </div>
        )
      ) : null}
    </div>
  );
}

export default MHeader;
