import { useState } from 'react';
import { Link } from 'react-router-dom';
import InputBtn from '../InputBtn';
import Button from '../Button/Button';
import DropDownMenu from '../DropDownMenu';
import { ReactComponent as Search } from '../../images/search.svg';
import { ReactComponent as ArrowOpen } from '../../images/arrow-open.svg';
import { ReactComponent as ArrowClose } from '../../images/arrow-close.svg';
import { ReactComponent as Logo } from '../../images/logo-txt.svg';

function Header({
  inputValue,
  setInputValue,
  kinderGartens,
  setKinderGartens,
  auth,
  setAuth,
  user,
  curUser,
  setCurUser,
}) {
  // const [isLogin, setIsLogin] = useState(false);
  // const [nickname, setNickname] = useState('쫑이콩이맘');
  const [dropDown, setDropDown] = useState(false);

  function onDropDown() {
    setDropDown(!dropDown);
  }

  return (
    <div className="flex-center fixed z-20 w-full bg-white shadow-headerShadow">
      <div className="flex h-80 w-[100%] max-w-[1440px] items-center justify-between border-b border-black-050 px-[4.5%] py-16">
        <Link to="/">
          <div className="flex-center w-120">
            <Logo />
          </div>
        </Link>
        <div className="input-array">
          <InputBtn
            inputValue={inputValue}
            setInputValue={setInputValue}
            kinderGartens={kinderGartens}
            setKinderGartens={setKinderGartens}
          />
        </div>
        {auth ? (
          <div className="relative mr-12 flex h-48 w-150 items-center justify-between p-8">
            <Search className="min-h-32 min-w-32 rounded-md border" />
            <span className="mx-12 min-w-88 text-center text-14">dddd</span>
            {dropDown ? (
              <ArrowClose
                className="h-6 min-w-10 cursor-pointer"
                onClick={() => onDropDown()}
              />
            ) : (
              <ArrowOpen
                className="h-6 min-w-10 cursor-pointer"
                onClick={() => onDropDown()}
              />
            )}
            {dropDown ? (
              <DropDownMenu
                setAuth={setAuth}
                user={user}
                curUser={curUser}
                setCurUser={setCurUser}
              />
            ) : null}
          </div>
        ) : (
          <div className="flex shrink-0 items-center justify-between">
            <Link to="/login">
              <Button className="color-yellow btn-size-m mr-12">로그인</Button>
            </Link>
            <Link to="/signup">
              <Button className="border-gray btn-size-m">회원가입</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
