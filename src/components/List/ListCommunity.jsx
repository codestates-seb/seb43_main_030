import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Parser from 'html-react-parser';
import { ReactComponent as Search } from '../../images/search.svg';
import { ReactComponent as View } from '../../images/view.svg';
import { ReactComponent as PerpettOff } from '../../images/perpett-off.svg';
import Dog from '../../images/dog.jpeg';
import profile from '../../images/profile.png';

function ListCommunity(props) {
  const { post, onClick } = props;
  const [content, setContent] = useState('');

  useEffect(() => {
    setContent(post.content.slice(0, 40));
  }, [setContent, post.content]);
  // console.log(post);
  return (
    <li className="flex items-center" key={post.postId}>
      <div className="user-profile mr-24 h-108 w-108 onlyMobile:mr-15 onlyMobile:h-96 onlyMobile:w-96 onlyMini:h-56 onlyMini:w-56">
        {post.imageUrl ? (
          <img src={post.imageUrl} alt="img" />
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
            <div className="flex items-center">
              <div className="user-profile-small">
                {post.imageUrl ? (
                  <img src={post.imageUrl} alt="img" />
                ) : (
                  <img src={profile} alt="defaultImage" />
                )}
              </div>
              <p className="after:content=[''] list-line onlyMini: relative shrink-0 pl-5 pr-12 text-14 font-bold text-black-900 onlyMobile:text-12 onlyMini:after:hidden">
                콩이쫑이맘{' '}
              </p>
            </div>
            <div className="flex onlyMini:hidden">
              <p className="list-gray-small flex items-center pl-12">
                <View width="16" height="16" className="mr-5" />
                <span className="mr-4 onlyMobile:hidden">조회</span>
                {post.views}
              </p>
              <p className="list-gray-small flex items-center pl-12">
                <PerpettOff width="16" height="16" className="mr-5" />
                <span className="mr-4 onlyMobile:hidden">좋아요</span>{' '}
                {post.likeCount}
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
