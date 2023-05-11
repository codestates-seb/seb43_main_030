import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Dog from '../images/dog.jpeg';
import RatingStar from '../components/RatingStar';
import TextArea from '../components/TextArea';
import UploadImage from '../components/UploadImage';
import Button from '../components/Button/Button';
import { ReactComponent as ArrowNext } from '../images/arrow-next.svg';
import { ReactComponent as ArrowPrev } from '../images/arrow-prev.svg';
import { ReactComponent as Star } from '../images/star-on.svg';

function Modal() {
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const textCount = event => {
    setText(event.target.value);
  };

  return (
    <>
      <div className="flex-center flex">
        <div className="z-[101] my-80 h-[calc(100vh-160px)] w-608 rounded-[16px] bg-white">
          <div className="relative h-full p-30">
            {/* 후기 작성하기 */}
            <div className="relative flex justify-center">
              <p className="write-title">후기 작성하기</p>
              <button type="button" className="absolute right-0 top-[-4px]">
                X
              </button>
            </div>

            {/* 유치원 정보 */}
            <div className="mt-25 flex border-b-[1px] border-black-070 pb-25">
              <div className="user-profile mr-15 h-116 w-116">
                <img src={Dog} alt="임시 이미지" />
              </div>
              <div className="flex flex-col justify-center">
                <p className="write-title">놀펫 강아지 어쩌구 유치원</p>
                <p className="flex items-center text-14">
                  <Star /> 4.3 (12)
                </p>
                <p className="mt-6 text-14">주소주소 성수동 어쩌구</p>
              </div>
            </div>
            {/* 별점 */}
            <div className="mt-25 flex items-center border-b-[1px] border-black-070 pb-25">
              <p className="write-title mr-15">유치원은 어떠셨나요?</p>
              <RatingStar />
            </div>
            {/* 후기 */}
            <div className="mt-25 flex flex-col border-b-[1px] border-black-070 pb-25">
              <p className="write-title mb-15 mr-15">
                솔직한 후기를 남겨주세요.
              </p>
              <TextArea
                areaClass="h-135 py-20 "
                value={text}
                onChange={textCount}
                maxLength="200"
                placeholder="후기를 남겨주세요."
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
            {/* 버튼 */}
            <Button className="color-yellow btn-size-l absolute bottom-[30px] w-[calc(100%-60px)]">
              후기 등록하기
            </Button>
          </div>
        </div>
      </div>
      <div className="fixed left-0 top-0 z-[100] h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.7)]" />
    </>
  );
}
export default Modal;
