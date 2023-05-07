import { useState } from 'react';
import InputBtn from '../InputBtn';
import Button from '../Button/Button';
import { ReactComponent as Menu } from '../../images/menu.svg';

function MHeader() {
  const [nickname, setNickname] = useState('쫑이콩이맘');

  return (
    <div className="flex h-64 w-744 items-center justify-between border-b border-black-050 px-24 py-8 shadow-headerShadow">
      <div className="logo flex-center h-48 min-w-48 bg-yellow-500">로고</div>
      <InputBtn className="max-h-48 w-796" />
      <Menu className="h-32 min-w-32 p-8" />
    </div>
  );
}

export default MHeader;
