// import { useState } from 'react';
// import InputBtn from '../InputBtn';
// import Button from '../Button/Button';
// import DropDownMenu from '../DropDownMenu';
// import { ReactComponent as Search } from '../../images/search.svg';
// import { ReactComponent as ArrowOpen } from '../../images/arrow-open.svg';
// import { ReactComponent as ArrowClose } from '../../images/arrow-close.svg';
import { ReactComponent as Logo } from '../images/logo-txt.svg';

function Footer() {
  return (
    <div className="flex-center w-full bg-black-050">
      <div className="relative flex h-80 w-[100%] max-w-[1440px] items-center justify-between border-b border-black-050 px-[4.5%] py-16">
        <div className="flex-center w-120">
          <Logo />
        </div>
      </div>
    </div>
  );
}

export default Footer;
