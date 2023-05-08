import { ReactComponent as Search } from '../../images/search.svg';

function ListCommunity() {
  return (
    <div>
      <ul>
        <li className="max-w-1030 flex items-center">
          <div className="list-notice-image" />
          <div className="pl-24">
            <p className="list-title">커뮤니티 게시글꺼</p>
            <p className="list-content mt-5">
              커뮤니티 게시글 게시글 게시글 게시글 게시게시게시글
            </p>
            <div className="mt-16 flex">
              <div className="flex items-center">
                <div className="list-user-image-small" />
                <p className="after:content=[''] list-line relative pl-5 pr-12 text-14 font-bold text-black-900">
                  콩이쫑이맘{' '}
                </p>
              </div>
              <p className="list-gray-small flex pl-12">
                <Search />
                조회 1,212
              </p>
              <p className="list-gray-small flex pl-12">
                <Search />
                좋아요 12
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
export default ListCommunity;
