import Dog from '../../images/dog.jpeg';
import { ReactComponent as StarOn } from '../../images/star-on.svg';

function MapCard(props) {
  const { name, ratedReviewsAvg, ratedReviewsCount } = props;

  return (
    <div className="relative ml-6 mt-6 w-302 rounded-2xl">
      <img className="h-200 w-full rounded-2xl" src={Dog} alt="dog" />
      <div className="justifty-center flex w-full flex-col items-start px-8 py-16">
        <div className="mb-4 text-left text-18 font-bold">{name}</div>
        <div className="flex-center text-14">
          <StarOn className="mr-4 inline-block" />
          <span className="mr-4">{ratedReviewsAvg}</span>({ratedReviewsCount})
        </div>
      </div>
    </div>
  );
}

export default MapCard;
