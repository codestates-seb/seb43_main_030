import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import {
  setCurProfile,
  setAuth,
  setCurUser,
  setActiveIndex,
  setUser,
} from '../../actions/areaFilterActions';

import Dog from '../../images/dog.jpeg';
import RatingStar from '../RatingStar';
import dateCalculate from '../dateCalculate';
import TextArea from '../TextArea';
import UploadImage from '../UploadImage';
import Button from '../Button/Button';
import profile from '../../images/profile.png';
import Modal from '../../pages/Modal';
import { ReactComponent as Star } from '../../images/star-on.svg';
import { ReactComponent as Close } from '../../images/close.svg';
import { ReactComponent as StarOff } from '../../images/star-off.svg';

function ConfirmReview(props) {
  const {
    offReviewModal,
    kinderInfo,
    kindergartenName,
    kindergartenLocations,
    kindergartenImageUrl,
    kindergartenRatedReviewsAvg,
    kindergartenRatedReviewsCount,
  } = props;
  const dispatch = useDispatch();

  const [text, setText] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;
  const [starIndex, setStarIndex] = useState(0);
  const [editModal, setEditModal] = useState(false);
  const [prevImage, setPrevImage] = useState('');
  const auth = useSelector(state => state.auth);
  const navi = useNavigate();

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

  const onEditModal = () => {
    setEditModal(true);
  };

  const offEditModal = () => {
    setEditModal(false);
  };

  const deleteReview = () => {
    if (!auth) {
      Swal.fire({
        icon: 'error',
        text: '로그인을 먼저 해주세요❗️',
        confirmButtonColor: '#FFD337',
      }).then(res => {
        navi('/login');
      });
    } else {
      Swal.fire({
        // title: '댓글을 삭제하시겠습니까?',
        text: '후기를 삭제하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#FFD337',
        cancelButtonColor: '#ffffff',
        confirmButtonText: '네',
        cancelButtonText: '<span style="color:#000000">아니오<span>',
      }).then(result => {
        axios
          .delete(`${apiUrl}/api/review/${kinderInfo.reviewId}`, {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          })
          .then(response => {
            Swal.fire({
              confirmButtonColor: '#FFD337',
              text: '후기가 삭제되었습니다.',
            }).then(result => {
              window.location.reload();
            });
          })
          .catch(error => {
            if (error.response && error.response.status === 403) {
              Swal.fire({
                icon: 'error',
                text: '본인이 작성한 후기만 삭제할 수 있어요❗️',
                confirmButtonColor: '#FFD337',
              });
            } else if (error.response && error.response.status === 401) {
              Swal.fire({
                icon: 'error',
                text: '토큰이 만료되었습니다. 재로그인 해주세요❗️',
                confirmButtonColor: '#FFD337',
              });
              dispatch(setAuth(false));
              localStorage.removeItem('token');
            }
          });
      });
    }
  };

  useEffect(() => {
    if (kinderInfo.reviewImageUrl) {
      setPrevImage(kinderInfo.reviewImageUrl);
    }
  }, [kinderInfo.image, kinderInfo.reviewImageUrl]);

  return (
    <>
      <div className="absolute left-[50%] flex justify-center">
        <div className="fixed top-[10px] z-40 my-80 h-[calc(100vh-160px)] w-608 rounded-[16px] bg-white onlyMobile:left-0 onlyMobile:top-0 onlyMobile:my-0 onlyMobile:h-full onlyMobile:w-full onlyMobile:rounded-0">
          <div className="relative flex h-full w-[100%] flex-col p-30 onlyMobile:p-24">
            <div>
              <div className="relative flex justify-center">
                <button
                  type="button"
                  className="absolute right-0 top-[-4px]"
                  onClick={() => offReviewModal()}
                >
                  <Close />
                </button>
              </div>
              <div className="mb-24 mt-30 flex w-600">
                <div className="flex w-full items-center justify-between">
                  <div className="flex w-full">
                    <div className="list-user-image mr-16">
                      <img
                        src={kinderInfo.profileImageUrl}
                        alt="profileImg"
                        className="rounded-xl"
                      />
                    </div>
                    <div className="flex w-full flex-col">
                      <div className="flex items-center gap-2">
                        <p className="text-16 font-bold onlyMobile:text-14">
                          {kinderInfo.profileName}
                        </p>
                        <p className="text-14 text-black-350 onlyMobile:text-12">
                          {kinderInfo.email}
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
                {/* <div className="mr-24 h-[75%] w-full">
                  <p className="list-content h-text-max mt-16 max-h-[50px]">
                    {kinderInfo.contents}
                  </p>
                  {kinderInfo.imageUrl ? (
                    <img src={kinderInfo.imageUrl} alt="img" />
                  ) : (
                    ''
                  )}
                </div> */}
              </div>
              <div className="h-[calc(80vh-160px)]">
                <div className="flex h-[calc(80vh-160px)] flex-col overflow-auto px-8">
                  <p className="mb-24">{kinderInfo.content}</p>

                  {kinderInfo.reviewImageUrl ? (
                    <div className="w-[100%] flex-col">
                      <img src={kinderInfo.reviewImageUrl} alt="reviewImg" />
                    </div>
                  ) : (
                    <p className="text-black-350">
                      리뷰에 등록된 사진이 없습니다...🥹
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 z-10 w-548 bg-white onlyMobile:w-[calc(100%-48px)]">
              <div className="mr-10 flex flex-col py-12">
                <div className="flex justify-end">
                  <button
                    className="mr-15 text-14 text-black-350 onlyMobile:text-12"
                    type="button"
                    onClick={() => {
                      // offReviewModal();
                      onEditModal();
                    }}
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
              <div className="mb-25 flex border-t-[1px] border-black-070 pt-25">
                <div className="user-profile mr-15 h-116 w-116 onlyMobile:h-96 onlyMobile:w-96">
                  {kindergartenImageUrl ? (
                    <img src={kindergartenImageUrl} alt="유치원이미지" />
                  ) : (
                    <img src={profile} alt="defaultImage" />
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <p className="write-title">
                    {kindergartenName &&
                      kindergartenName.slice().replace(/"/g, '')}
                  </p>
                  <p className="flex items-center text-14">
                    <Star />
                    {kindergartenRatedReviewsAvg?.toFixed(2)}
                    {kinderInfo.kindergartenRatedReview?.toFixed(2)}
                  </p>
                  <p className="mt-6 text-14">
                    {kindergartenLocations?.slice().replace(/"/g, '')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {editModal ? (
            <Modal
              className="absolute left-0 top-0"
              title="후기 수정하기"
              onClick={offEditModal}
              prevRatedReview={kinderInfo.ratedReview}
              prevText={kinderInfo.content}
              prevImage={prevImage}
              setPrevImage={setPrevImage}
              reviewId={kinderInfo.reviewId}
            />
          ) : null}
        </div>
      </div>
      <div className="fixed left-0 top-0 z-30 h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.4)] onlyMobile:hidden" />
    </>
  );
}
export default ConfirmReview;
