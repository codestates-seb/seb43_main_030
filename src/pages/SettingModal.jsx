import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import {
  setCurProfile,
  setAuth,
  setActiveIndex,
  setUser,
} from '../actions/areaFilterActions';

import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import { ReactComponent as Close } from '../images/close.svg';

function SettingModal({ onClick, setSettingModal }) {
  const navi = useNavigate();
  const dispatch = useDispatch();

  const [value, setValue] = useState({
    curPassword: '',
    password1: '',
    password2: '',
  });

  // 오류메시지
  const [curPwdErr, setCurPwdErr] = useState('');
  const [newPwdErr, setNewPwdErr] = useState('');
  const [confirmPwdErr, setConfirmPwdErr] = useState('');

  // 유효성검사
  const [isCurPwd, setIsCurPwd] = useState(false);
  const [isNewPwd, setIsNewPwd] = useState(false);
  const [isConfirmPwd, setIsConfirmPwd] = useState(false);

  const handleChangePwd = () => {
    if (!value.curPassword) {
      setCurPwdErr('현재 비밀번호를 입력해주세요.');
      setIsCurPwd(false);
    } else if (value.curPassword) {
      setCurPwdErr('');
      setIsCurPwd(false);
    }

    if (!value.password1) {
      setNewPwdErr('새 비밀번호를 입력해주세요.');
      setIsNewPwd(false);
    }
    if (!value.password2) {
      setConfirmPwdErr('새 비밀번호를 다시 입력해주세요.');
      setIsConfirmPwd(false);
    }

    if (isNewPwd && isConfirmPwd) {
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/api/users`,
          {
            curPassword: value.curPassword,
            password1: value.password1,
            password2: value.password2,
          },
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          },
        )
        .then(res => {
          setCurPwdErr('');
          setNewPwdErr('');
          setIsConfirmPwd('');
          setSettingModal(false);
        })
        .catch(err => {
          console.log(err);
          if (err.response && err.response.status === 400) {
            setCurPwdErr('현재 비밀번호와 일치하지 않습니다.');
          }
          setSettingModal(true);
        });
    }
  };

  // 로그아웃 함수
  const handleLogout = () => {
    dispatch(setAuth(false));
    localStorage.removeItem('token');
    dispatch(setUser([]));
    dispatch(setCurProfile({}));
    dispatch(setActiveIndex(''));
    navi('/');
  };

  // 회원탈퇴
  const handleUserDelete = () => {
    Swal.fire({
      text: '계정을 탈퇴하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FFD337',
      cancelButtonColor: '#ffffff',
      confirmButtonText: '네',
      cancelButtonText: '<span style="color:#000000">아니오<span>',
    }).then(result => {
      if (result.isConfirmed) {
        axios
          .delete(`${process.env.REACT_APP_API_URL}/api/users`, {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          })
          .then(res => {
            handleLogout();
            setSettingModal(false);
            setCurPwdErr('');
            setCurPwdErr('');
            setCurPwdErr('');
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  const onCheckCurPwd = useCallback(
    e => {
      const CurrentPwd = e.target.value;
      setValue({ ...value, curPassword: CurrentPwd });

      if (!CurrentPwd) {
        setCurPwdErr('현재 비밀번호를 입력해주세요.');
        setIsCurPwd(false);
      }
    },
    [value],
  );

  const onCheckNewPwd = useCallback(
    e => {
      const valiPwd = /^[^\s]{8,15}$/;
      const NewPwd = e.target.value;
      setValue({ ...value, password1: NewPwd });

      if (!NewPwd) {
        setNewPwdErr('비밀번호를 입력해주세요.');
        setIsNewPwd(false);
      } else if (!valiPwd.test(NewPwd)) {
        setNewPwdErr('8~15자의 비밀번호를 입력해주세요.');
        setIsNewPwd(false);
      } else {
        setNewPwdErr('');
        setIsNewPwd(true);
      }
    },
    [value],
  );

  const onCheckConfirmPwd = useCallback(
    e => {
      const CurrentConfirmPwd = e.target.value;
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
                  <div className="mb-24">
                    <Input
                      labelText="현재 비밀번호"
                      placeholder="비밀번호를 입력해주세요."
                      type="password"
                      onChange={onCheckCurPwd}
                      isError={curPwdErr}
                    />
                  </div>
                  <div className="mb-24">
                    <Input
                      labelText="새 비밀번호"
                      placeholder="새 비밀번호를 입력해주세요."
                      type="password"
                      onChange={onCheckNewPwd}
                      isError={newPwdErr}
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
                    className="color-yellow btn-size-l mt-16 w-full"
                    // onClick={() => handleChangePwd()}
                    // onClick={onChangePwd}
                    onClick={handleChangePwd}
                  >
                    비밀번호 변경
                  </Button>
                </form>
              </div>
              {/* 사진등록 */}
              <div className="mt-25 flex flex-col  pb-25">
                <Button
                  className="btn-text-default text-black-350"
                  onClick={handleUserDelete}
                >
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
