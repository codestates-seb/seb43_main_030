import React, { forwardRef } from 'react';
import cls from '../../utils/tailwind';
import { ReactComponent as Search } from '../../images/search.svg';
import { ReactComponent as Map } from '../../images/map.svg';
import { ReactComponent as List } from '../../images/list.svg';
import { ReactComponent as Plus } from '../../images/plus.svg';
import { ReactComponent as Setting } from '../../images/setting.svg';
import { ReactComponent as Logout } from '../../images/logout.svg';

const Button = forwardRef((props, ref) => {
  const { className, onClick, children, icon, disabled } = props;

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className={cls('flex-center rounded-md', className)}
      disabled={disabled}
    >
      {icon === 'search' ? <Search /> : ''}
      {icon === 'map' ? <Map className="mr-10 h-20 w-20 text-white" /> : ''}
      {icon === 'list' ? <List className="mr-10 h-20 w-20" /> : ''}
      {icon === 'plus' ? <Plus className="h-20 w-20" /> : ''}
      {icon === 'setting' ? <Setting className="h-20 w-20" /> : ''}
      {icon === 'logout' ? <Logout className="h-20 w-20" /> : ''}
      {children}
    </button>
  );
});

export default Button;
