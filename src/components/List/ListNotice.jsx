function ListNotice() {
  return (
    <div>
      <ul>
        <li className="list-flex max-w-664">
          <div className="mr-24 flex w-504 flex-col justify-start pt-15">
            <p className="list-title mb-8 ">
              공지제목공지제목공지제목공지제목공지제목공지제목
            </p>
            <p className="list-content">
              공지내용미리보기공지내용미리보기공지내용미리보기공지내용미리보기공지내용미리보기공지내용미리보기
            </p>
            <span className="list-gray-small mt-16">2023년 00월 00일</span>
          </div>
          <div className="list-notice-image" />
        </li>
      </ul>
    </div>
  );
}
export default ListNotice;
