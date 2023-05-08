import React from 'react';
import cls from '../../utils/tailwind';
import { ReactComponent as Search } from '../../images/search.svg';
import { ReactComponent as Map } from '../../images/map.svg';

function Button(props) {
  const { className, onClick, children, icon } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cls('flex-center rounded-md', className)}
    >
      {icon === 'search' ? <Search /> : ''}
      {icon === 'map' ? <Map className="mr-0.5" /> : ''}
      {children}
    </button>
  );
}

export default Button;
