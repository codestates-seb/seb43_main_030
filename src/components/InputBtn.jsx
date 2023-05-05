import { useState } from 'react';
import { ReactComponent as Search } from '../images/search.svg';

function InputBtn() {
  const [focus, setFocus] = useState(true);
  return (
    <div className="input-array">
      <div
        className={
          focus ? 'search-input-outline' : 'search-input-outline-focus'
        }
      >
        <input
          type="text"
          className="search-input"
          placeholder="input-btn버튼"
          onFocus={() => setFocus(false)}
          onBlur={() => setFocus(true)}
        />
        <button
          type="button"
          className="search-input-btn"
          onFocus={() => setFocus(false)}
          onBlur={() => setFocus(true)}
        >
          <Search placeholder="placeholder" />
        </button>
      </div>
    </div>
  );
}

export default InputBtn;
