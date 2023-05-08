import { useState } from 'react';
import InputBtn from '../InputBtn';
import Button from '../Button/Button';
import DropDownMenu from '../DropDownMenu';
import { ReactComponent as Search } from '../../images/search.svg';
import { ReactComponent as ArrowOpen } from '../../images/arrow-open.svg';
import { ReactComponent as ArrowClose } from '../../images/arrow-close.svg';

function Header() {
  const [isLogin, setIsLogin] = useState(true);
  const [nickname, setNickname] = useState('쫑이콩이맘');
  const [dropDown, setDropDown] = useState(false);

  function onDropDown() {
    setDropDown(!dropDown);
  }

  return (
    <div className="relative flex h-80 w-full items-center justify-between border-b border-black-050 px-80 py-16 shadow-headerShadow">
      <div className="flex-center min-h-42 min-w-80 bg-yellow-500">로고</div>
      <InputBtn />
      {isLogin ? (
        <div className="mr-12 flex h-48 w-150 items-center justify-between p-8">
          <Search className="min-h-32 min-w-32 rounded-md border" />
          <span className="ml-12 mr-12 min-w-88 text-14">{nickname}</span>
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
          {dropDown ? <DropDownMenu /> : null}
        </div>
      ) : (
        <div className="flex h-42 w-152 items-center justify-between">
          <Button className="btn-medium-default text-14">로그인</Button>
          <Button className="btn-border-medium text-14">회원가입</Button>
        </div>
      )}
    </div>
  );
}

export default Header;
