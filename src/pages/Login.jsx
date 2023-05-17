import { useMediaQuery } from 'react-responsive';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
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
      setEmailErr('아이디를 입력하세요.');
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
        setEmailErr('이메일 또는 패스워드가 올바르지 않습니다.');
      });
  }

  const login = () => {
    return (
      <>
        <form onSubmit={e => e.preventDefault()}>
          {check ? (
            <div className="mb-24">
              <Input
                labelText="아이디"
                placeholder="아이디를 입력해주세요."
                type="text"
                onChange={handleValueChange('email')}
              />
            </div>
          ) : (
            <div className="mb-24">
              <Input
                labelText="아이디"
                placeholder="아이디를 입력해주세요."
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
          <Button className="border-gray btn-size-l w-full gap-1.5">
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
