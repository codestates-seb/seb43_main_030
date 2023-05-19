import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Parser from 'html-react-parser';
import cls from '../../utils/tailwind';
import dateCalculate from '../dateCalculate';
import { ReactComponent as Search } from '../../images/search.svg';
import { ReactComponent as View } from '../../images/view.svg';
import { ReactComponent as PerpettOff } from '../../images/perpett-off.svg';
import Dog from '../../images/dog.jpeg';
import profile from '../../images/profile.png';

function ListCommunity(props) {
  const { post, onClick, className } = props;
  const [content, setContent] = useState('');

  useEffect(() => {
    setContent(post.content.slice(0, 40));
  }, [setContent, post.content]);

  return (
    <li className="flex items-center" key={post.postId}>
      <div className="user-profile mr-24 h-108 w-108 onlyMobile:mr-15 onlyMobile:h-96 onlyMobile:w-96 onlyMini:h-56 onlyMini:w-56">
        {post.postImageUrl ? (
          <img src={post.postImageUrl} alt="img" />
        ) : (
          <img src={profile} alt="defaultImage" />
        )}
      </div>
      <div className="my-30 w-full onlyMini:my-20 onlyMini:w-[calc(100%-72px)]">
        <Link to={`/post/${post.postId}`} className="block ">
          <p className="list-title">{post.title}</p>
          {Parser(`
          <p className="list-content mt-5 truncate">
            ${content.replace(/(<([^>]+)>)/gi, '')}
          </p>
          `)}
        </Link>
        <div className="mt-16 flex items-center justify-between onlyMini:mt-8">
          <div className="flex-between flex onlyMini:flex-col ">
            <div className={className}>
              <div className="user-profile-small">
                {post.profileImageUrl ? (
                  <img src={post.profileImageUrl} alt="img" />
                ) : (
                  <img src={profile} alt="defaultImage" />
                )}
              </div>
              <p className="after:content=[''] list-line onlyMini: relative shrink-0 pl-5 pr-12 text-14 font-bold text-black-900 onlyMobile:text-12 onlyMini:after:hidden">
                {post.name}
              </p>
            </div>
            <div className="flex onlyMini:hidden">
              <p className="list-gray-small flex items-center pr-12">
                <View width="16" height="16" className="mr-5" />
                <span className="mr-4 onlyMobile:hidden">조회</span>
                {post.views}
              </p>
              <p className="list-gray-small flex items-center">
                <PerpettOff width="16" height="16" className="mr-5" />
                <span className="mr-4 onlyMobile:hidden">좋아요</span>{' '}
                {post.likeCount}
              </p>
            </div>
          </div>
          <p className="flex items-center text-14 text-black-350 onlyMobile:text-12">
            {post.modified && (
              <span className=" mr-6 rounded-[4px] bg-black-025 px-4 py-2 text-10 text-black-350">
                수정
              </span>
            )}
            {post.modifiedAt
              ? dateCalculate(post.modifiedAt)
              : dateCalculate(post.createdAt)}
          </p>
        </div>
      </div>
    </li>
  );
}
export default ListCommunity;
