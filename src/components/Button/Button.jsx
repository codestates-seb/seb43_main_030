import React from 'react';
import cls from '../../utils/tailwind';
import { ReactComponent as Search } from '../../images/search.svg';
import { ReactComponent as Map } from '../../images/map.svg';
import { ReactComponent as List } from '../../images/list.svg';

function Button(props) {
  const { className, onClick, children, icon } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cls('flex-center rounded-md', className)}
    >
      {icon === 'search' ? <Search /> : ''}
      {icon === 'map' ? <Map className="mr-10" /> : ''}
      {icon === 'list' ? <List className="mr-10" /> : ''}
      {children}
    </button>
  );
}

export default Button;
