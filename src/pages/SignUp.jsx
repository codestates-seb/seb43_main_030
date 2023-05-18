import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import RadioGroup from '../components/Radio/RadioGroup';
import Radio from '../components/Radio/Radio';
import { ReactComponent as Kakao } from '../images/logo-kakao.svg';
import { ReactComponent as Google } from '../images/logo-google.svg';

function SignUp() {
  const navi = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const [user, setUser] = useState({
    email: '',
    password: '',
    checkTeacher: '',
  });
  const [officials, setOfficials] = useState(false);
  const [confirmPwd, setConfirmPwd] = useState('');

  // 인증문자
  const [confirmEmail, setConfirmEmail] = useState('');
  const [confirmInput, setConfirmInput] = useState('');

  // 오류메시지
  const [emailErr, setEmailErr] = useState('');
  const [pwdErr, setPwdErr] = useState('');
  const [confirmPwdErr, setConfirmPwdErr] = useState('');
  const [confirmEmailErr, setConfirmEmailErr] = useState('');

  // 유효성검사
  const [isEmail, setIsEmail] = useState(false);
  const [isPwd, setIsPwd] = useState(false);
  const [isConfirmPwd, setIsConfirmPwd] = useState(false);
  const [isConfirmEmail, setIsConfirmEmail] = useState(false);

  const handleOfficialsClick = value => () => {
    setOfficials(value);
  };

  const sendEmail = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/login/mailConfirm`, {
        email: user.email,
      })
      .then(res => {
        console.log('메일전송:', res);
        setConfirmEmail(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleConfirmEmail = e => {
    setConfirmInput(e.target.value);
  };

  const checkEmail = () => {
    if (confirmEmail === confirmInput) {
      setConfirmEmailErr('');
      setIsConfirmEmail(true);
    } else {
      setConfirmEmailErr('인증 코드를 다시 확인해주세요.');
      setIsConfirmEmail(false);
    }
  };

  const onSignup = useCallback(
    e => {
      e.preventDefault();
      if (isConfirmEmail) {
        axios
          .post(`${process.env.REACT_APP_API_URL}/users`, {
            email: user.email,
            password: user.password,
            checkOfficials: officials,
          })
          .then(res => {
            navi('/login');
            console.log(res);
          })
          .catch(err => {
            console.log(err);
            if (err.response && err.response.status === 409) {
              setEmailErr('이미 가입되어 있는 이메일입니다.');
            }
          });
      }
    },
    [user, officials, navi, isConfirmEmail],
  );

  const onCheckEmail = useCallback(
    e => {
      const valiEmail =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const CurrentEmail = e.target.value;
      setUser({ ...user, email: CurrentEmail });

      if (!valiEmail.test(CurrentEmail)) {
        setEmailErr('이메일 형식이 올바르지 않습니다.');
        setIsEmail(false);
      } else if (user.email.length === 0) {
        // input 영역에 아무것도 없으면 에러메시지가 사라져야되는데..
        setEmailErr('');
        setIsEmail(false);
      } else {
        setEmailErr('');
        setIsEmail(true);
      }
    },
    [user],
  );

  const onCheckPwd = useCallback(
    e => {
      const valiPwd = /^[^\s]{8,15}$/;
      const CurrentPwd = e.target.value;
      setUser({ ...user, password: CurrentPwd });

      if (!CurrentPwd) {
        setPwdErr('비밀번호를 입력해주세요.');
        setIsPwd(false);
      } else if (!valiPwd.test(CurrentPwd)) {
        setPwdErr('8~15자의 비밀번호를 입력해주세요.');
        setIsPwd(false);
      } else {
        setPwdErr('');
        setIsPwd(true);
      }
    },
    [user],
  );

  const onCheckConfirmPwd = useCallback(
    e => {
      const CurrentConfirmPwd = e.target.value;
      setConfirmPwd(CurrentConfirmPwd);

      if (user.password === CurrentConfirmPwd) {
        setConfirmPwdErr('');
        setIsConfirmPwd(true);
      } else {
        setConfirmPwdErr('비밀번호를 다시 확인해주세요.');
        setIsConfirmPwd(false);
      }
    },
    [user.password],
  );

  const signup = () => {
    return (
      <>
        <form className="px-8" onSubmit={onSignup}>
          <div className="mb-24 flex">
            <Input
              labelText="아이디"
              type="email"
              placeholder="아이디를 입력해주세요."
              onChange={onCheckEmail}
              isError={emailErr}
            />
            <Button
              className="color-yellow btn-size-l ml-8 mt-28 h-50 shrink-0 grow-0"
              onClick={sendEmail}
            >
              인증하기
            </Button>
          </div>
          <div className="mb-24 flex">
            <Input
              labelText="인증번호"
              placeholder="인증번호를 입력해주세요."
              onChange={handleConfirmEmail}
              isError={confirmEmailErr}
            />
            <Button
              className="color-yellow btn-size-l ml-8 mt-28 h-50 shrink-0 grow-0"
              onClick={checkEmail}
            >
              인증 완료
            </Button>
          </div>
          <div className="mb-24 flex flex-col">
            <p className="mb-8 text-left text-14 text-black-350">
              생성 계정 선택
            </p>
            <RadioGroup>
              <Radio
                id="1"
                name="contact"
                value="user"
                onClick={handleOfficialsClick(false)}
                defaultChecked
              >
                견주님
              </Radio>
              <Radio
                id="2"
                name="contact"
                value="owner"
                onClick={handleOfficialsClick(true)}
              >
                유치원 관계자
              </Radio>
            </RadioGroup>
          </div>
          <div className="mb-24">
            <Input
              labelText="비밀번호"
              placeholder="비밀번호를 입력해주세요."
              type="password"
              onChange={onCheckPwd}
              isError={pwdErr}
            />
          </div>
          <div className="mb-24">
            <Input
              labelText="비밀번호 확인"
              placeholder="비밀번호를 다시 입력해주세요."
              type="password"
              onChange={onCheckConfirmPwd}
              isError={confirmPwdErr}
            />
          </div>
          <Button
            className="color-yellow btn-size-l w-full"
            disabled={!(isEmail && isPwd && isConfirmPwd && isConfirmEmail)}
            onClick={onSignup}
          >
            이메일로 회원가입
          </Button>
        </form>
        <div className="login-line">또는</div>
        <div>
          <Button className="border-gray btn-size-l mb-16 w-full gap-1.5">
            <Kakao />
            카카오 회원가입
          </Button>
          <Button className="border-gray btn-size-l w-full gap-1.5">
            <Google />
            구글 회원가입
          </Button>
        </div>
      </>
    );
  };

  return (
    <div className="flex-center onlyMobile:login-m-align h-screen bg-black-025 onlyMobile:bg-white">
      <div className="mt-80 onlyMobile:w-full onlyMobile:px-24">
        {!isMobile && <div className="login-card">{signup()}</div>}
        {isMobile && <div>{signup()}</div>}
        <div className="flex-center mt-32">
          <p className="mr-24 text-14 text-black-200 onlyMobile:text-12">
            이미 계정이 있으신가요?
          </p>
          <Link to="/login">
            <p className="text-14 text-black-900 onlyMobile:text-12">
              로그인 바로가기
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
