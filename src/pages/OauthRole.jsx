import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import { useCallback, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import RadioGroup from '../components/Radio/RadioGroup';
import Radio from '../components/Radio/Radio';

function OauthRole() {
  const navi = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const [user, setUser] = useState({
    email: '',
    checkTeacher: '',
  });

  const [officials, setOfficials] = useState(false);

  const [emailErr, setEmailErr] = useState('');
  const [isEmail, setIsEmail] = useState(false);

  const handleOfficialsClick = value => () => {
    setOfficials(value);
  };

  const url = new URL(window.location.href);
  const authorization = url.searchParams.get('Authorization');
  const userEmail = url.searchParams.get('email');

  const onCheckEmail = useCallback(
    e => {
      const valiEmail =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const CurrentEmail = e.target.value;
      setUser({ ...user, email: CurrentEmail });

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

  const onRoleChange = e => {
    e.preventDefault();
    onCheckEmail(e);

    if (isEmail) {
      setEmailErr('');

      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/api/users/oauthInit`,
          {
            email: user.email,
            checkOfficials: officials,
          },
          {
            headers: {
              Authorization: authorization,
            },
          },
        )
        .then(res => {
          navi('/login');
          console.log(res);
          setIsEmail(false);
        })
        .catch(err => {
          console.log(err);
          if (err.response && err.response.status === 500) {
            setEmailErr('이미 가입되어 있는 이메일입니다.');
          }
        });
    }

    if (userEmail) {
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/api/users/oauthInit`,
          {
            checkOfficials: officials,
          },
          {
            headers: {
              Authorization: authorization,
            },
          },
        )
        .then(res => {
          navi('/login');
          console.log(res);
          setIsEmail(false);
        })
        .catch(err => {
          console.log(err);
          if (err.response && err.response.status === 500) {
            setEmailErr('이미 가입되어 있는 이메일입니다.');
          }
        });
    }
  };

  const oauthrole = () => {
    return (
      <form className="px-8" onSubmit={onRoleChange}>
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
          {!userEmail ? (
            <Input
              labelText="이메일"
              type="email"
              placeholder="이메일 입력해주세요."
              onChange={onCheckEmail}
              isError={emailErr}
            />
          ) : (
            <Input
              labelText="이메일"
              type="email"
              placeholder="이메일 입력해주세요."
              value={userEmail}
              disabled={userEmail}
            />
          )}
        </div>
        <Button
          className="color-yellow btn-size-l w-full"
          // disabled={!(isEmail && isPwd && isConfirmPwd && isConfirmEmail)}
          onClick={onRoleChange}
        >
          계정 정보 저장하기
        </Button>
      </form>
    );
  };

  return (
    <div className="flex-center onlyMobile:login-m-align h-screen bg-black-025 onlyMobile:bg-white">
      <div className="mt-80 onlyMobile:w-full onlyMobile:px-24">
        {!isMobile ? (
          <div className="login-card">{oauthrole()}</div>
        ) : (
          <div>{oauthrole()}</div>
        )}
      </div>
    </div>
  );
}

export default OauthRole;
