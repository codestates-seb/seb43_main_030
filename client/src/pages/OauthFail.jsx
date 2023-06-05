import { useNavigate } from 'react-router-dom';
import NoList from '../images/perpett-nolist.png';
import Button from '../components/Button/Button';

function OauthFail() {
  const navi = useNavigate();

  const moveLogin = () => {
    navi('/login');
  };

  const moveFindPwd = () => {
    navi('/find-password');
  };

  return (
    <div className="flex-center relative h-[80vh] min-h-[600px] flex-col">
      <div className="flex-center mt-80 h-640 w-[100%] max-w-[1440px] flex-col px-80">
        <img src={NoList} alt="NoList" className="h-160 w-160" />
        <div className="flex-center h-70 text-56 font-black text-yellow-500">
          500
        </div>
        <div className="mt-24 flex flex-col items-center justify-center text-16 text-black-350">
          <p>이미 가입한 이력이 있는 아이디입니다.</p>
          <p>비밀번호가 기억나지 않으시는 경우 비밀번호 찾기를 진행해주세요!</p>
          <div className="mt-80 flex gap-4">
            <Button
              className="border-gray btn-size-l shrink-0 onlyMobile:mt-16"
              onClick={moveFindPwd}
            >
              비밀번호 변경하기
            </Button>
            <Button
              className="color-yellow btn-size-l shrink-0 onlyMobile:mt-16"
              onClick={moveLogin}
            >
              로그인 바로가기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OauthFail;
