import NoList from '../images/perpett-nolist.png';

function NotFound() {
  return (
    <div className="flex-center relative h-[80vh] min-h-[600px] flex-col">
      <div className="flex-center mt-80 h-640 w-[100%] max-w-[1440px] flex-col px-80">
        <img src={NoList} alt="NoList" className="h-160 w-160" />
        <div className="flex-center h-70 text-56 font-black text-yellow-500">
          404
        </div>
        <div className="mt-24 text-16 text-black-350">
          여기는 페이지가 없어요...
        </div>
      </div>
    </div>
  );
}

export default NotFound;
