import dateCalculate from '../dateCalculate';
import profile from '../../images/profile.png';

function ListNotice(props) {
  const { post, onClick } = props;
  return (
    <div>
      <ul>
        <li className="list-flex w-full">
          <div className="flex w-full flex-col justify-start">
            <p className="list-title h-text-max mb-8 max-h-[30px]">
              {post.title}
            </p>
            <p className="list-content h-text-max max-h-[50px]">
              {/* 공지내용미리보기공지내용미리보기공지내용미리보기공지내용미리보기공지내용미리보기공지내용미리보기 */}
              {post.content}
            </p>
            <span className="list-gray-small mt-16">
              {dateCalculate(post.createdAt)}
            </span>
          </div>
          {/* {post.images && post.images.length !== 0 ? (
            <div className="list-notice-image ml-24" />
          ) : (
            ''
          )} */}
          <div className="user-profile ml-24 h-108  w-108">
            {post.imageUrl ? (
              <img src={post.imageUrl} alt="img" />
            ) : (
              <img src={profile} alt="defaultImage" />
            )}
          </div>
        </li>
      </ul>
    </div>
  );
}
export default ListNotice;
