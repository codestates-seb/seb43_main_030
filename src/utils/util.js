import axios from 'axios';
import { useSelector } from 'react-redux';
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

export function RenderProfile({ activeIndex, profileActive, clickedProfile }) {
  const user = useSelector(state => state.user);

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
          {Number(activeIndex) === idx && (
            <div className="mr-10 inline-block h-24 w-24 rounded-md">
              <img src={profile.imageUrl || Profile} alt="profileimage" />
            </div>
          )}
          {profile.name}
        </li>
      );
    });
  };

  return <>{renderProfile()}</>;
}
