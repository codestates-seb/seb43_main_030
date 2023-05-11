import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import Modal from './Modal';
import ListNotice from '../components/List/ListNotice';
import ListReview from '../components/List/ListReview';
import Button from '../components/Button/Button';
import Dog from '../images/dog.jpeg';
import PinOn from '../images/pin-on.png';
import { ReactComponent as Call } from '../images/call.svg';
import { ReactComponent as Pin } from '../images/pin.svg';
import { ReactComponent as Sns } from '../images/social.svg';
import { ReactComponent as Time } from '../images/time.svg';
import { ReactComponent as StarOn } from '../images/star-on.svg';
import { ReactComponent as Perpett } from '../images/perpett-on.svg';
import { ReactComponent as ArrowNext } from '../images/arrow-next.svg';
import { ReactComponent as ArrowPrev } from '../images/arrow-prev.svg';

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
};

function KinderDetail() {
  const { id } = useParams();
  const [value, setValue] = useState('');
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [isModal, setisModal] = useState(false);

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

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
      .get(`http://localhost:3001/kindergarten/${id}`)
      .then(res => {
        setValue(res.data);
        if (value) {
          setCenter({ lat: res.data.latitude, lng: res.data.longitude });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [value, id]);

  const modalOnOff = () => {
    setisModal(!isModal);
  };

  const closeModal = () => {
    setisModal(false);
  };

  return (
    <div className="mb-64 flex flex-col items-center pt-130 onlyMobile:pt-64 ">
      <div className="max-w-[1280px] px-80 onlyMobile:max-w-full onlyMobile:px-0">
        <div className="relative mb-48 h-432 overflow-hidden rounded-[16px] onlyMobile:mb-24 onlyMobile:h-300 onlyMobile:rounded-0">
          <img src={Dog} alt="예시이미지" className="w-full" />
        </div>
        <div className="flex">
          <div className="relative w-[63%] pl-8 onlyMobile:w-full onlyMobile:px-24">
            <div className="pb-48 onlyMobile:pb-32">
              <h2 className="mb-24 text-28 font-bold text-black-900 onlyMobile:mb-12 onlyMobile:text-22">
                {value.name}
              </h2>
              <p className="onlyMobile:text-14">유치원 소개 영역</p>
            </div>
            <div className="content-line">
              <h5 className="mb-24 text-22 font-bold onlyMobile:text-18">
                유치원 정보
              </h5>
              <div className="flex flex-col gap-2">
                <div className="flex">
                  <Pin />
                  <div className="ml-4 flex gap-2">
                    <p className="w-72">주소</p>
                    <p>{value.locations}</p>
                  </div>
                </div>
                <div className="flex">
                  <Call />
                  <div className="ml-4 flex gap-2">
                    <p className="w-72">전화번호</p>
                    <p>{value.phoneNumber}</p>
                  </div>
                </div>
                <div className="flex">
                  <Sns />
                  <div className="ml-4 flex gap-2">
                    <p className="w-72">SNS</p>
                    <p>{value.snsUrl}</p>
                  </div>
                </div>
                <div className="flex">
                  <Time />
                  <div className="ml-4 flex gap-2">
                    <p className="w-72">운영 시간</p>
                    <p>{`${value.openHours} - ${value.closeHours}`}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-line">
              <h5 className="mb-24 text-22 font-bold onlyMobile:text-18">
                유치원 공지사항
              </h5>
              <div className="flex flex-col gap-8 onlyMobile:gap-6">
                {value && value.notices.length !== 0 ? (
                  <>
                    {value.notices &&
                      value.notices.map(el => {
                        return (
                          <ListNotice
                            key={el.noticeId}
                            title={el.title}
                            contents={el.contents.text}
                            images={el.contents.images}
                            createdAt={el.createdAt}
                          />
                        );
                      })}
                    <Button className="border-gray btn-size-l mt-24 shrink-0 onlyMobile:mt-16">
                      공지사항 더보기
                    </Button>
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
            <div className="content-line">
              <div className="mb-24 flex">
                <div className="flex w-full items-center ">
                  <StarOn className="mr-4 inline-block h-32 w-32 onlyMobile:h-24 onlyMobile:w-24" />
                  <span className="text-22 font-bold onlyMobile:text-18">
                    {value.ratedReviewsAvg} 후기 {value.ratedReviewsCount}개
                  </span>
                </div>
                <Button
                  className="color-yellow btn-size-l w-[160px]"
                  onClick={modalOnOff}
                >
                  후기쓰기
                </Button>
              </div>
              {value && value.reviews.length !== 0 ? (
                <div className="flex flex-col gap-8">
                  {value.reviews &&
                    value.reviews.map(el => {
                      return (
                        <ListReview
                          key={el.reviewId}
                          id={el.reviewId}
                          contents={el.contents.text}
                          images={el.contents.images}
                          ratedReview={el.ratedReview}
                          createdAt={el.createdAt}
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
              <div className="mt-50 flex">
                <Button className="btn-pagination-default">
                  <ArrowPrev />
                </Button>
                <Button className="btn-pagination-default">1</Button>
                <Button className="btn-pagination-default">
                  <ArrowNext />
                </Button>
              </div>
            </div>
          </div>
          {!isMobile ? (
            <div className="relative z-10 ml-[8.3%] w-[33.3%]">
              <div className="sticky-card top-[128px] mb-48">
                <h2 className="text-22 font-bold text-black-900">
                  {value.name}
                </h2>
                <div className="mt-16 text-14">
                  <div className="mb-8">
                    <StarOn className="mr-4 inline-block" />
                  </div>
                  <p>{value.locations}</p>
                </div>
                <Button className="color-yellow btn-size-l mt-24">
                  커뮤니티 가기
                </Button>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="content-line onlyMobile:mx-24 onlyMobile:w-auto">
          <div className="mb-24 flex w-full items-center">
            <h5 className="w-full text-22 font-bold onlyMobile:text-18">
              유치원 지도보기
            </h5>
            <Button className="border-gray btn-size-l shrink-0">
              지도보기
            </Button>
          </div>
          <p className="mb-16">
            성수동1가 685-696번지 하1층 B동 115호 갤러리아포레 성동구 서울특별시
            KR
          </p>
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
                  key={value.id}
                  position={{
                    lat: value.latitude,
                    lng: value.longitude,
                  }}
                  // onClick={() => handleMarkerClick(kinderGarten)}
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
            <Button className="btn-size-l color-yellow grow">
              커뮤니티 가기
            </Button>
          </div>
        ) : (
          ''
        )}
      </div>
      {isModal ? <Modal onClick={closeModal} /> : ''}
    </div>
  );
}

export default KinderDetail;
