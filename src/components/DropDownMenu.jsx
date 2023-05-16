import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCurUser,
  setCurProfile,
  setAuth,
  setActiveIndex,
} from '../actions/areaFilterActions';
import { ReactComponent as Search } from '../images/search.svg';

function DropDownMenu() {
  const user = useSelector(state => state.user);
  const curUser = useSelector(state => state.curUser);
  const activeIndex = useSelector(state => state.activeIndex);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setAuth(false));
    localStorage.removeItem('token');
  };

  function clickedProfile(idx, id) {
    dispatch(setCurUser(user[idx]));
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/profile/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then(res => {
        dispatch(setCurProfile(res.data.data));
      });
  }

  function profileActive(e) {
    const classList = e.target.className.split(' ');
    if (classList.length > 1) {
      const index = classList[3].slice(-1);
      dispatch(setActiveIndex(index));
    }
  }

  const renderProfile = () => {
    return user.map((profile, idx) => {
      const activeClass = Number(activeIndex) === idx ? 'font-bold' : '';
      return (
        <li
          className={`profile flex items-center justify-start${idx} cursor-pointer px-8 py-12 text-14 ${activeClass} rounded-lg hover:bg-black-025`}
          onClick={e => {
            profileActive(e);
            clickedProfile(idx, profile.profileId);
          }}
          role="presentation"
        >
          {Number(activeIndex) === idx ? (
            <Search className="mr-10 inline-block h-24 w-24 rounded-md border" />
          ) : null}
          {user[idx].name}
        </li>
      );
    });
  };

  return (
    <div className="absolute left-0 top-[64px] z-10 flex w-226 flex-col items-start justify-center rounded-[10px] bg-white px-12 py-16 shadow-dropDownShadow onlyMobile:w-[100%]">
      <ul className="profile w-202 py-2 text-left onlyMobile:w-[100%]">
        <li className="px-8 pb-8 text-12 text-black-350">프로필</li>
        {renderProfile()}
        <div className="mt-2 h-1 border-b" />
      </ul>
      <ul className="w-202 text-left onlyMobile:w-[100%]">
        <Link to={`/mypage/${curUser.profileId}`}>
          <li className="flex cursor-pointer items-center justify-start rounded-md px-8 py-12 text-14 hover:bg-black-025">
            마이페이지
          </li>
        </Link>
        <Link to="/">
          <li
            role="presentation"
            className="cursor-pointer items-center justify-start rounded-md px-8 py-12 text-14 hover:bg-black-025"
            onClick={() => handleLogout()}
          >
            로그아웃
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default DropDownMenu;
