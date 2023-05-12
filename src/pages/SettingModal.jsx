import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Input from '../components/Input/Input';
import UploadImage from '../components/UploadImage';
import Button from '../components/Button/Button';
import { ReactComponent as Close } from '../images/close.svg';

function SettingModal(props) {
  const { onClick } = props;

  const [value, setValue] = useState('');
  const [curPw, setCurPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [errCfPw, setErrCfPw] = useState('');
  const [errCurPw, setErrPw] = useState('');
  const [check, setCheck] = useState(true);

  const handleChange = e => {
    setValue(e.target.value);
  };

  // function patchPw() {
  //   if (!loginData.email) {
  //     setErrId('아이디를 입력하세요.');
  //     setErrPw('');
  //     setCheck(false);
  //     return;
  //   }
  //   if (!loginData.password) {
  //     setErrId('');
  //     setErrPw('비밀번호를 입력하세요.');
  //     setCheck(false);
  //     return;
  //   }

  //   axios
  //     .patch(`${process.env.REACT_APP_API_URL}/users`, {
  //       email: loginData.email,
  //       password: loginData.password,
  //     })
  //     .then(res => {
  //       setErrId('');
  //       setErrPw('');
  //       localStorage.setItem('token', res.headers.get('Authorization'));
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       setCheck(false);
  //       setErrId('이메일 또는 패스워드가 올바르지 않습니다.');
  //     });
  // }

  return (
    <>
      <div className="flex justify-center">
        <div className="fixed top-[10px] z-[101] my-80 h-[calc(100vh-160px)] w-608 rounded-[16px] bg-white onlyMobile:top-0 onlyMobile:my-0 onlyMobile:h-full onlyMobile:w-full onlyMobile:rounded-0">
          <div className="relative flex h-full flex-col p-30">
            <div className=" w-full shrink-0">
              <div className="relative flex justify-center">
                <p className="write-title">계정 설정</p>
                <button
                  type="button"
                  className="absolute right-0 top-[-4px]"
                  onClick={onClick}
                >
                  <Close />
                </button>
              </div>
            </div>

            {/* 비밀번호 변경 */}
            <div className="mb-30 overflow-y-scroll">
              <div className="mt-25 flex flex-col border-b-[1px] border-black-070 pb-25">
                <p className="write-title mb-15 mr-15">비밀번호 변경</p>
                <form onSubmit={e => e.preventDefault()}>
                  <Input
                    labelText="현재 비밀번호"
                    placeholder="비밀번호를 입력해주세요."
                    type="password"
                    value={value}
                    onChange={handleChange}
                  />
                  <Input
                    labelText="새 비밀번호"
                    placeholder="새 비밀번호를 입력해주세요."
                    type="password"
                    value={value}
                    onChange={handleChange}
                    className="mt-16"
                  />
                  <Input
                    labelText="새 비밀번호 확인"
                    placeholder="비밀번호를 다시 입력해주세요."
                    type="password"
                    value={value}
                    onChange={handleChange}
                    className="mt-16"
                  />
                  <Button
                    className="color-yellow btn-size-l mt-16 w-full"
                    // onClick={() => loginFunc()}
                  >
                    비밀번호 변경
                  </Button>
                </form>
              </div>
              {/* 사진등록 */}
              <div className="mt-25 flex flex-col  pb-25">
                <Button className="btn-text-default text-black-350">
                  회원탈퇴하기
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed left-0 top-0 z-[100] h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.7)] onlyMobile:hidden" />
    </>
  );
}
export default SettingModal;
