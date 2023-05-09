import Dog from '../../images/dog.jpeg';
import { ReactComponent as StarOn } from '../../images/star-on.svg';

function MainCard(props) {
  const { name, ratedReviewsAvg, ratedReviewsCount, locations } = props;
  return (
    <div className="mb-40 min-w-302">
      <img className="mb-20 h-248 w-full rounded-2xl" src={Dog} alt="dog" />
      <div className="justifty-center flex w-full flex-col items-start px-8 py-0">
        <div className="text-18 font-bold">{name}</div>
        <div className="flex-center mb-8 text-14">
          <StarOn className="mr-4 inline-block" />
          {ratedReviewsAvg} {`(${ratedReviewsCount})`}
        </div>
        <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-14">
          {locations}
        </div>
      </div>
    </div>
  );
}

export default MainCard;
