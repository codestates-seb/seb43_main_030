// import {useMediaQuery} from 'react-responsive';
import MainCard from '../components/Card/MainCard';

function Main() {
  const kinderGardens = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];

  // const isMobile = useMediaQuery({query: '(max-width: 1439px)'});

  return (
    <div className="flex-center">
      <div className="flex-center w-[100%] max-w-[1440px] flex-col px-80">
        <div className="mt-56 h-304 w-[100%] rounded-2xl bg-yellow-500">
          안냐세여
        </div>
        <div className="mb-24 mt-48 w-[100%] text-28 font-bold">
          유치원 리스트
        </div>
        <div className="grid-cardGrid grid w-[100%] border">
          {kinderGardens.map(kinderGarden => {
            return <MainCard />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Main;
