import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import Dog from '../../images/dog.jpeg';
import { ReactComponent as StarOn } from '../../images/star-on.svg';

function MapCard(props) {
  const { name, ratedReviewsAvg, ratedReviewsCount, id } = props;

  return (
    <Link to={`/kindergarten/${id}`}>
      <div className="relative ml-6 mt-6 w-302 rounded-2xl onlyMobile:mt-[-2px] onlyMobile:h-205 onlyMobile:w-220">
        <img
          className="h-200 w-full rounded-2xl onlyMobile:h-140"
          src={Dog}
          alt="dog"
        />
        <div className="justifty-center flex w-full flex-col items-start px-8 py-16 onlyMobile:pb-0">
          <div className="mb-4 text-left text-18 font-bold onlyMobile:text-14">
            {name.replace(/"/g, '')}
          </div>
          <div className="flex-center text-14 onlyMobile:text-12">
            <StarOn className="mr-4 inline-block" />
            <span className="mr-4">{ratedReviewsAvg}</span>({ratedReviewsCount})
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MapCard;
