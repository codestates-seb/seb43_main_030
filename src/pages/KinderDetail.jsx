import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import { setCenter, setCategory } from '../actions/areaFilterActions';
import Modal from './Modal';
import ConfirmReview from '../components/List/ConfirmReview';
import ListNotice from '../components/List/ListNotice';
import ListReview from '../components/List/ListReview';
import Button from '../components/Button/Button';
import Pagination from '../components/Pagination';
import PinOn from '../images/pin-on.png';
import { ReactComponent as Call } from '../images/call.svg';
import { ReactComponent as Pin } from '../images/pin.svg';
import { ReactComponent as Sns } from '../images/social.svg';
import { ReactComponent as Time } from '../images/time.svg';
import { ReactComponent as StarOn } from '../images/star-on.svg';
import { ReactComponent as Perpett } from '../images/perpett-on.svg';
import SettingModal from './SettingModal';

// 지도 관련 스타일 정의
const myStyles = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
];

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '16px',
};

function KinderDetail() {
  const { id } = useParams();
  const category = useSelector(state => state.category);

  // 유치원 정보
  const [kinderData, setKinderData] = useState('');
  const [postData, setPostData] = useState('');

  const [reviewData, setReviewData] = useState('');
  const [list, setList] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentReview, setCurrentReview] = useState([]);

  const [map, setMap] = useState(null);
  const [isModal, setisModal] = useState(false);
  const center = useSelector(state => state.center);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  // 지도
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  });

  const onLoad = useCallback(
    function callback(mapValue) {
      const centerLatLng = new window.google.maps.LatLng(
        center.lat,
        center.lng,
      );
      const bounds = new window.google.maps.LatLngBounds(centerLatLng);
      const circle = new window.google.maps.Circle({
        center: centerLatLng,
        radius: 100, // 10m 반경
      });
      bounds.union(circle.getBounds());
      mapValue.fitBounds(bounds);
    },
    [center.lat, center.lng],
  );

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  useEffect(() => {
    axios
      .all([
        axios.get(`${process.env.REACT_APP_API_URL}/kindergarten/${id}`),
        axios.get(
          `${process.env.REACT_APP_API_URL}/community/${id}/post/notification`,
        ),
        axios.get(`${process.env.REACT_APP_API_URL}/review/kindergarten/${id}`),
      ])
      .then(
        axios.spread((res1, res2, res3) => {
          const resKinder = res1.data.data;
          const resPost = res2.data.data;
          const resReview = res3.data;
          setKinderData(resKinder);
          setPostData(resPost);
          setReviewData(resReview.sort((a, b) => b.reviewId - a.reviewId));
          setCurrentReview(resReview.slice(0, 5));
          console.log(res1.data.data);
          console.log(res2.data);
          console.log(res3.data);

          if (res1.data) {
            dispatch(
              setCenter({
                lat: res1.data.data.latitude,
                lng: res1.data.data.longitude,
              }),
            );
          }
        }),
      )
      .catch(err => {
        console.log(err);
      });
  }, [id, dispatch]);

  // 페이지네이션
  useEffect(() => {
    const firstReview = (currentPage - 1) * 5;
    setCurrentReview(reviewData.slice(firstReview, firstReview + 5));
  }, [currentPage, reviewData]);

  const handlePageChange = e => {
    setCurrentPage(e);
  };

  // 모달 관련 함수
  const modalOnOff = () => {
    setisModal(!isModal);
  };

  const closeModal = () => {
    setisModal(false);
  };

  return (
    <div className="mb-64 flex flex-col items-center pt-130 onlyMobile:pt-64 ">
      <div className="max-w-[1280px] px-80 onlyMobile:max-w-full onlyMobile:px-0">
        {/* 메인 이미지 */}
        <div className="relative mb-48 h-432 overflow-hidden rounded-[16px] onlyMobile:mb-24 onlyMobile:h-300 onlyMobile:rounded-0">
          <img
            src={kinderData.imageUrl}
            alt="유치원대표이미지"
            className="w-full"
          />
        </div>
        <div className="flex">
          {/* 좌측 컨텐츠 영역 */}
          <div className="relative w-[63%] pl-8 onlyMobile:w-full onlyMobile:px-24">
            <div className="pb-48 onlyMobile:pb-32">
              {/* 유치원 이름 */}
              {kinderData && (
                <h2 className="mb-24 text-28 font-bold text-black-900 onlyMobile:mb-12 onlyMobile:text-22">
                  {kinderData.name.replace(/"/g, '')}
                </h2>
              )}
              <p className="onlyMobile:text-14">유치원 소개 내용 입력</p>
            </div>

            {/* 유치원 정보 */}
            <div className="content-line">
              <h5 className="mb-24 text-22 font-bold onlyMobile:text-18">
                유치원 정보
              </h5>
              <div className="flex w-full flex-col gap-4">
                {/* 주소 */}
                <div className="ml-4 flex w-full flex-row gap-2">
                  <div className="flex w-150 gap-2">
                    <Pin className="h-24 w-24" />
                    <span>주소</span>
                  </div>
                  <p className="w-full">
                    {kinderData?.locations?.replace(/"/g, '')}
                  </p>
                </div>
                {/* 전화번호 */}
                <div className="ml-4 flex w-full flex-row gap-2">
                  <div className="flex w-150 gap-2">
                    <Call className="h-24 w-24" />
                    <span>전화번호</span>
                  </div>
                  <p className="w-full">
                    {!kinderData?.phoneNumber ? (
                      <p className="text-black-200">전화번호가 없어요🥺</p>
                    ) : (
                      <p className="w-full">{kinderData.phoneNumber}</p>
                    )}
                  </p>
                </div>
                {/* SNS */}
                <div className="ml-4 flex w-full flex-row gap-2">
                  <div className="flex w-150 gap-2">
                    <Sns className="h-24 w-24" />
                    <span>SNS</span>
                  </div>
                  <p className="w-full">
                    {!kinderData?.snsUrl ? (
                      <p className="text-black-200">연결된 SNS가 없어요🥺</p>
                    ) : (
                      <p className="w-full">{kinderData.snsUrl}</p>
                    )}
                  </p>
                </div>
                {/* 운영 시간 */}
                <div className="ml-4 flex w-full flex-row gap-2">
                  <div className="flex w-150 gap-2">
                    <Time className="h-24 w-24" />
                    <span>운영 시간</span>
                  </div>
                  <p className="w-full">
                    {!kinderData?.openHours || !kinderData?.closeHours ? (
                      <p className="text-black-200">
                        운영 시간 정보가 없어요🥺
                      </p>
                    ) : (
                      <p>{`${kinderData.openHours} - ${kinderData.closeHours}`}</p>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* 유치원 공지사항 */}
            <div className="content-line">
              <h5 className="mb-24 text-22 font-bold onlyMobile:text-18">
                유치원 공지사항
              </h5>
              <div className="flex flex-col gap-8 onlyMobile:gap-6">
                {postData ? (
                  <>
                    {postData.map(el => {
                      return <ListNotice key={el.postId} post={el} />;
                    })}
                    <Link to={`/community/${id}`}>
                      <Button className="border-gray btn-size-l shrink-0 onlyMobile:mt-16">
                        공지사항 더보기
                      </Button>
                    </Link>
                  </>
                ) : (
                  <div className="flex-center flex-col">
                    <Perpett className="mb-16 h-104 w-104" />
                    <p className="text-14 text-black-350">
                      유치원 공지사항이 없어요.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 유치원 후기 영역 */}
            <div className="content-line">
              <div className="mb-24 flex">
                <div className="flex w-full items-center ">
                  <StarOn className="mr-4 inline-block h-32 w-32 onlyMobile:h-24 onlyMobile:w-24" />
                  <span className="text-22 font-bold onlyMobile:text-18">
                    {`${kinderData?.ratedReviewsAvg?.toFixed(2)} ∙ 후기 
                    ${kinderData?.ratedReviewsCount}개`}
                  </span>
                </div>
                {auth ? (
                  <Button
                    className="color-yellow btn-size-l w-[160px]"
                    onClick={modalOnOff}
                  >
                    후기쓰기
                  </Button>
                ) : (
                  <Link to="/login">
                    <Button className="color-yellow btn-size-l w-[160px]">
                      후기쓰기
                    </Button>
                  </Link>
                )}
              </div>
              {currentReview ? (
                <div className="flex flex-col gap-8">
                  {currentReview.map(el => {
                    return (
                      <ListReview
                        key={el.reviewId}
                        post={el}
                        // kinderData={kinderData}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="flex-center flex-col">
                  <Perpett className="mb-16 h-104 w-104" />
                  <p className="text-14 text-black-350">
                    첫 후기를 등록해보세요!
                  </p>
                </div>
              )}
              <Pagination
                currentPage={currentPage}
                count={reviewData.length}
                onChange={handlePageChange}
                itemsCountPerPage={5}
              />
            </div>
          </div>

          {/* 좌측 고정 영역 */}
          {!isMobile ? (
            <div className="relative z-10 ml-[8.3%] w-[33.3%]">
              {kinderData && (
                <div className="sticky-card top-[128px] mb-48">
                  <h2 className="text-22 font-bold text-black-900">
                    {kinderData.name.replace(/"/g, '')}
                  </h2>
                  <div className="mt-16 text-14">
                    <div className="mb-8 flex items-center">
                      <StarOn className="mr-4 inline-block" />
                      <span>{`${kinderData.ratedReviewsAvg.toFixed(2)} (${
                        kinderData.ratedReviewsCount
                      })`}</span>
                    </div>
                    <p>{kinderData.locations.replace(/"/g, '')}</p>
                  </div>
                  <Link to={`/community/${id}`} className="flex">
                    <Button className="color-yellow btn-size-l mt-24 w-full">
                      커뮤니티 가기
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            ''
          )}
        </div>

        {/* 유치원 지도 영역 */}
        <div className="content-line onlyMobile:mx-24 onlyMobile:w-auto">
          <div className="mb-24 flex w-full items-center">
            <h5 className="w-full text-22 font-bold onlyMobile:text-18">
              유치원 지도보기
            </h5>
            {/* <Button className="border-gray btn-size-l shrink-0">
              지도보기
            </Button> */}
          </div>
          {kinderData && (
            <p className="mb-16">{kinderData.locations.replace(/"/g, '')}</p>
          )}
          <div className="flex h-400 onlyMobile:h-240">
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{ disableDefaultUI: true, styles: myStyles }}
              >
                <MarkerF
                  key={kinderData.id}
                  position={{
                    lat: kinderData.latitude,
                    lng: kinderData.longitude,
                  }}
                  icon={{
                    url: PinOn,
                    scaledSize: new window.google.maps.Size(56, 56),
                  }}
                />
              </GoogleMap>
            ) : (
              ''
            )}
          </div>
        </div>
        {isMobile ? (
          <div className="fixed bottom-0 left-0 z-10 flex w-full bg-white px-20 py-10 shadow-bottomBoxShadow">
            <Link to="/community" className="flex w-full">
              <Button className="btn-size-l color-yellow w-full grow">
                커뮤니티 가기
              </Button>
            </Link>
          </div>
        ) : (
          ''
        )}
      </div>
      {isModal ? <Modal onClick={closeModal} title="후기 작성하기" /> : ''}
    </div>
  );
}

export default KinderDetail;
