import { Link } from 'react-router-dom';
import { ReactComponent as StarOn } from '../../images/star-on.svg';

function MainCard(props) {
  const { name, ratedReviewsAvg, ratedReviewsCount, locations, id, imageUrl } =
    props;
  return (
    <Link to={`/kindergarten/${id}`}>
      <div className="mb-40 onlyMobile:w-[100%]">
        <div className="user-profile mb-20 h-248 w-full rounded-2xl">
          <img
            className="mb-20 h-248 w-full rounded-2xl"
            src={imageUrl}
            alt="dog"
          />
        </div>
        <div className="justifty-center flex w-full flex-col items-start px-8 py-0">
          <div className="text-18 font-bold">{name.replace(/"/g, '')}</div>
          <div className="flex-center mb-8 text-14">
            <StarOn className="mr-4 inline-block" />
            <span className="mr-4">{ratedReviewsAvg.toFixed(2)}</span>(
            {ratedReviewsCount})
          </div>
          <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-14">
            {locations.replace(/"/g, '')}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MainCard;
