import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import RadioGroup from '../components/Radio/RadioGroup';
import Radio from '../components/Radio/Radio';
import { ReactComponent as Kakao } from '../images/logo-kakao.svg';
import { ReactComponent as Google } from '../images/logo-google.svg';

function FindPw() {
  const [value, setValue] = useState('user');

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const findPassword = () => {
    return (
      <>
        <p className="mb-24 text-28 font-bold onlyMobile:mb-32 onlyMobile:text-22">
          비밀번호 찾기
        </p>
        <div className="px-8">
          <div className="mb-24 flex items-end">
            <Input labelText="이메일" placeholder="이메일을 입력해주세요." />
            <Button className="color-yellow btn-size-l ml-8 h-50 shrink-0 grow-0">
              인증번호 전송
            </Button>
          </div>
          <div className="mb-24 flex items-end">
            <Input
              labelText="인증번호"
              placeholder="인증번호를 입력해주세요."
            />
            <Button className="color-yellow btn-size-l ml-8 h-50 shrink-0 grow-0">
              인증번호 확인
            </Button>
          </div>
          <Input
            labelText="새 비밀번호"
            placeholder="비밀번호를 입력해주세요."
            className="mb-24"
          />
          <Input
            labelText="새 비밀번호 확인"
            placeholder="비밀번호를 다시 입력해주세요."
            className="mb-24"
          />
          <Button className="color-yellow btn-size-l w-full">
            비밀번호 변경
          </Button>
        </div>
      </>
    );
  };

  return (
    <div className="flex-center onlyMobile:login-m-align h-screen bg-black-025 onlyMobile:bg-white">
      <div className="mt-80 onlyMobile:w-full onlyMobile:px-24">
        {isMobile ? (
          <div>{findPassword()}</div>
        ) : (
          <div className="login-card">{findPassword()}</div>
        )}
      </div>
    </div>
  );
}

export default FindPw;
