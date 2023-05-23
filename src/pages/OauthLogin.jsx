import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import Swal from 'sweetalert2';
import {
  setAuth,
  // setCurUser,
  setUser,
  setCurProfile,
  setActiveIndex,
} from '../actions/areaFilterActions';

function OauthLogin() {
  const navi = useNavigate();
  const dispatch = useDispatch();

  const url = new URL(window.location.href);
  const authorization = url.searchParams.get('Authorization');
  const refresh = url.searchParams.get('Refresh');

  const getUsers = () => {
    if (localStorage.getItem('token')) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/users/profile`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        })
        .then(res => {
          dispatch(setUser(res.data));
          dispatch(setCurProfile(res.data[0]));
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
              dispatch(setActiveIndex(res.data.data.profileId));
              navi('/');
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  if (authorization) {
    dispatch(setAuth(true));
    localStorage.setItem('token', authorization);
    localStorage.setItem('tokenRefresh', refresh);
    getUsers();
  } else if (!authorization) {
    navi('/login');

    Swal.fire({
      icon: 'error',
      text: '로그인에 실패했습니다.',
      confirmButtonColor: '#FFD337',
    });
  }

  return (
    <div className="flex-center h-[50vh] w-[100%]">
      <PulseLoader color="#FFD337" />
    </div>
  );
}

export default OauthLogin;
