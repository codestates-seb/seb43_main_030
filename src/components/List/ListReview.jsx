import RatingStar from '../RatingStar';

function ListReview() {
  return (
    <div>
      <ul>
        <li className="list-flex w-full">
          <div className="mr-24 w-full">
            <div className="flex w-full items-center justify-between">
              <div className="flex w-full">
                <div className="list-user-image mr-16" />
                <div className="flex w-full flex-col">
                  <div className="flex items-center gap-2">
                    <p className="list-title">작성자</p>
                    <p className="text-14 text-black-350">이메일</p>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <RatingStar />
                    <p className="list-gray-small">23.01.01</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="list-content h-text-max mt-16 max-h-[50px]">
              후기내용후기내용후기내용후기내용후기내용미리보기용후기내용미리보기
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
