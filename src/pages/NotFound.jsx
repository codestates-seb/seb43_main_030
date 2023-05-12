import NoList from '../images/perpett-nolist.png';

function NotFound() {
  return (
    <div className="flex-center relative flex-col">
      <div className="flex-center mt-80 h-640 w-[100%] max-w-[1440px] flex-col px-80">
        <img src={NoList} alt="NoList" className="h-160 w-160" />
        <span className="h-78 text-56 font-black text-yellow-500">404</span>
        <span className="text-18 text-black-350">
          여기는 페이지가 없어요...
        </span>
      </div>
    </div>
  );
}

export default NotFound;
