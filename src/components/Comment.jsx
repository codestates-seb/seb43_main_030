import { useState } from 'react';
import { ReactComponent as More } from '../images/more.svg';
import Dog from '../images/dog.jpeg';

function Comment() {
  const [moreSelect, setMoreSelect] = useState(false);

  const handleClick = () => {
    setMoreSelect(!moreSelect);
  };
  return (
    <div className="pb-32">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="user-profile h-32 w-32 onlyMobile:h-24 onlyMobile:w-24">
            <img src={Dog} alt="임시이미지" />
          </div>
          <span className="px-8 text-14">백설이맘</span>
          <span className="text-14 text-black-350 onlyMobile:text-12">
            h*******
          </span>
        </div>
        <div className="relative">
          <button type="button">
            <More width="16" height="16" onClick={handleClick} />
          </button>
          {moreSelect ? (
            <ul className="absolute right-[-25px] flex flex w-80 flex-col items-center justify-center rounded-[10px] bg-white p-10 shadow-dropDownShadow">
              <li className=" flex w-full cursor-pointer items-center justify-center rounded-md px-8 py-10 text-14 hover:bg-black-025 onlyMobile:text-12">
                수정
              </li>
              <li className="flex w-full cursor-pointer items-center justify-center rounded-md px-8 py-10 text-14 hover:bg-black-025 onlyMobile:text-12">
                삭제
              </li>
            </ul>
          ) : (
            ''
          )}
        </div>
      </div>
      <p className="mb-10 mt-5 text-16 text-black-900 onlyMobile:text-12">
        댓글 내용내용내용내용내용댓글 내용내용내용내용내용댓글
        내용내용내용내용내용댓글 내용내용내용내용내용댓글
        내용내용내용내용내용댓글 내용내용내용내용내용댓글
        내용내용내용내용내용댓글 내용내용내용내용내용댓글
        내용내용내용내용내용댓글 내용내용내용내용내용댓글
        내용내용내용내용내용댓글 내용내용내용내용내용댓글 내용내용내용내용내용
      </p>
      <p className="text-14 text-black-350 onlyMobile:text-12">1시간 </p>
    </div>
  );
}
export default Comment;
