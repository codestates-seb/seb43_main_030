import Dog from '../../images/dog.jpeg';
import { ReactComponent as StarOn } from '../../images/star-on.svg';

function MapCard(props) {
  const { name } = props;

  return (
    <div className="relative ml-6 mt-6 w-302 rounded-2xl">
      <img className="h-200 w-full rounded-2xl" src={Dog} alt="dog" />
      <div className="justifty-center flex w-full flex-col items-start px-8 py-16">
        <div className="mb-4 text-left text-18 font-bold">{name}</div>
        <div className="flex-center text-14">
          <StarOn className="mr-4 inline-block" />
          4.3 (12)
        </div>
      </div>
      {/* <button
        className="absolute right-[3.31%] top-[3.29%] h-32 w-32 rounded-md bg-black-600 text-12 text-white opacity-80"
        type="button"
      >
        X
      </button> */}
    </div>
  );
}

export default MapCard;
