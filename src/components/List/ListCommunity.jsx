import { Link } from 'react-router-dom';
import { ReactComponent as Search } from '../../images/search.svg';
import { ReactComponent as View } from '../../images/view.svg';
import { ReactComponent as PerpettOff } from '../../images/perpett-off.svg';
import Dog from '../../images/dog.jpeg';

function ListCommunity(props) {
  const { post, onClick } = props;

  return (
    <li className="flex items-center" key={post.id}>
      <div className="user-profile mr-24 h-108 w-108 onlyMobile:mr-15 onlyMobile:h-96 onlyMobile:w-96 onlyMini:h-56 onlyMini:w-56">
        <img src={Dog} alt="임시이미지" />
      </div>
      <div className="my-30 w-full onlyMini:w-[calc(100%-72px)]">
        <Link to={`/post/${post.id}`} className="block ">
          <p className="list-title">{post.title}</p>
          <p className="list-content mt-5 truncate">
            {post.contents.text.slice(0, 40)}
          </p>
        </Link>
        <div className="mt-16 flex items-center justify-between onlyMini:mt-8">
          <div className="flex-between flex onlyMini:flex-col ">
            <div className="flex items-center">
              <div className="user-profile-small">
                <img src={Dog} alt="임시이미지" />
              </div>
              <p className="after:content=[''] list-line onlyMini: relative shrink-0 pl-5 pr-12 text-14 font-bold text-black-900 onlyMobile:text-12 onlyMini:after:hidden">
                콩이쫑이맘{' '}
              </p>
            </div>
            <div className="flex onlyMini:hidden">
              <p className="list-gray-small flex items-center pl-12">
                <View width="16" height="16" className="mr-5" />
                <span className="mr-4 onlyMobile:hidden">조회</span>1,212
              </p>
              <p className="list-gray-small flex items-center pl-12">
                <PerpettOff width="16" height="16" className="mr-5" />
                <span className="mr-4 onlyMobile:hidden">좋아요</span>{' '}
                {post.likes}
              </p>
            </div>
          </div>
          <p className="text-14 text-black-350 onlyMobile:text-12 ">
            {post.date}
          </p>
        </div>
      </div>
    </li>
  );
}
export default ListCommunity;
