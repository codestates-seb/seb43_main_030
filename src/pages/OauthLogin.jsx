import { useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import {
  setAuth,
  setCurUser,
  setUser,
  setCurProfile,
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
        .get(`${process.env.REACT_APP_API_URL}/users/profile`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        })
        .then(res => {
          dispatch(setUser(res.data));
          dispatch(setCurUser(res.data[0]));
          dispatch(setCurProfile(res.data[0]));
          navi('/');
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  // 만약 authorization 이 있는데, role 이 게스트야
  // 그러면 이메일이랑, 롤 선택하는로 가 => patch 로 보내려면 token을 같이 보내야된다며,,

  if (authorization) {
    dispatch(setAuth(true));
    localStorage.setItem('token', authorization);
    localStorage.setItem('tokenRefresh', refresh);
    getUsers();
    // if 만약 role 이 guest면 모달이던 그걸 띄워 그래서 아이디랑 이걸 입력하게 하는거야
    // 근데 role이 guest가 아니면 걍 메인으로 가
  } else {
    alert('로그인에 실패했습니다.');
    navi('/login');
  }

  return (
    <div className="flex-center h-[50vh] w-[100%]">
      <PulseLoader color="#FFD337" />
    </div>
  );
}

export default OauthLogin;
