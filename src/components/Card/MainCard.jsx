import Dog from '../../images/dog.jpeg';
import { ReactComponent as StarOn } from '../../images/star-on.svg';

function MainCard() {
  return (
    <div className="h-343 w-302">
      <img className="mb-20 h-248 w-full rounded-2xl" src={Dog} alt="dog" />
      <div className="justifty-center flex w-full flex-col items-start px-8 py-0">
        <div className="text-18 font-bold">유치원 이름</div>
        <div className="flex-center mb-8 text-14">
          <StarOn className="mr-4 inline-block" />
          4.3 (12)
        </div>
        <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-14">
          성수동1가 685-696번지 지하1층 B동 115호 입니다아아아아ㅏ.
        </div>
      </div>
    </div>
  );
}

export default MainCard;
