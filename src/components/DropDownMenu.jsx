import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCurProfile,
  setAuth,
  setActiveIndex,
  setUser,
} from '../actions/areaFilterActions';
import Profile from '../images/profile.png';

function DropDownMenu({ setDropDown }) {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);
  const curProfile = useSelector(state => state.curProfile);
  const activeIndex = useSelector(state => state.activeIndex);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/users/profile`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then(res => {
        dispatch(setUser(res.data));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    dispatch(setAuth(false));
    localStorage.removeItem('token');
    dispatch(setUser([]));
    dispatch(setCurProfile({}));
    dispatch(setActiveIndex(''));
  };

  function clickedProfile(profileId) {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/users/profile/${profileId}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
      )
      .then(() => {
        axios
          .get(
            `${process.env.REACT_APP_API_URL}/api/users/profile/currentProfile`,
            {
              headers: {
                Authorization: localStorage.getItem('token'),
              },
            },
          )
          .then(res => {
            dispatch(setCurProfile(res.data.data));
            setDropDown(false);
            dispatch(setActiveIndex(res.data.data.profileId));
          })
          .catch(err => {
            console.log(err);
          });
      });
  }

  // function profileActive(e) {
  //   const classList = e.target.className.split(' ');
  //   const indexClass = classList.find(className =>
  //     className.startsWith('profile'),
  //   );
  //   if (indexClass) {
  //     const index = parseInt(indexClass.slice(-1), 10);
  //     dispatch(setActiveIndex(index));
  //   }
  // }

  const RenderProfile = () => {
    return user.map(profile => {
      const activeClass = profile.profileId === activeIndex ? 'font-bold' : '';

      return (
        <li
          className={`profile flex items-center justify-start${profile.profileId} cursor-pointer px-8 py-12 text-14 ${activeClass} rounded-lg hover:bg-black-025`}
          onClick={e => {
            // profileActive(e);
            clickedProfile(profile.profileId);
          }}
          role="presentation"
          key={profile.profileId}
        >
          <div className="flex w-full justify-between">
            <div className="flex">
              {profile.profileId === activeIndex && (
                <div className="user-profile mr-10 inline-block h-24 w-24 rounded-md">
                  <img src={profile.imageUrl || Profile} alt="profileimage" />
                </div>
              )}
              {profile.name}
            </div>
          </div>
        </li>
      );
    });
  };

  return (
    <div className="absolute left-0 top-[64px] z-10 flex w-226 flex-col items-start justify-center rounded-[10px] bg-white px-12 py-16 shadow-dropDownShadow onlyMobile:w-[100%]">
      <ul className="profile w-202 py-2 text-left onlyMobile:w-[100%]">
        <li className="px-8 pb-8 text-12 text-black-350">프로필</li>
        <RenderProfile />
        <div className="mt-2 h-1 border-b" />
      </ul>
      <ul className="w-202 text-left onlyMobile:w-[100%]">
        <Link
          to={`/mypage/${curProfile.profileId}`}
          onClick={() => setDropDown(false)}
        >
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
