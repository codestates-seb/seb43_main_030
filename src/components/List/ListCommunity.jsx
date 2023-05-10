import { ReactComponent as Search } from '../../images/search.svg';
import { ReactComponent as View } from '../../images/view.svg';
import { ReactComponent as PerpettOff } from '../../images/perpett-off.svg';
import Dog from '../../images/dog.jpeg';

function ListCommunity() {
  return (
    <li className="flex items-center">
      <div className="user-profile mr-24 h-108 w-108 onlyMobile:mr-15 onlyMobile:h-96 onlyMobile:w-96">
        <img src={Dog} alt="임시이미지" />
      </div>
      <div className="my-30 w-full">
        <p className="list-title">커뮤니티 게시글꺼</p>
        <p className="list-content mt-5">
          커뮤니티 게시글 게시글 게시글 게시글 게시게시게시글
        </p>
        <div className="mt-16 flex flex w-full items-center justify-between">
          <div className="flex">
            <div className="flex items-center">
              <div className="user-profile-small">
                <img src={Dog} alt="임시이미지" />
              </div>
              <p className="after:content=[''] list-line relative pl-5 pr-12 text-14 font-bold text-black-900 onlyMobile:text-12">
                콩이쫑이맘{' '}
              </p>
            </div>
            <p className="list-gray-small flex items-center pl-12">
              <View width="16" height="16" className="mr-5" />
              조회 1,212
            </p>
            <p className="list-gray-small flex items-center pl-12">
              <PerpettOff width="16" height="16" className="mr-5" />
              좋아요 12
            </p>
          </div>
          <p className="text-14 text-black-350 onlyMobile:text-12 ">23.00.00</p>
        </div>
      </div>
    </li>
  );
}
export default ListCommunity;
