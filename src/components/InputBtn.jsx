import { useState } from 'react';
import axios from 'axios';
import { ReactComponent as Search } from '../images/search.svg';
import cls from '../utils/tailwind';

function InputBtn(props) {
  const {
    placeholder,
    className,
    inputValue,
    setInputValue,
    setKinderGartens,
    searchValue,
    setSearchValue,
  } = props;
  const [focus, setFocus] = useState(true);

  function changeInput(e) {
    setInputValue(e.target.value);
  }

  function searchInput() {
    const url = `${process.env.REACT_APP_API_URL}/kindergarten/name/${inputValue}`;
    axios
      .get(url)
      .then(response => {
        setKinderGartens(response.data);
        setSearchValue(inputValue);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div className={cls(className)}>
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
          onChange={e => changeInput(e)}
        />
        <button
          type="button"
          className="search-input-btn"
          onFocus={() => setFocus(false)}
          onBlur={() => setFocus(true)}
        >
          <Search onClick={() => searchInput()} />
        </button>
      </div>
    </div>
  );
}

export default InputBtn;
