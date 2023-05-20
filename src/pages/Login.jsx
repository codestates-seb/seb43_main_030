import { useMediaQuery } from 'react-responsive';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  useGoogleLogin,
  GoogleLogin,
  GoogleOAuthProvider,
} from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAuth,
  setCurUser,
  setUser,
  setCurProfile,
} from '../actions/areaFilterActions';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import { ReactComponent as Kakao } from '../images/logo-kakao.svg';
import { ReactComponent as Google } from '../images/logo-google.svg';

function Login() {
  const navi = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  // const curUser = useSelector(state => state.)
  const user = useSelector(state => state.user);
  const curUser = useSelector(state => state.curUser);
  const curProfile = useSelector(state => state.curProfile);

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // 오류메시지
  const [emailErr, setEmailErr] = useState('');
  const [pwdErr, setPwdErr] = useState('');

  // 유효성 검사
  const [check, setCheck] = useState(true);

  const handleValueChange = key => e => {
    setLoginData({ ...loginData, [key]: e.target.value });
  };

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
        })
        .catch(err => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  function loginFunc() {
    if (!loginData.email) {
      setEmailErr('이메일을 입력하세요.');
      setPwdErr('');
      setCheck(false);
      return;
    }
    if (!loginData.password) {
      setEmailErr('');
      setPwdErr('비밀번호를 입력하세요.');
      setCheck(false);
      return;
    }

    axios
      .post(`${process.env.REACT_APP_API_URL}/login`, {
        email: loginData.email,
        password: loginData.password,
      })
      .then(res => {
        dispatch(setAuth(true));
        setEmailErr('');
        setPwdErr('');
        navi('/');
        // navi(0);
        localStorage.setItem('token', res.headers.get('Authorization'));
        localStorage.setItem('tokenRefresh', res.headers.get('Refresh'));
      })
      .then(res => {
        console.log(res);
        getUsers();
      })
      .catch(err => {
        console.log(err);
        dispatch(setAuth(false));
        setCheck(false);
        if (err.response && err.response.status === 500) {
          setEmailErr('이미 탈퇴한 이메일입니다.');
        } else {
          setEmailErr('이메일 또는 패스워드를 다시 확인해주세요.');
        }
      });
  }

  // const googleLogin = () => {
  //       localStorage.setItem('token', res.headers.get('Authorization'));
  //       localStorage.setItem('tokenRefresh', res.headers.get('Refresh'));

  // };

  // const googleLogin = useGoogleLogin({
  //   onSuccess: tokenResponse => console.log(tokenResponse),
  // });

  // const googleLogin = e => {
  //   e.preventDefault();

  //   // const googleUrl = `${process.env.REACT_APP_OAUTH_URL}/oauth2/authorization/google?redirect_uri=http://localhost:3000/signup`;
  //   const googleUrl = `${process.env.REACT_APP_OAUTH_URL}/oauth2/authorization/google`;
  //   // window.location.href = googleUrl;
  //   axios.post(googleUrl, { code: authorizationCode }).then(res => {
  //     localStorage.setItem('token', res.headers.Authorization);
  //   });
  // };

  // 구글 로그인
  const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}&
  response_type=token&
  redirect_uri=https://localhost:3000&
  scope=https://www.googleapis.com/auth/userinfo.email`;
  const handleGoogle = () => {
    window.location.assign(googleUrl);
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const { hash } = url;
    if (hash) {
      const accessToken = hash.split('=')[1].split('&')[0];
      axios
        .get(
          `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`,
          {
            headers: {
              authorization: `token ${accessToken}`,
              accept: 'application/json',
            },
          },
        )
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  const login = () => {
    return (
      <>
        <form onSubmit={e => e.preventDefault()}>
          {check ? (
            <div className="mb-24">
              <Input
                labelText="이메일"
                placeholder="이메일을 입력해주세요."
                type="text"
                onChange={handleValueChange('email')}
              />
            </div>
          ) : (
            <div className="mb-24">
              <Input
                labelText="이메일"
                placeholder="이메일 입력해주세요."
                type="text"
                isError={emailErr}
                onChange={handleValueChange('email')}
              />
            </div>
          )}

          {check ? (
            <Input
              labelText="비밀번호"
              placeholder="비밀번호를 입력해주세요."
              type="password"
              onChange={handleValueChange('password')}
            />
          ) : (
            <Input
              labelText="비밀번호"
              placeholder="비밀번호를 입력해주세요."
              type="password"
              isError={pwdErr}
              onChange={handleValueChange('password')}
            />
          )}
          <Link to="/find-password">
            <p className="mb-24 mt-8 text-right text-14 text-black-200">
              비밀번호를 잊으셨나요?
            </p>
          </Link>
          <Button
            className="color-yellow btn-size-l w-full"
            onClick={() => {
              loginFunc();
            }}
          >
            로그인
          </Button>
        </form>
        <div className="login-line">또는</div>
        <div>
          <Button className="border-gray btn-size-l mb-16 w-full gap-1.5">
            <Kakao />
            카카오 로그인
          </Button>
          <Button
            className="border-gray btn-size-l w-full gap-1.5"
            onClick={handleGoogle}
          >
            <Google />
            구글 로그인
          </Button>
        </div>
      </>
    );
  };

  return (
    <div className="flex-center onlyMobile:login-m-align h-screen bg-black-025 onlyMobile:bg-white">
      <div className="mt-80 onlyMobile:w-full onlyMobile:px-24">
        {!isMobile && <div className="login-card">{login()}</div>}
        {isMobile && <div>{login()}</div>}
        <div className="flex-center mt-32">
          <p className="mr-24 text-14 text-black-200 onlyMobile:text-12">
            아직 퍼펫트 회원이 아니신가요?
          </p>
          <Link to="/signup">
            <p className="text-14 text-black-900 onlyMobile:text-12">
              회원가입 바로가기
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
