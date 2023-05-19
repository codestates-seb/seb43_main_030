import { useState } from 'react';
import { ReactComponent as Star } from '../images/star.svg';

function RatingStar({ handleStarIndexChange, prevRatedReview }) {
  const [starIndex, setStarIndex] = useState(prevRatedReview);
  const handleClick = index => {
    setStarIndex(index);
    handleStarIndexChange(index);
  };

  return (
    <div className="flex">
      <Star
        className="mr-2"
        onClick={() => {
          handleClick(1);
        }}
        fill={starIndex >= 1 ? '#ffd337 ' : ' #E3E5E8'}
      />
      <Star
        className="mr-2"
        onClick={() => {
          handleClick(2);
        }}
        fill={starIndex >= 2 ? '#ffd337 ' : ' #E3E5E8'}
      />
      <Star
        className="mr-2"
        onClick={() => {
          handleClick(3);
        }}
        fill={starIndex >= 3 ? '#ffd337 ' : ' #E3E5E8'}
      />
      <Star
        className="mr-2"
        onClick={() => {
          handleClick(4);
        }}
        fill={starIndex >= 4 ? '#ffd337 ' : ' #E3E5E8'}
      />
      <Star
        onClick={() => {
          handleClick(5);
        }}
        fill={starIndex >= 5 ? '#ffd337 ' : ' #E3E5E8'}
      />
    </div>
  );
}

export default RatingStar;
