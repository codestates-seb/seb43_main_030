import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as Search } from '../images/search.svg';
import {
  setAreaFilter,
  setKinderGartens,
  setInputValue,
  setSearchValue,
  setCommInputValue,
  setTempCommInputValue,
  setSearchClickState,
} from '../actions/areaFilterActions';
import cls from '../utils/tailwind';

function InputBtn(props) {
  const { placeholder, className, setPostList, pageState, commUrl } = props;
  const [focus, setFocus] = useState(true);
  const [pageValue, setPageValue] = useState(pageState);
  const dispatch = useDispatch();
  const inputValue = useSelector(state => state.inputValue);
  const commInputValue = useSelector(state => state.commInputValue);
  const tempCommInputValue = useSelector(state => state.tempCommInputValue);

  function changeInput(e) {
    if (pageValue === 'community') {
      dispatch(setTempCommInputValue(e.target.value));
    } else {
      dispatch(setInputValue(e.target.value));
    }
  }

  function searchInput() {
    if (pageValue === 'community') {
      const url = `${commUrl}&keyword=${commInputValue}`;
      if (tempCommInputValue) {
        dispatch(setSearchClickState(true));
      } else {
        dispatch(setSearchClickState(false));
      }
      axios
        .get(url)
        .then(response => {
          dispatch(setCommInputValue(tempCommInputValue));
          setPostList(response.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      const url = `${process.env.REACT_APP_API_URL}/api/kindergarten/name/${inputValue}`;
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
          value={pageValue === 'community' ? tempCommInputValue : inputValue}
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
