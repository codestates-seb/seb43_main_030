import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MainCard from '../components/Card/MainCard';
import Button from '../components/Button/Button';
import InputSelectBox from '../components/Input/InputSelectBox';

function Main({
  areaFilter,
  setAreaFilter,
  inputValue,
  setInputValue,
  kinderGartens,
  setKinderGartens,
}) {
  const [isPending, setIsPending] = useState(false);

  const [ref, inView] = useInView();

  const page = useRef(8);
  const [print, setPrint] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/KinderGarten${areaFilter}`)
      .then(response => {
        setKinderGartens(response.data);
        setIsPending(true);
      })
      .catch(error => {
        console.log(error);
      });
  }, [areaFilter, setKinderGartens]);

  useEffect(() => {
    let timerId;
    if (isPending) {
      setPrint(kinderGartens.slice(0, page.current));
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
      <div className="flex-center mt-80 w-[100%] max-w-[1440px] flex-col px-80">
        <div className="mt-56 h-304 w-[100%] rounded-2xl bg-yellow-500">
          안냐세여
        </div>
        <div className="mb-24 mt-48 flex w-[100%] justify-between text-28 font-bold onlyMobile:flex-col">
          <span>유치원 리스트</span>
          <InputSelectBox
            options="전체보기, 강서 · 구로 · 양천, 관악 · 금천 · 동작 · 영등포, 강남 · 강동 · 서초 · 송파, 마포 · 은평 · 서대문, 강북 · 노원 · 도봉 · 성북, 용산 · 성동 · 종로 · 중, 광진 · 동대문 · 중랑"
            width="min-w-260 onlyMobile:w-full onlyMobile:mt-10"
            placeholder="전체보기"
            setAreaFilter={setAreaFilter}
            setInputValue={setInputValue}
          />
        </div>
        <div className="grid w-[100%] grid-cols-cardGrid gap-x-[10px]">
          {isPending &&
            print.map(kinderGarten => {
              return (
                <MainCard
                  key={kinderGarten.kindergartenId}
                  name={kinderGarten.name}
                  ratedReviewsAvg={kinderGarten.ratedReviewsAvg}
                  ratedReviewsCount={kinderGarten.ratedReviewsCount}
                  locations={kinderGarten.locations}
                  id={kinderGarten.kindergartenId}
                />
              );
            })}
          <div className="flex-center fixed bottom-[30px] left-0 w-[100%] text-white">
            <Link to="/map">
              <Button
                className="color-black flex-center z-10 h-50 w-190"
                icon="map"
              >
                지도보기
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {isPending && page.current < kinderGartens.length ? (
        <div ref={ref} />
      ) : null}
    </div>
  );
}

export default Main;
