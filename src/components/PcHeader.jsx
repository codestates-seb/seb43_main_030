import { useState } from 'react';
import InputBtn from './InputBtn';
import SampleButton from './Button/Button';
import SampleInput from './Input/Input';
import { ReactComponent as Search } from '../images/search.svg';
import { ReactComponent as ArrowOpen } from '../images/arrow-open.svg';

function Header() {
  const [isLogin, setIsLogin] = useState(true);
  const [nickname, setNickname] = useState('쫑이콩이맘');

  return (
    <div className="w-1440 mt-40 flex h-80 items-center justify-between border-b border-black-050 px-80 py-16">
      <div className="logo flex-center h-42 w-134 bg-black-350">로고</div>
      <SampleInput className="max-h-48 w-796" />
      {isLogin ? (
        <div className="profileContainer flex h-48 w-150 items-center justify-between p-8">
          <Search className="profileImg h-32 w-32 rounded-md border" />
          <span className="profileNickname text-14">{nickname}</span>
          <ArrowOpen className="h-6 w-10 cursor-pointer" />
        </div>
      ) : (
        <div className="btnContainer flex h-42 w-152 items-center justify-between">
          <SampleButton className="btn-medium-default text-14">
            로그인
          </SampleButton>
          <SampleButton className="btn-border-medium text-14">
            회원가입
          </SampleButton>
        </div>
      )}
    </div>
  );
}

export default Header;
