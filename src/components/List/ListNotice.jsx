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
            <p className="list-content h-text-max max-h-[50px] onlyMobile:max-h-[40px] onlyMobile:min-w-180">
              {post.content}
            </p>
            <span className="list-gray-small mt-16">
              {dateCalculate(post.createdAt)}
            </span>
          </div>
          <div className="user-profile ml-24 h-108 w-108  onlyMobile:h-96 onlyMobile:w-96 onlyMini:h-56 onlyMini:w-56">
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
