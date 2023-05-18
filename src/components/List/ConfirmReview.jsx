import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Dog from '../../images/dog.jpeg';
import RatingStar from '../RatingStar';
import dateCalculate from '../dateCalculate';
import TextArea from '../TextArea';
import UploadImage from '../UploadImage';
import Button from '../Button/Button';
import profile from '../../images/profile.png';
import { ReactComponent as Star } from '../../images/star-on.svg';
import { ReactComponent as Close } from '../../images/close.svg';
import { ReactComponent as StarOff } from '../../images/star-off.svg';

function ConfirmReview({ offReviewModal, kinderInfo, kinderData }) {
  const [text, setText] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;
  const [starIndex, setStarIndex] = useState(0);

  const starScore = () => {
    const ratedStar = Math.floor(kinderInfo.ratedReview);
    const ratingStar = [];

    for (let i = 1; i <= 5; i += 1) {
      if (i <= ratedStar) {
        ratingStar.push(<Star key={i} />);
      } else {
        ratingStar.push(<StarOff key={i} />);
      }
    }
    return ratingStar.map(star => star);
  };

  const handleStarIndexChange = useCallback(index => {
    setStarIndex(index);
  }, []);

  const textCount = event => {
    setText(event.target.value);
  };
  // replace
  // useEffect(() => {
  //   axios
  //     .get(`${apiUrl}/kindergarten/1`)
  //     .then(response => {
  //       setKinderInfo(response.data.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, [apiUrl]);

  console.log(kinderInfo);

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

  const deleteReview = () => {
    const result = window.confirm('리뷰를 삭제하시겠습니까?');
    if (result) {
      axios
        .delete(`${apiUrl}/review/${kinderInfo.reviewId}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        })
        .then(response => window.location.reload())
        .catch(error => console.log(error));
    }
  };

  const handleEdit = () => {};
  const handleDelete = () => {};

  return (
    <div className="flex w-full justify-center">
      <div className="fixed top-[10px] z-[101] my-80 h-[calc(100vh-160px)] w-608 rounded-[16px] bg-white onlyMobile:top-0 onlyMobile:my-0 onlyMobile:h-full onlyMobile:w-full onlyMobile:rounded-0">
        <div className="relative flex h-full w-[100%] flex-col p-30">
          <div className=" w-full shrink-0">
            <div className="relative flex justify-center">
              <button
                type="button"
                className="absolute right-0 top-[-4px]"
                onClick={() => offReviewModal()}
              >
                <Close />
              </button>
            </div>
            <div className="mt-30 flex w-600">
              <div className="mr-24 w-full">
                <div className="flex w-full items-center justify-between">
                  <div className="flex w-full">
                    <div className="list-user-image mr-16" />
                    <div className="flex w-full flex-col">
                      <div className="flex items-center gap-2">
                        <p className="text-16 font-bold onlyMobile:text-14">
                          {kinderInfo.profileName}
                        </p>
                        <p className="text-14 text-black-350 onlyMobile:text-12">
                          이메일 자리입니다.
                        </p>
                      </div>
                      <div className="flex w-full items-center justify-between">
                        <div className="star flex">{starScore()}</div>
                        <p className="list-gray-small pr-[10%]">
                          {dateCalculate(kinderInfo.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="list-content h-text-max mt-16 max-h-[50px]">
                  {kinderInfo.contents}
                </p>
              </div>
              {kinderInfo.imageUrl ? (
                <img src={kinderInfo.imageUrl} alt="img" />
              ) : (
                ''
              )}
            </div>

            <div className="overflow-y-scroll">
              <div className="mt-25 flex items-center border-b-[1px] border-black-070 pb-25">
                <p className="write-title mr-15">{kinderInfo.content}</p>
              </div>

              <div className="mt-25 flex flex-col pb-25">
                {kinderInfo.ratedReview === null ? (
                  <img src={kinderInfo.reviewImgUrl} alt="dog" />
                ) : (
                  <img src={Dog} alt="dog" />
                )}
              </div>
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
                    onClick={deleteReview}
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
            <div className="mb-25 flex border-t-[1px] border-black-070 pt-25">
              <div className="user-profile mr-15 h-116 w-116 onlyMobile:h-96 onlyMobile:w-96">
                {kinderData.image ? (
                  <img src={kinderData.profileImageUrl} alt="img" />
                ) : (
                  <img src={profile} alt="defaultImage" />
                )}
              </div>
              <div className="flex flex-col justify-center">
                <p className="write-title">
                  {kinderData.name && kinderData.name.slice().replace(/"/g, '')}
                </p>
                <p className="flex items-center text-14">
                  <Star /> {kinderData.ratedReviewsAvg} (
                  {kinderData.ratedReviewsCount})
                </p>
                <p className="mt-6 text-14">
                  {kinderData.locations &&
                    kinderData.locations.slice().replace(/"/g, '')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed left-0 top-0 z-[100] h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.4)] onlyMobile:hidden" />
    </div>
  );
}
export default ConfirmReview;
