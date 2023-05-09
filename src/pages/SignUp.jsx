import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import RadioGroup from '../components/Radio/RadioGroup';
import Radio from '../components/Radio/Radio';
import { ReactComponent as Kakao } from '../images/logo-kakao.svg';
import { ReactComponent as Google } from '../images/logo-google.svg';

function SignUp() {
  const [value, setValue] = useState('user');

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const signup = () => {
    return (
      <>
        <div className="px-8">
          <div className="mb-24 flex items-end">
            <Input
              labelText="아이디"
              placeholder="아이디를 입력해주세요."
              className="grow"
            />
            <Button className="color-yellow btn-size-l ml-8 h-50 shrink-0 grow-0">
              인증번호 전송
            </Button>
          </div>
          <div className="mb-24 flex items-end">
            <Input
              labelText="인증번호"
              placeholder="인증번호를 입력해주세요."
              className="grow"
            />
            <Button className="color-yellow btn-size-l ml-8 h-50 shrink-0 grow-0">
              인증번호 확인
            </Button>
          </div>
          <div className="mb-24 flex flex-col">
            <p className="mb-8 text-left text-14 text-black-350">
              생성 계정 선택
            </p>
            <RadioGroup>
              <Radio id="1" name="contact" value="user" defaultChecked>
                견주님
              </Radio>
              <Radio id="2" name="contact" value="owner">
                유치원 원장님
              </Radio>
            </RadioGroup>
          </div>
          <Input
            labelText="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            className="mb-24"
          />
          <Input
            labelText="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해주세요."
            className="mb-24"
          />
          <Button className="color-yellow btn-size-l w-full">
            이메일로 회원가입
          </Button>
        </div>
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
