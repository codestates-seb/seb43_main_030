import RatingStar from '../RatingStar';

function ListReview() {
  return (
    <div>
      <ul>
        <li className="list-flex max-w-664">
          <div className="mr-24 w-full">
            <div className="flex w-full items-center justify-between">
              <div className="flex">
                <div className="list-user-image mr-16" />
                <div>
                  <p className="list-title">작성자</p>
                  <RatingStar />
                </div>
              </div>
              <p className="list-gray-small">2023년01월01일</p>
            </div>
            <p className="list-content mt-16">
              후기내용후기내용후기내용후기내용후기내용미리보기
            </p>
            <p className="py-4 text-left text-14 font-bold text-black-900">
              더보기
            </p>
          </div>
          <div className="list-notice-image" />
        </li>
      </ul>
    </div>
  );
}
export default ListReview;
