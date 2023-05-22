import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { PulseLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { setKinderGartens } from '../actions/areaFilterActions';
import NoList from '../images/perpett-nolist.png';
import MainCard from '../components/Card/MainCard';
import Button from '../components/Button/Button';
import InputSelectBox from '../components/Input/InputSelectBox';

function Main() {
  const [isPending, setIsPending] = useState(false);

  const [ref, inView] = useInView();

  const page = useRef(8);
  const [print, setPrint] = useState([]);
  const dispatch = useDispatch();

  const areaFilter = useSelector(state => state.areaFilter);
  const kinderGartens = useSelector(state => state.kinderGartens);
  const searchValue = useSelector(state => state.searchValue);
  const user = useSelector(state => state.user);
  const curUser = useSelector(state => state.curUser);
  const curProfile = useSelector(state => state.curProfile);

  useEffect(() => {
    let url = ``;
    if (searchValue) {
      url = `${process.env.REACT_APP_API_URL}/api/kindergarten/name/${searchValue}`;
    } else {
      url = `${process.env.REACT_APP_API_URL}/api/kindergarten/loc/${areaFilter}`;
    }
    axios
      .get(url)
      .then(response => {
        dispatch(setKinderGartens(response.data));
        setIsPending(true);
      })
      .catch(error => {
        console.log(error);
      });
  }, [areaFilter, searchValue, dispatch]);

  useEffect(() => {
    let timerId;
    if (isPending) {
      if (kinderGartens.length === 0) {
        setPrint([]);
      } else {
        setPrint(kinderGartens.slice(0, page.current));
      }
      if (inView) {
        timerId = setTimeout(() => {
          page.current += 8;
          setPrint(kinderGartens.slice(0, page.current));
        }, 150);
      }
    }

    return () => clearTimeout(timerId);
  }, [inView, isPending, kinderGartens]);

  return (
    <div className="flex-center relative flex-col">
      <div className="flex-center mt-80 w-[100%] max-w-[1440px] flex-col px-80 onlyMobile:px-24">
        <div className="mt-56 h-304 w-[100%] rounded-2xl bg-yellow-500">
          안냐세여
        </div>
        <div className="mb-24 mt-48 flex w-[100%] justify-between text-28 font-bold onlyMobile:flex-col">
          <span>
            {searchValue ? `"${searchValue}"에 대한 검색결과` : '유치원 리스트'}
          </span>
          <InputSelectBox
            options="전체보기, 강서 · 구로 · 양천, 관악 · 금천 · 동작 · 영등포, 강남 · 강동 · 서초 · 송파, 마포 · 은평 · 서대문, 강북 · 노원 · 도봉 · 성북, 용산 · 성동 · 종로 · 중구, 광진 · 동대문 · 중랑"
            width="min-w-260 onlyMobile:w-full onlyMobile:mt-10"
            placeholder="전체보기"
          />
        </div>
        <div className="grid w-[100%] grid-cols-cardGrid gap-x-[20px]">
          {isPending ? (
            print.length === 0 ? (
              <div className="flex-center h-640 flex-col">
                <img src={NoList} alt="NoList" className="mb-16 h-160 w-160" />
                <span className="text-18 text-black-350">
                  {searchValue
                    ? `"${searchValue}"에 대한 검색결과가 없어요...`
                    : '여기는 유치원이 없어요...'}
                </span>
              </div>
            ) : (
              print.map(kinderGarten => {
                return (
                  <MainCard
                    key={kinderGarten.kindergartenId}
                    name={kinderGarten.name}
                    ratedReviewsAvg={kinderGarten.ratedReviewsAvg}
                    ratedReviewsCount={kinderGarten.ratedReviewsCount}
                    locations={kinderGarten.locations}
                    id={kinderGarten.kindergartenId}
                    imageUrl={kinderGarten.imageUrl}
                  />
                );
              })
            )
          ) : (
            <div className="flex-center h-[50vh] w-[100%]">
              <PulseLoader color="#FFD337" />
            </div>
          )}
        </div>
        <div className="flex-center sticky bottom-10 left-0 w-[100%] text-white">
          <Link to="/map">
            <Button
              className="color-black flex-center z-20 h-50 w-190"
              icon="map"
            >
              지도보기
            </Button>
          </Link>
        </div>
      </div>
      {isPending && page.current < kinderGartens.length ? (
        <div ref={ref} />
      ) : null}
    </div>
  );
}

export default Main;
