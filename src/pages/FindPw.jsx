import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';

function FindPw() {
  const navi = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const [value, setValue] = useState({
    email: '',
    password1: '',
    password2: '',
  });

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
  const [isConrirmEmailBtn, setIsConfirmEmailBtn] = useState(false);
  const [isConfirmEmail, setIsConfirmEmail] = useState(false);

  const handleConfirmEmail = e => {
    setConfirmInput(e.target.value);
    // setEmailSendComp('');
    setConfirmComp('');
    if (confirmInput) {
      setConfirmEmailErr('');
    }
  };

  const onCheckEmail = useCallback(
    e => {
      const valiEmail =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const CurrentEmail = e.target.value;
      setValue({ ...value, email: CurrentEmail });

      setIsConfirmEmailBtn(false);

      if (value.email.length === 0) {
        setEmailErr('이메일을 입력해주세요.');
        setEmailSendComp('');
        setIsEmail(false);
      } else if (!valiEmail.test(CurrentEmail)) {
        setEmailErr('이메일 형식이 올바르지 않습니다.');
        setEmailSendComp('');
        setIsEmail(false);
      } else {
        setEmailErr('');
        setEmailSendComp('');
        setIsEmail(true);
      }
    },
    [value],
  );

  const onCheckPwd = useCallback(
    e => {
      const valiPwd = /^[^\s]{8,15}$/;
      const CurrentPwd = e.target.value;
      setValue({ ...value, password1: CurrentPwd });

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
    [value],
  );

  const onCheckConfirmPwd = useCallback(
    e => {
      const CurrentConfirmPwd = e.target.value;
      setConfirmPwd(CurrentConfirmPwd);
      setValue({ ...value, password2: CurrentConfirmPwd });

      if (value.password1 === CurrentConfirmPwd) {
        setConfirmPwdErr('');
        setIsConfirmPwd(true);
      } else {
        setConfirmPwdErr('비밀번호를 다시 확인해주세요.');
        setIsConfirmPwd(false);
      }
    },
    [value],
  );

  const sendEmail = () => {
    if (value.email.length === 0) {
      setEmailErr('이메일을 입력해주세요.');
      setIsEmail(false);
    } else {
      setEmailErr('');
      setIsEmail(true);
    }

    if (isEmail) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/login/findPassword`, {
          email: value.email,
        })
        .then(res => {
          console.log('메일전송:', res);
          setEmailSendComp('이메일을 전송하였습니다.');
          setConfirmEmail(res.data);
        })
        .catch(err => {
          console.log(err);
          setIsConfirmEmailBtn(false);
          if (err.response && err.response.status === 404) {
            setEmailErr(err.response.message);
          }
        });
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

  const onChangePwd = e => {
    e.preventDefault();
    onCheckEmail(e);
    onCheckPwd(e);
    onCheckConfirmPwd(e);
    checkEmail(e);

    if (!confirmInput) {
      setConfirmEmailErr('인증 코드를 입력해주세요.');
      setIsConfirmEmail(false);
    }

    if (isEmail && isPwd && isConfirmPwd && isConfirmEmail) {
      console.log(value);

      setEmailErr('');
      setPwdErr('');
      setConfirmPwdErr('');
      setConfirmEmailErr('');
      setEmailSendComp('');
      setConfirmComp('');

      axios
        .patch(`${process.env.REACT_APP_API_URL}/api/users/resetPassword`, {
          email: value.email,
          password1: value.password1,
          password2: value.password2,
        })
        .then(res => {
          navi('/login');
          console.log(res);
        })
        .catch(err => {
          console.log(err);
          if (err.response && err.response.status === 404) {
            setEmailErr(err.response.message);
          }
        });
    }
  };

  const findPassword = () => {
    return (
      <>
        <p className="mb-24 text-28 font-bold onlyMobile:mb-32 onlyMobile:text-22">
          비밀번호 찾기
        </p>
        <form className="px-8" onSubmit={onChangePwd}>
          <div className="mb-24 flex">
            <Input
              labelText="이메일"
              type="email"
              placeholder="이메일을 입력해주세요."
              onChange={onCheckEmail}
              isError={emailErr}
              isComp={emailSendComp}
            />
            <Button
              className="color-yellow btn-size-l ml-8 mt-28 h-50 shrink-0 grow-0"
              onClick={() => {
                setIsConfirmEmailBtn(true);
                sendEmail();
              }}
              disabled={isConrirmEmailBtn}
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
          <div className="mb-24">
            <Input
              labelText="새 비밀번호"
              placeholder="비밀번호를 입력해주세요."
              type="password"
              onChange={onCheckPwd}
              isError={pwdErr}
            />
          </div>
          <div className="mb-24">
            <Input
              labelText="새 비밀번호 확인"
              placeholder="비밀번호를 다시 입력해주세요."
              type="password"
              onChange={onCheckConfirmPwd}
              isError={confirmPwdErr}
            />
          </div>
          <Button
            className="color-yellow btn-size-l w-full"
            onClick={onChangePwd}
          >
            비밀번호 변경
          </Button>
        </form>
        <div className="login-line px-8">로그인</div>

        <div className="px-8">
          <Link to="/login">
            <Button className="border-gray btn-size-l mb-16 w-full gap-1.5">
              로그인 바로가기
            </Button>
          </Link>
        </div>
      </>
    );
  };

  return (
    <div className="flex-center onlyMobile:login-m-align h-screen bg-black-025 onlyMobile:bg-white">
      <div className="mt-80 onlyMobile:w-full onlyMobile:px-24">
        {!isMobile ? (
          <div className="login-card">{findPassword()}</div>
        ) : (
          <div>{findPassword()}</div>
        )}
        {/* <div className="flex-center mt-32">
          <p className="mr-24 text-14 text-black-200 onlyMobile:text-12">
            비밀번호가 생각나셨나요?
          </p>
          <Link to="/login">
            <p className="text-14 text-black-900 onlyMobile:text-12">
              로그인 바로가기
            </p>
          </Link>
        </div> */}
      </div>
    </div>
  );
}

export default FindPw;
