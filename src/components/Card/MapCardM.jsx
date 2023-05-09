import Dog from '../../images/dog.jpeg';
import { ReactComponent as StarOn } from '../../images/star-on.svg';

function MapCardM(props) {
  const { name, ratedReviewsAvg, ratedReviewsCount } = props;
  return (
    <div className="flex-center flex h-116 flex-row rounded-2xl shadow-cardShadow">
      <img
        className="h-116 w-116 rounded-bl-2xl rounded-tl-2xl"
        src={Dog}
        alt="dog"
      />
      <div className="justifty-center flex w-full flex-col items-start p-16">
        <div className="max-w-500 text-left text-14 font-bold">
          놀펫강아지유치원애견호텔서울애견유치원성북본원
        </div>
        <div className="flex-center text-12">
          <StarOn className="mr-4 inline-block" />
          4.3 (12)
        </div>
      </div>
      <button
        className="mx-16 h-32 min-w-32 rounded-md bg-black-600 text-12 text-white opacity-80"
        type="button"
      >
        X
      </button>
    </div>
  );
}

export default MapCardM;
