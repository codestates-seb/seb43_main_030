import Dog from '../../images/dog.jpeg';

function MainCard() {
  return (
    <div className="cardContainer h-343 w-302">
      <img className="mb-20 h-248 w-302 rounded-2xl" src={Dog} alt="dog" />
      <div className="detailContainer justifty-center flex w-full flex-col items-start px-8 py-0">
        <div className="name text-18 font-bold">유치원 이름</div>
        <div className="rating mb-8 text-14">⭐️ 4.3 (12)</div>
        <div className="address w-full overflow-hidden text-ellipsis whitespace-nowrap text-14">
          성수동1가 685-696번지 지하1층 B동 115호 입니다아아아아ㅏ.
        </div>
      </div>
    </div>
  );
}

export default MainCard;
