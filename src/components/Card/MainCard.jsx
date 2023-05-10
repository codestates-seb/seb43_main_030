import { Link } from 'react-router-dom';
import Dog from '../../images/dog.jpeg';
import { ReactComponent as StarOn } from '../../images/star-on.svg';

function MainCard(props) {
  const { name, ratedReviewsAvg, ratedReviewsCount, locations, id } = props;
  return (
    <Link to={`/kindergarten/${id}`}>
      <div className="mb-40 min-w-302 hover:mt-[-2px]">
        <img
          className="mb-20 h-248 w-full rounded-2xl hover:shadow-cardShadow"
          src={Dog}
          alt="dog"
        />
        <div className="justifty-center flex w-full flex-col items-start px-8 py-0">
          <div className="text-18 font-bold">{name}</div>
          <div className="flex-center mb-8 text-14">
            <StarOn className="mr-4 inline-block" />
            <span className="mr-4">{ratedReviewsAvg}</span>({ratedReviewsCount})
          </div>
          <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-14">
            {locations}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MainCard;
