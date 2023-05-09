import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import { ReactComponent as Kakao } from '../images/logo-kakao.svg';
import { ReactComponent as Google } from '../images/logo-google.svg';

function SignUp() {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const signup = () => {
    return (
      <div>
        <Input
          labelText="아이디"
          placeholder="아이디를 입력해주세요."
          className="mb-24"
        />
        <Input
          labelText="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          className="mb-8"
        />
        <Link to="/find-password">
          <p className="mb-24 text-right text-14 text-black-200">
            비밀번호를 잊으셨나요?
          </p>
        </Link>
        <Button className="color-yellow btn-size-l w-full">로그인</Button>
      </div>
    );
  };

  return (
    <div className="flex-center onlyMobile:login-m-align h-screen bg-black-025 onlyMobile:bg-white">
      <div className="onlyMobile:w-full onlyMobile:px-24" />
      {!isMobile && <div className="login-card">{signup()}</div>}
      {isMobile && <div>{signup()}</div>}
    </div>
  );
}

export default SignUp;
