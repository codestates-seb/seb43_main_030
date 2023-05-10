import dateCalculate from '../dateCalculate';

function ListNotice(props) {
  const { title, contents, images, createdAt } = props;
  return (
    <div>
      <ul>
        <li className="list-flex w-full">
          <div className="flex w-full flex-col justify-start">
            <p className="list-title h-text-max mb-8 max-h-[30px]">
              {/* 공지제목공지제목공지제목공지제목공지제목공지제목 */}
              {title}
            </p>
            <p className="list-content h-text-max max-h-[50px]">
              {/* 공지내용미리보기공지내용미리보기공지내용미리보기공지내용미리보기공지내용미리보기공지내용미리보기 */}
              {contents}
            </p>
            <span className="list-gray-small mt-16">
              {dateCalculate(createdAt)}
            </span>
          </div>
          {images && images.length !== 0 ? (
            <div className="list-notice-image ml-24" />
          ) : (
            ''
          )}
        </li>
      </ul>
    </div>
  );
}
export default ListNotice;
