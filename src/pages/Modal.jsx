import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Dog from '../images/dog.jpeg';
import RatingStar from '../components/RatingStar';
import TextArea from '../components/TextArea';
import UploadImage from '../components/UploadImage';
import Button from '../components/Button/Button';
import profile from '../images/profile.png';
import { ReactComponent as Star } from '../images/star-on.svg';
import { ReactComponent as Close } from '../images/close.svg';

function Modal(props) {
  const { onClick } = props;
  const [text, setText] = useState('');
  const [kinderInfo, setKinderInfo] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [starIndex, setStarIndex] = useState(0);

  const handleStarIndexChange = useCallback(index => {
    setStarIndex(index);
  }, []);

  const textCount = event => {
    setText(event.target.value);
  };

  // replace
  useEffect(() => {
    axios
      .get(`${apiUrl}/kindergarten/1`)
      .then(response => {
        setKinderInfo(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [apiUrl]);

  const submitReview = () => {
    if (!text || !starIndex) {
      alert('내용과 별점을 입력해주세요.');
    }

    const formData = new FormData();
    formData.append('images', null);

    const data = {
      content: text,
      ratedReview: starIndex,
    };

    formData.append(
      'postDto',
      new Blob([JSON.stringify(data)], { type: 'application/json' }),
    );

    axios
      .post(`${apiUrl}/review/1`, formData, {
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  const handleEdit = () => {};
  const handleDelete = () => {};

  return (
    <>
      <div className="flex justify-center">
        <div className="fixed top-[10px] z-[101] my-80 h-[calc(100vh-160px)] w-608 rounded-[16px] bg-white onlyMobile:top-0 onlyMobile:my-0 onlyMobile:h-full onlyMobile:w-full onlyMobile:rounded-0">
          <div className="relative flex h-full flex-col p-30">
            <div className=" w-full shrink-0">
              {/* 후기 작성하기 */}
              <div className="relative flex justify-center">
                <p className="write-title">후기 작성하기</p>
                <button
                  type="button"
                  className="absolute right-0 top-[-4px]"
                  onClick={onClick}
                >
                  <Close />
                </button>
              </div>

              {/* 유치원 정보 */}
              <div className="mt-25 flex border-b-[1px] border-black-070 pb-25">
                <div className="user-profile mr-15 h-116 w-116 onlyMobile:h-96 onlyMobile:w-96">
                  {kinderInfo.image ? (
                    <img src={kinderInfo.profileImageUrl} alt="img" />
                  ) : (
                    <img src={profile} alt="defaultImage" />
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <p className="write-title">
                    {kinderInfo.name &&
                      kinderInfo.name.slice().replace(/"/g, '')}
                  </p>
                  <p className="flex items-center text-14">
                    <Star /> {kinderInfo.ratedReviewsAvg} (
                    {kinderInfo.ratedReviewsCount})
                  </p>
                  <p className="mt-6 text-14">
                    {kinderInfo.locations &&
                      kinderInfo.locations.slice().replace(/"/g, '')}
                  </p>
                </div>
              </div>
            </div>
            {/* 별점 */}
            <div className="mb-30 overflow-y-scroll">
              <div className="mt-25 flex items-center border-b-[1px] border-black-070 pb-25">
                <p className="write-title mr-15">유치원은 어떠셨나요?</p>
                <RatingStar handleStarIndexChange={handleStarIndexChange} />
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
                  className="flex flex-col items-end p-15"
                  textClass="h-80"
                />
              </div>
              {/* 사진등록 */}
              <div className="mt-25 flex flex-col pb-25">
                <p className="write-title mb-15 mr-15">사진을 등록해주세요.</p>
                <div className="flex">
                  <UploadImage />
                  <UploadImage />
                  <UploadImage />
                  <UploadImage />
                </div>
              </div>
              {/* 수정 삭제 */}
              <div className="mr-10 mt-25 flex flex-col pb-40">
                <div className="flex justify-end">
                  <button
                    className="mr-15 text-14 text-black-350 onlyMobile:text-12"
                    type="button"
                    onClick={handleEdit}
                  >
                    수정
                  </button>
                  <button
                    className="text-14 text-black-350 onlyMobile:text-12"
                    type="button"
                    onClick={handleDelete}
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
            {/* 버튼 */}
            <Button
              onClick={submitReview}
              className="color-yellow btn-size-l absolute bottom-[30px] w-[calc(100%-60px)]"
            >
              후기 등록하기
            </Button>
          </div>
        </div>
      </div>
      <div className="fixed left-0 top-0 z-[100] h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.7)] onlyMobile:hidden" />
    </>
  );
}
export default Modal;
