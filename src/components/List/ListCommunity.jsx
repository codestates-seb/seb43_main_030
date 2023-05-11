import { Link } from 'react-router-dom';
import { ReactComponent as Search } from '../../images/search.svg';
import { ReactComponent as View } from '../../images/view.svg';
import { ReactComponent as PerpettOff } from '../../images/perpett-off.svg';
import Dog from '../../images/dog.jpeg';

function ListCommunity(props) {
  const { post, id, onClick } = props;
  return (
    <li className="flex items-center" key={id}>
      <div className="user-profile mr-24 h-108 w-108 onlyMobile:mr-15 onlyMobile:h-96 onlyMobile:w-96">
        <img src={Dog} alt="임시이미지" />
      </div>
      <div className="my-30 w-full">
        <Link to={`/post/${post.id}`}>
          <p className="list-title">{post.title}</p>
          <p className="list-content mt-5">{post.content.slice(0, 60)}</p>
        </Link>
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
              좋아요 {post.likes}
            </p>
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
