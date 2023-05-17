import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCurUser,
  setCurProfile,
  setAuth,
  setActiveIndex,
  setUser,
} from '../actions/areaFilterActions';
import Profile from '../images/profile.png';

// import { ReactComponent as Search } from '../images/search.svg';

function DropDownMenuM() {
  const user = useSelector(state => state.user);
  const curUser = useSelector(state => state.curUser);
  const activeIndex = useSelector(state => state.activeIndex);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setAuth(false));
    localStorage.removeItem('token');
    dispatch(setCurUser({}));
    dispatch(setUser([]));
    dispatch(setCurProfile({}));
    dispatch(setActiveIndex(''));
  };

  function clickedProfile(idx, id) {
    dispatch(setCurUser(user[idx]));
    dispatch(setCurProfile(user[idx]));

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
    const indexClass = classList.find(className =>
      className.startsWith('profile'),
    );
    if (indexClass) {
      const index = parseInt(indexClass.slice(-1), 10);
      dispatch(setActiveIndex(index));
    }
  }

  const renderProfile = () => {
    return user.map((profile, idx) => {
      const activeClass = Number(activeIndex) === idx ? 'font-bold' : '';
      return (
        <li
          className={`profile flex h-58 items-center justify-start${idx} cursor-pointer px-8 py-12 text-14 ${activeClass} rounded-lg hover:bg-black-025`}
          onClick={e => {
            profileActive(e);
            clickedProfile(idx, profile.profileId);
          }}
          role="presentation"
          key={profile.profileId}
        >
          {/* {Number(activeIndex) === idx ? (
            <Search className="mr-10 inline-block h-24 w-24 rounded-md border" />
          ) : null}
          {user[idx]} */}
          <div className="flex w-full justify-between">
            <div className="flex">
              {Number(activeIndex) === idx && (
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
    <div className="absolute right-0 top-[64px] z-10 flex w-full flex-col items-start justify-center rounded-[10px] border-b border-black-050 bg-white px-24 py-8 shadow-headerShadow">
      <ul className="profile w-full py-12 text-left">
        <li className="px-8 pb-8 text-12 text-black-350">프로필</li>
        {renderProfile()}
        <div className="mt-4 h-1 border-b" />
      </ul>
      <ul className="menu w-full px-8 text-left">
        <Link to={`/mypage/${curUser.profileId}`}>
          <li className="h-58 cursor-pointer py-12 text-14">마이페이지</li>
        </Link>
        <Link to="/">
          <li
            className="h-58 cursor-pointer py-12 text-14"
            onClick={() => handleLogout()}
            role="presentation"
          >
            로그아웃
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default DropDownMenuM;
