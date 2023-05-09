import { useState } from 'react';
import { ReactComponent as Search } from '../images/search.svg';
import cls from '../utils/tailwind';

function InputBtn(props) {
  const { placeholder, className } = props;
  const [focus, setFocus] = useState(true);
  return (
    <div className={cls('input-array', className)}>
      <div
        className={
          focus
            ? 'search-input-outline border-black-070'
            : 'search-input-outline border-yellow-500'
        }
      >
        <input
          type="text"
          className="search-input w-full"
          placeholder={placeholder}
          onFocus={() => setFocus(false)}
          onBlur={() => setFocus(true)}
        />
        <button
          type="button"
          className={
            focus ? 'search-input-btn' : 'search-input-btn bg-black-025'
          }
          onFocus={() => setFocus(false)}
          onBlur={() => setFocus(true)}
        >
          <Search />
        </button>
      </div>
    </div>
  );
}

export default InputBtn;
