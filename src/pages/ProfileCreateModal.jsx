import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Dog from '../images/dog.jpeg';
import Input from '../components/Input/Input';
import RatingStar from '../components/RatingStar';
import TextArea from '../components/TextArea';
import UploadImage from '../components/UploadImage';
import Button from '../components/Button/Button';
import { ReactComponent as Star } from '../images/star-on.svg';
import { ReactComponent as Close } from '../images/close.svg';

function ProfileCreateModal(props) {
  const { onClick } = props;

  const [value, setValue] = useState('');

  const handleChange = e => {
    setValue(e.target.value);
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="fixed top-[10px] z-[101] my-80 h-[calc(100vh-160px)] w-608 rounded-[16px] bg-white onlyMobile:top-0 onlyMobile:my-0 onlyMobile:h-full onlyMobile:w-full onlyMobile:rounded-0">
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

            {/* 비밀번호 변경 */}
            <div className="mb-30 overflow-y-scroll">
              <div className="mt-25 flex flex-col border-b-[1px] border-black-070 pb-25">
                <p className="write-title mb-15 mr-15">비밀번호 변경</p>
                <Input
                  labelText="현재 비밀번호"
                  placeholder="비밀번호를 입력해주세요."
                  type="password"
                  value={value}
                  onChange={handleChange}
                />
                <Input
                  labelText="현재 비밀번호"
                  placeholder="비밀번호를 입력해주세요."
                  type="password"
                  value={value}
                  onChange={handleChange}
                />
                <Input
                  labelText="현재 비밀번호"
                  placeholder="비밀번호를 입력해주세요."
                  type="password"
                  value={value}
                  onChange={handleChange}
                />
              </div>
              {/* 사진등록 */}
              <div className="mt-25 flex flex-col  pb-25">
                <p className="write-title mb-15 mr-15">사진을 등록해주세요.</p>
                <div className="flex">
                  <UploadImage />
                  <UploadImage />
                  <UploadImage />
                  <UploadImage />
                </div>
              </div>
            </div>
            {/* 버튼 */}
            <Button className="color-yellow btn-size-l absolute bottom-[30px] w-[calc(100%-60px)]">
              후기 등록하기
            </Button>
          </div>
        </div>
      </div>
      <div className="fixed left-0 top-0 z-[100] h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.7)] onlyMobile:hidden" />
    </>
  );
}
export default ProfileCreateModal;
