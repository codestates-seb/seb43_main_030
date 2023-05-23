import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setAuth } from '../actions/areaFilterActions';

import UploadImage from '../components/UploadImage';
import Button from '../components/Button/Button';
import RadioGroup from '../components/Radio/RadioGroup';
import Radio from '../components/Radio/Radio';
import Input from '../components/Input/Input';
import Toast from '../utils/toast';
import { ReactComponent as ArrowOpen } from '../images/arrow-open.svg';
import { ReactComponent as ArrowClose } from '../images/arrow-close.svg';
import { ReactComponent as Close } from '../images/close.svg';

function ProfileCreateModal({ onClick, setProfileModal }) {
  const dispatch = useDispatch();
  const navi = useNavigate();

  const [nickname, setNickname] = useState('');
  const [person, setPerson] = useState(true);
  const [breed, setBreed] = useState(null);
  const [image, setImage] = useState('');
  // const fileInput = useRef(null);

  // 오류 메시지
  const [nicknameErr, setNicknameErr] = useState('');
  const [selectErr, setSelectErr] = useState('');

  // select box
  const breedType =
    '믹스견, 말티즈, 푸들, 포메라니안, 비숑, 웰시코기, 치와와, 폼피츠, 시츄, 골든리트리버, 시바, 진돗개, 닥스훈트, 달마시안, 도베르만, 말티푸, 보더콜리, 불독, 비글, 사모예드, 슈나우져, 스피치, 요크셔테리어';
  const breedArr = breedType.split(', ');
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectType, setSelectType] = useState('견종을 선택해주세요.');
  const [focus, setFocus] = useState(false);

  // const [selectFile, setSelectFile] = useState(null);

  const typeActive = index => {
    setActiveIndex(index);
    setSelectType(breedArr[index]);
    setFocus(false);
    setBreed(String(breedArr[index]));
  };

  const getUsers = () => {
    if (localStorage.getItem('token')) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/users/profile`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        })
        .then(res => {
          dispatch(setUser(res.data));
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const handleTypeClick = () => {
    setFocus(!focus);
  };

  const handleChange = e => {
    setNickname(e.target.value.trim());
  };

  const handleCheckPerson = isPerson => {
    setPerson(isPerson);
    setNicknameErr('');
    setSelectErr('');
    setNickname('');
    setBreed(null);
    setSelectType('견종을 선택해주세요.');
  };

  const handlePostProfile = () => {
    if (!nickname || !breed) {
      setNicknameErr(!nickname ? '닉네임을 입력해주세요.' : '');
      setSelectErr(!breed ? '견종을 선택해주세요.' : '');
    }
    const selectedBreed = person ? null : breed;

    const formData = new FormData();
    const data = {
      name: nickname,
      checkPerson: person,
      breed: selectedBreed,
    };
    formData.append('image', image);
    formData.append(
      'postDto',
      new Blob([JSON.stringify(data)], { type: 'application/json' }),
    );

    if (person && nickname) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/users/profile`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: localStorage.getItem('token'),
          },
        })
        .then(res => {
          getUsers();
          setNicknameErr('');
          setSelectErr('');
          setProfileModal(false);
          Toast.fire({
            title: '프로필 생성이 완료되었습니다.',
            background: '#25B865',
            color: 'white',
          });
        })
        .catch(err => {
          if (err.response?.status === 401) {
            Swal.fire({
              toast: true,
              icon: 'error',
              text: '토큰이 만료되었습니다. 재로그인 해주세요❗️',
              confirmButtonColor: '#FFD337',
            });
            dispatch(setAuth(false));
            localStorage.removeItem('token');
            navi('/login');
          } else {
            Toast.fire({
              title: '프로필 생성을 다시 시도해주세요.',
              background: '#DE4F54',
              color: 'white',
            });
            setProfileModal(true);
          }
        });
    } else if (!person && nickname && breed) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/users/profile`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: localStorage.getItem('token'),
          },
        })
        .then(res => {
          getUsers();
          setNicknameErr('');
          setSelectErr('');
          setProfileModal(false);
          Toast.fire({
            title: '프로필 생성이 완료되었습니다.',
            background: '#25B865',
            color: 'white',
          });
        })
        .catch(err => {
          if (err.response && err.response.status === 401) {
            Swal.fire({
              icon: 'error',
              text: '토큰이 만료되었습니다. 재로그인 해주세요❗️',
              confirmButtonColor: '#FFD337',
            });
            dispatch(setAuth(false));
            localStorage.removeItem('token');
            navi('/login');
          } else {
            Toast.fire({
              title: '프로필 생성을 다시 시도해주세요.',
              background: '#DE4F54',
              color: 'white',
            });
            setProfileModal(true);
          }
        });
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="fixed top-[10px] z-40 my-80 h-[calc(100vh-160px)] w-608 rounded-[16px] bg-white onlyMobile:top-0 onlyMobile:my-0 onlyMobile:h-full onlyMobile:w-full onlyMobile:rounded-0">
          <div className="relative flex h-full flex-col p-30">
            <div className=" w-full shrink-0">
              <div className="relative flex justify-center">
                <p className="write-title">프로필 추가하기</p>
                <button
                  type="button"
                  className="absolute right-0 top-[-4px]"
                  onClick={onClick}
                >
                  <Close />
                </button>
              </div>
            </div>
            {/* 프로필 종류 */}
            <div className="mb-30 h-full overflow-y-scroll">
              <div className="mt-25 flex items-center border-b-[1px] border-black-070">
                <div className="mb-24 flex flex-col">
                  <p className="write-title mb-16 mr-16">프로필 종류</p>
                  <RadioGroup>
                    <Radio
                      id="1"
                      name="contact"
                      onClick={() => handleCheckPerson(true)}
                      defaultChecked
                    >
                      견주님 프로필
                    </Radio>
                    <Radio
                      id="2"
                      name="contact"
                      onClick={() => handleCheckPerson(false)}
                    >
                      강아지 프로필
                    </Radio>
                  </RadioGroup>
                </div>
              </div>
              {/* 프로필 사진 등록 */}
              <div className="mt-25 flex flex-col border-b-[1px] border-black-070 pb-24">
                <p className="write-title mb-15 mr-15">프로필 사진 등록</p>
                <UploadImage setImage={setImage} image={image} />
              </div>
              {/* 닉네임 등록 */}
              <div className="mt-25 flex flex-col border-b-[1px] border-black-070 pb-24">
                <p className="write-title mb-16 mr-16">닉네임 (필수)</p>
                <div className="flex">
                  <Input
                    placeholder="닉네임을 입력해주세요."
                    // value={nickname}
                    onChange={handleChange}
                    isError={nicknameErr}
                    value={nickname}
                  />
                </div>
              </div>
              {/* 견종 선택 */}
              {!person && (
                <div className="mt-25 flex flex-col pb-24">
                  <p className="write-title mb-16 mr-16">견종 선택 (필수)</p>
                  {/* select box */}
                  <div className="relative flex flex-col">
                    <button
                      onClick={handleTypeClick}
                      type="button"
                      className="input-default input-select-default w-[98%]"
                      placeholder="견종을 선택해주세요."
                    >
                      {selectType}
                      {focus ? <ArrowClose /> : <ArrowOpen />}
                    </button>
                    {!breed && (
                      <span className="mt-8 text-12 text-red-400">
                        {selectErr}
                      </span>
                    )}
                    {focus && (
                      <div className="dropdown-box top-[58px] z-50 w-[98%] text-black-900">
                        <ul className="ul profile dropdown-ul">
                          {breedArr.map((el, idx) => {
                            const activeClass =
                              activeIndex === idx ? 'font-bold' : '';

                            return (
                              <li
                                // key={`profile${idx}`}
                                id={idx}
                                className={`li profile${idx} w-full cursor-pointer p-12 text-14 ${activeClass} rounded-lg hover:bg-black-025`}
                                onClick={() => typeActive(idx)}
                                role="presentation"
                              >
                                {el}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            {/* 버튼 */}
            <Button
              className="color-yellow btn-size-l absolute bottom-[30px] w-[calc(100%-60px)]"
              onClick={() => handlePostProfile()}
            >
              프로필 등록하기
            </Button>
          </div>
        </div>
      </div>
      <div className="fixed left-0 top-0 z-30 h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.7)] onlyMobile:hidden" />
    </>
  );
}
export default ProfileCreateModal;
