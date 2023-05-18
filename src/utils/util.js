import axios from 'axios';
import { useSelector } from 'react-redux';
import Button from '../components/Button/Button';

import Profile from '../images/profile.png';

// 성공 시 then 은 각 파일에서 추가로 작성하기
export const axiosGet = url => {
  return axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    })
    .catch(err => {
      console.log(err);
    });
};

export const axiosPost = (url, data) => {
  return axios
    .post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    })
    .catch(err => {
      console.log(err);
    });
};

export function RenderProfile({ profileActive, clickedProfile, handleDelete }) {
  const user = useSelector(state => state.user);
  const activeIndex = useSelector(state => state.activeIndex);

  const renderProfile = () => {
    return user.map((profile, idx) => {
      const activeClass = Number(activeIndex) === idx ? 'font-bold' : '';
      const shouldDisplayButton = Number(activeIndex) !== idx;
      // const selectedClass = selectProfile === idx ? 'font-bold' : '';
      return (
        <li className="flex w-full">
          <div
            className={`profile flex items-center justify-start${idx} cursor-pointer px-8 py-12 text-14 ${activeClass} w-full rounded-lg hover:bg-black-025`}
            onClick={e => {
              profileActive(e);
              clickedProfile(idx, profile.profileId);
            }}
            role="presentation"
            key={profile.profileId}
          >
            <div className="flex w-full">
              {Number(activeIndex) === idx && (
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
              onClick={() => handleDelete(idx, profile.profileId)}
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
