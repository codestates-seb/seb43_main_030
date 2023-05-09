import { useMediaQuery } from 'react-responsive';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MainCard from '../components/Card/MainCard';
import Button from '../components/Button/Button';

function Main() {
  const [kinderGartens, setKinderGartens] = useState([]);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:3001/KinderGarten')
      .then(response => {
        setKinderGartens(response.data);
        setIsPending(true);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const kinderGardens = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];

  const isMobile = useMediaQuery({ query: '(max-width: 1439px)' });

  return (
    <div className="flex-center relative">
      <div className="flex-center mt-80 w-[100%] max-w-[1440px] flex-col px-80">
        <div className="mt-56 h-304 w-[100%] rounded-2xl bg-yellow-500">
          안냐세여
        </div>
        <div className="mb-24 mt-48 w-[100%] text-28 font-bold">
          유치원 리스트
        </div>
        <div className="grid w-[100%] grid-cols-cardGrid gap-x-[10px]">
          {isPending &&
            kinderGartens.map(kinderGarten => {
              return (
                <MainCard
                  name={kinderGarten.name}
                  ratedReviewsAvg={kinderGarten.ratedReviewsAvg}
                  ratedReviewsCount={kinderGarten.ratedReviewsCount}
                  locations={kinderGarten.locations}
                />
              );
            })}
          <div className="flex-center fixed bottom-[30px] left-0 w-[100%]">
            <Link to="/map">
              <Button className="color-black flex-center z-10 h-50 w-190">
                지도보기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
