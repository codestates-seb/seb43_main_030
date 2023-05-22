import { useState } from 'react';
import axios from 'axios';
import RatingStar from '../RatingStar';
import Button from '../Button/Button';
import dateCalculate from '../dateCalculate';
import ConfirmReview from './ConfirmReview';
import { ReactComponent as StarOn } from '../../images/star-on.svg';
import { ReactComponent as StarOff } from '../../images/star-off.svg';

function ListReview({ post, className }) {
  // post.ratedReview 따라서 별 보이기
  const [reviewModal, setReviewModal] = useState(false);
  const [kinderInfo, setKinderInfo] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  const onReviewModal = () => {
    setReviewModal(true);
    axios
      .get(`${apiUrl}/api/review/${post.reviewId}`)
      .then(response => {
        console.log(response);
        setKinderInfo(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const offReviewModal = () => {
    console.log('dd');
    setReviewModal(false);
  };

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
          <div className="w-full">
            <div className="flex w-full items-center justify-between">
              <div className="flex w-full">
                <div className={className}>
                  <div className="user-profile mr-16 h-40 w-40">
                    <img src={post.profileImageUrl} alt="profileImage" />
                  </div>
                </div>
                <div className="flex w-full flex-col">
                  <div className={className}>
                    <div className="mb-4 flex">
                      {/* <div className="mb-4 grid w-full grid-cols-[auto-fit_minmax(200px,_1fr)]"> */}
                      {/* grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); */}
                      <p className="mr-4 text-16 font-bold onlyMobile:text-14">
                        {post.profileName}
                      </p>
                      <p className="text-14 text-black-350 onlyMobile:text-12">
                        {post.email}
                      </p>
                    </div>
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
            <p className="list-content h-text-max mt-16 max-h-[50px] onlyMobile:max-h-[40px] onlyMobile:min-w-180">
              {post.content}
            </p>
            <Button
              className="btn-text-default py-4 text-left text-14 font-bold text-black-900"
              onClick={onReviewModal}
            >
              자세히 보기
            </Button>
          </div>
          <div className="user-profile ml-24 h-108 w-108 onlyMobile:h-96 onlyMobile:w-96 onlyMini:h-56 onlyMini:w-56">
            {post.reviewImageUrl === null ? (
              ''
            ) : (
              <img src={post.reviewImageUrl} alt="img" />
            )}
          </div>
          {reviewModal ? (
            <ConfirmReview
              offReviewModal={offReviewModal}
              name={post.profileName}
              kinderInfo={kinderInfo}
              kindergartenName={post.kindergartenName}
              kindergartenLocations={post.kindergartenLocations}
              // kindergartenImageUrl={post.kindergartenImageUrl}
              // kindergartenRatedReviewsAvg={post.kindergartenRatedReviewsAvg}
              // kindergartenRatedReviewsCount={post.kindergartenRatedReviewsCount}
            />
          ) : null}
        </li>
      </ul>
    </div>
  );
}
export default ListReview;
