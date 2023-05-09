import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import { ReactComponent as Kakao } from '../images/logo-kakao.svg';
import { ReactComponent as Google } from '../images/logo-google.svg';

function Login() {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const login = () => {
    return (
      <>
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
          <Link to="/join">
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
