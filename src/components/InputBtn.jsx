import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as Search } from '../images/search.svg';
import {
  setAreaFilter,
  setKinderGartens,
  setInputValue,
  setSearchValue,
} from '../actions/areaFilterActions';
import cls from '../utils/tailwind';

function InputBtn(props) {
  const { placeholder, className } = props;
  const [focus, setFocus] = useState(true);
  const dispatch = useDispatch();
  const inputValue = useSelector(state => state.inputValue);

  function changeInput(e) {
    dispatch(setInputValue(e.target.value));
  }

  function searchInput() {
    const url = `${process.env.REACT_APP_API_URL}/kindergarten/name/${inputValue}`;
    axios
      .get(url)
      .then(response => {
        dispatch(setKinderGartens(response.data));
        dispatch(setSearchValue(inputValue));
        dispatch(setInputValue(''));
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
