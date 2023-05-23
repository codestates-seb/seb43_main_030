import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Button from '../components/Button/Button';
import { setUser } from '../actions/areaFilterActions';

import Profile from '../images/profile.png';

function RenderProfile({ clickedProfile, handleDelete }) {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);
  const activeIndex = useSelector(state => state.activeIndex);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/users/profile`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then(res => {
        console.log(res);
        dispatch(setUser(res.data));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderProfile = () => {
    return user.map(profile => {
      const activeClass = profile.profileId === activeIndex ? 'font-bold' : '';
      const shouldDisplayButton = profile.profileId !== activeIndex;

      return (
        <li className="flex w-full" key={profile.profileId}>
          <div
            className={`profile flex items-center justify-start${profile.profileId} cursor-pointer px-8 py-12 text-14 ${activeClass} w-full rounded-lg hover:bg-black-025`}
            onClick={e => {
              clickedProfile(profile.profileId);
            }}
            role="presentation"
          >
            <div className="flex w-full">
              {profile.profileId === activeIndex && (
                <div className="user-profile mr-10 inline-block h-24 w-24 rounded-md">
                  <img src={profile.imageUrl || Profile} alt="profileimage" />
                </div>
              )}
              {profile.name}
            </div>
          </div>
          {shouldDisplayButton && user.length > 1 && (
            <Button
              className="btn-text-default w-40 text-red-400 onlyMobile:text-12"
              onClick={() => handleDelete(profile.profileId)}
            >
              삭제
            </Button>
          )}
        </li>
      );
    });
  };

  return <>{renderProfile()}</>;
}

export default RenderProfile;
