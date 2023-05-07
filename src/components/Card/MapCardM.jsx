import Dog from '../../images/dog.jpeg';

function MapCardM() {
  return (
    <div className="cardContainer flex-center flex h-116 flex-row rounded-2xl shadow-cardShadow">
      <img
        className="h-116 w-116 rounded-bl-2xl rounded-tl-2xl"
        src={Dog}
        alt="dog"
      />
      <div className="detailContainer justifty-center flex w-full flex-col items-start p-16">
        <div className="name max-w-500 text-left text-18 font-bold">
          놀펫강아지유치원애견호텔서울애견유치원성북본원
        </div>
        <div className="rating mb-8 text-14">⭐️ 4.3 (12)</div>
      </div>
      <button
        className="closeBtn mx-16 h-32 min-w-32 rounded-md bg-black-600 text-12 text-white opacity-80"
        type="button"
      >
        X
      </button>
    </div>
  );
}

export default MapCardM;
