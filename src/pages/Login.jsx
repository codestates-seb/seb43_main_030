import { useMediaQuery } from 'react-responsive';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import { ReactComponent as Kakao } from '../images/logo-kakao.svg';
import { ReactComponent as Google } from '../images/logo-google.svg';

function Login({ setAuth, auth, setUser, user, setCurUser }) {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const navi = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [errId, setErrId] = useState('');
  const [errPw, setErrPw] = useState('');
  const [check, setCheck] = useState(true);

  const handleValueChange = key => e => {
    setLoginData({ ...loginData, [key]: e.target.value });
  };

  function loginFunc() {
    if (loginData.email.length < 1) {
      setErrId('아이디를 입력하세요.');
      setErrPw('');
      setCheck(false);
      return;
    }
    if (loginData.password.length < 1) {
      setErrId('');
      setErrPw('비밀번호를 입력하세요.');
      setCheck(false);
      return;
    }

    axios
      .post(`${process.env.REACT_APP_API_URL}/login`, {
        email: loginData.email,
        password: loginData.password,
      })
      .then(res => {
        setAuth(true);
        setErrId('');
        setErrPw('');
        navi('/');
        localStorage.setItem('token', res.headers.get('Authorization'));
      })
      .catch(err => {
        console.log(err);
        setAuth(false);
        setCheck(false);
        setErrId('이메일 또는 패스워드가 올바르지 않습니다.');
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
                isError={errId}
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
              isError={errPw}
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
            onClick={() => loginFunc()}
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
