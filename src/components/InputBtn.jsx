import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { ReactComponent as Search } from '../images/search.svg';
import { setAreaFilter, setKinderGartens } from '../actions/areaFilterActions';
import cls from '../utils/tailwind';

function InputBtn(props) {
  const { placeholder, className, inputValue, setInputValue, setSearchValue } =
    props;
  const [focus, setFocus] = useState(true);
  const dispatch = useDispatch();

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
        setInputValue('');
        dispatch(setAreaFilter(0));
      })
      .catch(error => {
        console.log(error);
      });
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      searchInput();
    }
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
          value={inputValue}
          onKeyPress={handleKeyPress}
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
