import RatingStar from '../RatingStar';
import Button from '../Button/Button';
import dateCalculate from '../dateCalculate';

function ListReview({ id, contents, images, ratedReview, createdAt }) {
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
                    <p className="text-16 font-bold onlyMobile:text-14">
                      작성자
                    </p>
                    <p className="text-14 text-black-350 onlyMobile:text-12">
                      이메일
                    </p>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <RatingStar />
                    <p className="list-gray-small">
                      {dateCalculate(createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p className="list-content h-text-max mt-16 max-h-[50px]">
              {contents}
              {/* 후기내용후기내용후기내용후기내용후기내용미리보기용후기내용미리보기 */}
            </p>
            <Button className="btn-text-default py-4 text-left text-14 font-bold text-black-900">
              더보기
            </Button>
          </div>
          {images.length !== 0 ? <div className="list-notice-image" /> : ''}
        </li>
      </ul>
    </div>
  );
}
export default ListReview;
