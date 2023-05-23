import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import { useCallback, useState, useRef } from 'react';
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
  const signUpBtnRef = useRef(null);
  const emailVerifyBtnRef = useRef(null);
  const [user, setUser] = useState({
    email: '',
    password: '',
    checkTeacher: '',
  });
  const [officials, setOfficials] = useState(false);
  const [confirmPwd, setConfirmPwd] = useState('');

  // 인증메일
  const [confirmEmail, setConfirmEmail] = useState('');
  const [confirmInput, setConfirmInput] = useState('');
  const [emailSendComp, setEmailSendComp] = useState('');
  const [confirmComp, setConfirmComp] = useState('');

  // 오류메시지
  const [emailErr, setEmailErr] = useState('');
  const [pwdErr, setPwdErr] = useState('');
  const [confirmPwdErr, setConfirmPwdErr] = useState('');
  const [confirmEmailErr, setConfirmEmailErr] = useState('');

  // 유효성검사
  const [isEmail, setIsEmail] = useState(false);
  const [isPwd, setIsPwd] = useState(false);
  const [isConfirmPwd, setIsConfirmPwd] = useState(false);
  const [isConfirmEmailBtn, setIsConfirmEmailBtn] = useState(false);
  const [isConfirmEmail, setIsConfirmEmail] = useState(false);

  const handleOfficialsClick = value => () => {
    setUser({ ...user, checkTeacher: value });
    setOfficials(value);
  };

  const onSignup = useCallback(
    async e => {
      e.preventDefault();

      if (!confirmInput) {
        setConfirmEmailErr('인증 코드를 입력해주세요.');
        setIsConfirmEmail(false);
      }

      if (!user.email) {
        setEmailErr('이메일을 입력해주세요.');
      }
      if (!user.password) {
        setPwdErr('비밀번호를 입력해주세요.');
      }

      if (
        isEmail &&
        isPwd &&
        isConfirmPwd &&
        isConfirmEmail &&
        signUpBtnRef.current
      ) {
        setEmailErr('');
        setPwdErr('');
        setConfirmPwdErr('');
        setConfirmEmailErr('');
        try {
          await axios.post(`${process.env.REACT_APP_API_URL}/api/users`, {
            email: user.email,
            password: user.password,
            checkOfficials: officials,
          });
          navi('/login');
        } catch (error) {
          setEmailErr(error.response.data.message);
        } finally {
          signUpBtnRef.current.disabled = false;
        }
      }
    },
    [
      user,
      officials,
      navi,
      isEmail,
      isPwd,
      isConfirmPwd,
      isConfirmEmail,
      confirmInput,
    ],
  );

  const handleConfirmEmail = e => {
    setConfirmInput(e.target.value);
    setEmailSendComp('');
    if (confirmInput) {
      setConfirmEmailErr('');
    }
  };

  const onCheckEmail = useCallback(
    e => {
      const valiEmail =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const CurrentEmail = e.target.value;
      setUser({ ...user, email: CurrentEmail });

      setIsConfirmEmailBtn(false);

      if (user.email.length === 0) {
        setEmailErr('이메일을 입력해주세요.');
        setIsEmail(false);
      } else if (!valiEmail.test(CurrentEmail)) {
        setEmailErr('이메일 형식이 올바르지 않습니다.');
        setIsEmail(false);
      } else {
        setEmailErr('');
        setIsEmail(true);
      }
    },
    [user],
  );

  const sendEmail = async () => {
    if (user.email.length === 0) {
      setEmailErr('이메일을 입력해주세요.');
      setIsEmail(false);
    } else if (user.email.length > 0) {
      setEmailErr('');
    } else {
      setEmailErr('');
      setIsEmail(true);
    }

    if (isEmail) {
      if (emailVerifyBtnRef.current) {
        emailVerifyBtnRef.current.disabled = true;
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/login/mailConfirm`,
            {
              email: user.email,
            },
          );
          setEmailSendComp('이메일을 전송하였습니다.');
          setConfirmEmail(response.data);
        } catch (error) {
          setEmailErr(error.response.data.message);
          throw error;
        } finally {
          emailVerifyBtnRef.current.disabled = false;
          setIsConfirmEmailBtn(false);
        }
      }
    }
  };

  const checkEmail = () => {
    if (confirmInput && confirmEmail === confirmInput) {
      setConfirmComp('이메일 인증이 완료되었습니다.');
      setConfirmEmailErr('');
      setIsConfirmEmail(true);
    } else {
      setConfirmComp('');
      setConfirmEmailErr('인증 코드를 다시 확인해주세요.');
      setIsConfirmEmail(false);
    }
  };

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

  const googleSignup = async e => {
    e.preventDefault();
    const googleAuthUrl = `${process.env.REACT_APP_API_URL}/oauth2/authorization/google?redirect_uri=${process.env.REACT_APP_API_URL}/login/oauth2/code/google`;
    window.location.href = googleAuthUrl;

    const res = await axios.get(googleAuthUrl);
  };

  const kakaoSignup = async e => {
    e.preventDefault();
    const kakaoAuthUrl = `${process.env.REACT_APP_API_URL}/oauth2/authorization/kakao?redirect_uri=${process.env.REACT_APP_API_URL}/login/oauth2/code/kakao`;
    window.location.href = kakaoAuthUrl;
  };

  const signup = () => {
    return (
      <>
        <form className="px-8" onSubmit={onSignup}>
          <div className="mb-24 flex">
            <Input
              labelText="이메일"
              type="email"
              placeholder="이메일 입력해주세요."
              onChange={onCheckEmail}
              isError={emailErr}
              isComp={emailSendComp}
            />
            <Button
              className="color-yellow btn-size-l ml-8 mt-28 h-50 shrink-0 grow-0"
              ref={emailVerifyBtnRef}
              onClick={() => {
                sendEmail();
                // setIsConfirmEmailBtn(true); sendEmail 함수 안에서 처리 가능, state로 관리하지않아도 됨!
              }}
              disabled={isConfirmEmailBtn}
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
              isComp={confirmComp}
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
            ref={signUpBtnRef}
            // disabled={!(isEmail && isPwd && isConfirmPwd && isConfirmEmail)}
            onClick={onSignup}
          >
            이메일로 회원가입
          </Button>
        </form>
        <div className="login-line">또는</div>
        <div>
          <Button
            className="border-gray btn-size-l mb-16 w-full gap-1.5"
            onClick={kakaoSignup}
          >
            <Kakao />
            카카오 회원가입
          </Button>
          <Button
            className="border-gray btn-size-l w-full gap-1.5"
            onClick={googleSignup}
          >
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
