import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import { useCallback, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import RadioGroup from '../components/Radio/RadioGroup';
import Radio from '../components/Radio/Radio';
import Toast from '../utils/toast';

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
      const valiEmail = /^[a-zA-Z0-9_.-]+$/;
      const CurrentEmail = e.target.value;
      const lastCharactor = CurrentEmail.slice(-1);
      setUser({ ...user, email: CurrentEmail });

      if (user.email.length === 0) {
        setEmailErr('이메일을 입력해주세요.');
        setIsEmail(false);
      } else if (!valiEmail.test(lastCharactor)) {
        e.target.value = CurrentEmail.slice(0, -1);
        setEmailErr('영문, 숫자, _, -, . 만 입력이 가능합니다.');
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
            email: `${user.email}@kakao.com`,
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
          setIsEmail(false);
        })
        .catch(err => {
          if (err.response && err.response.status === 500) {
            setEmailErr('이미 가입되어 있는 이메일입니다.');
          } else {
            Toast.fire({
              title: '계정 저장을 다시 시도해주세요.',
              background: '#DE4F54',
              color: 'white',
            });
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
            <>
              <div className="flex grow gap-2">
                <Input
                  labelText="이메일"
                  type="email"
                  placeholder="이메일 입력해주세요."
                  onChange={onCheckEmail}
                />
                <Input
                  className="mt-26"
                  value="@kakao.com"
                  disabled="@kakao.com"
                />
              </div>
              {emailErr ? (
                <p className="input-text text-red-400">{emailErr}</p>
              ) : (
                ''
              )}
            </>
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
