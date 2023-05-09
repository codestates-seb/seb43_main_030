import Dog from '../../images/dog.jpeg';
import { ReactComponent as StarOn } from '../../images/star-on.svg';

function MapCard(props) {
  const { name } = props;

  return (
    <div className="relative h-304 w-302 rounded-2xl shadow-cardShadow">
      <img className="h-200 w-full rounded-t-2xl" src={Dog} alt="dog" />
      <div className="justifty-center flex w-full flex-col items-start p-16">
        <div className="text-left text-18 font-bold">{name}</div>
        <div className="flex-center mb-8 text-14">
          <StarOn className="mr-4 inline-block" />
          4.3 (12)
        </div>
      </div>
      <button
        className="absolute right-[3.31%] top-[3.29%] h-32 w-32 rounded-md bg-black-600 text-12 text-white opacity-80"
        type="button"
      >
        X
      </button>
    </div>
  );
}

export default MapCard;
