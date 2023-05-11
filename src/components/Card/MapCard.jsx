import { useMediaQuery } from 'react-responsive';
import Dog from '../../images/dog.jpeg';
import { ReactComponent as StarOn } from '../../images/star-on.svg';

function MapCard(props) {
  const { name, ratedReviewsAvg, ratedReviewsCount } = props;

  return (
    <div className="relative ml-6 mt-6 w-302 rounded-2xl onlyMobile:h-210 onlyMobile:w-226">
      <img
        className="h-200 w-full rounded-2xl onlyMobile:h-140"
        src={Dog}
        alt="dog"
      />
      <div className="justifty-center flex w-full flex-col items-start px-8 py-16">
        <div className="mb-4 text-left text-18 font-bold onlyMobile:text-14">
          {name}
        </div>
        <div className="flex-center text-14 onlyMobile:text-12">
          <StarOn className="mr-4 inline-block" />
          <span className="mr-4">{ratedReviewsAvg}</span>({ratedReviewsCount})
        </div>
      </div>
    </div>
  );
}

export default MapCard;
