import { useState } from 'react';
import RatingStar from '../RatingStar';
import Button from '../Button/Button';
import dateCalculate from '../dateCalculate';
import { ReactComponent as StarOn } from '../../images/star-on.svg';
import { ReactComponent as StarOff } from '../../images/star-off.svg';

function ListReview({ post, onClick }) {
  // post.ratedReview 따라서 별 보이기
  const starScore = () => {
    const ratedStar = Math.floor(post.ratedReview);
    const ratingStar = [];

    for (let i = 1; i <= 5; i += 1) {
      if (i <= ratedStar) {
        ratingStar.push(<StarOn key={i} />);
      } else {
        ratingStar.push(<StarOff key={i} />);
      }
    }
    return ratingStar.map(star => star);
  };

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
                      {post.profileName}
                    </p>
                    <p className="text-14 text-black-350 onlyMobile:text-12">
                      이메일
                    </p>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex">{starScore()}</div>
                    <p className="list-gray-small">
                      {dateCalculate(post.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p className="list-content h-text-max mt-16 max-h-[50px]">
              {post.contents}
            </p>
            <Button className="btn-text-default py-4 text-left text-14 font-bold text-black-900">
              더보기
            </Button>
          </div>
          {post.imageUrl ? <img src={post.imageUrl} alt="img" /> : ''}
        </li>
      </ul>
    </div>
  );
}
export default ListReview;
