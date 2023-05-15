import { useState, useEffect } from 'react';
import axios from 'axios';

import UploadImage from '../components/UploadImage';
import Button from '../components/Button/Button';
import RadioGroup from '../components/Radio/RadioGroup';
import Radio from '../components/Radio/Radio';
import Input from '../components/Input/Input';
import InputSelectBox from '../components/Input/InputSelectBox';

import { ReactComponent as Close } from '../images/close.svg';

function ProfileCreateModal(props) {
  const { onClick } = props;

  const [value, setValue] = useState('');
  const [person, setPerson] = useState(true);
  const [bread, setBread] = useState(null);
  const [isSelect, setIsSelect] = useState(true);

  const handleChange = event => {
    setValue(event.target.value);
    console.log(value);
  };

  const handleCheckType = isPerson => {
    setPerson(isPerson);
  };

  // useEffect(() => {
  //   axios.post(`${process.env.REACT_APP_API_URL}/users/profile`, {
  //     name: value,
  //     checkPerson: person,
  //     bread:
  //   })
  // }, [])

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
                  <p className="write-title mb-15 mr-15">프로필 종류</p>
                  <RadioGroup>
                    <Radio
                      id="1"
                      name="contact"
                      onClick={() => handleCheckType(true)}
                      defaultChecked
                    >
                      견주님 프로필
                    </Radio>
                    <Radio
                      id="2"
                      name="contact"
                      onClick={() => handleCheckType(false)}
                    >
                      강아지 프로필
                    </Radio>
                  </RadioGroup>
                </div>
              </div>
              {/* 프로필 사진 등록 */}
              <div className="mt-25 flex flex-col border-b-[1px] border-black-070 pb-24">
                <p className="write-title mb-15 mr-15">프로필 사진 등록</p>
                <UploadImage />
              </div>
              {/* 닉네임 등록 */}
              <div className="mt-25 flex flex-col border-b-[1px] border-black-070 pb-24">
                <p className="write-title mb-15 mr-15">닉네임</p>
                <div className="flex">
                  <Input
                    placeholder="닉네임을 입력해주세요."
                    onChange={handleChange}
                  />
                  {/* <Button className="color-black btn-size-l ml-8 shrink-0">
                    중복 검사
                  </Button> */}
                </div>
              </div>
              {/* 견종 선택 */}
              {!person && (
                <div className="mt-25 flex flex-col pb-24">
                  <p className="write-title mb-15 mr-15">견종 선택</p>
                  <InputSelectBox
                    options="믹스견, 말티즈, 푸들, 포메라니안, 비숑, 웰시코기, 치와와, 폼피츠, 시츄, 골든리트리버, 시바 ,진돗개, 닥스훈트, 달마시안, 도베르만, 말티푸, 보더콜리, 불독, 비글, 사모예드, 슈나우져, 스피치, 요크셔테리어"
                    placeholder="견종을 선택해주세요."
                    width="w-[98%]"
                    className="text-black-200"
                    isSelect={isSelect}
                  />
                </div>
              )}
            </div>
            {/* 버튼 */}
            <Button className="color-yellow btn-size-l absolute bottom-[30px] w-[calc(100%-60px)]">
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
