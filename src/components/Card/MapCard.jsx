import Dog from '../../images/dog.jpeg';

function MapCard() {
  return (
    <div className="cardContainer relative h-304 w-302 rounded-2xl shadow-cardShadow">
      <img className="h-200 w-full rounded-t-2xl" src={Dog} alt="dog" />
      <div className="detailContainer justifty-center flex w-full flex-col items-start p-16">
        <div className="name text-left text-18 font-bold">
          놀펫강아지유치원애견호텔서울애견유치원성북본원
        </div>
        <div className="rating mb-8 text-14">⭐️ 4.3 (12)</div>
      </div>
      <button
        className="closeBtn absolute right-[3.31%] top-[3.29%] h-32 w-32 rounded-md bg-black-600 text-12 text-white opacity-80"
        type="button"
      >
        X
      </button>
    </div>
  );
}

export default MapCard;
