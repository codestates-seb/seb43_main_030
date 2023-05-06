import { useState } from 'react';
import cls from '../utils/tailwind';

function UploadImage(props) {
  const { className } = props;
  return (
    <div>
      <label htmlFor="uploadImage">
        <div className={className}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M10.9999 1.51474C10.9999 0.962455 10.5522 0.51474 9.99993 0.51474C9.44765 0.51474 8.99993 0.962455 8.99993 1.51474V9.00002L1.51465 9.00002C0.962364 9.00002 0.514648 9.44773 0.514648 10C0.514648 10.5523 0.962364 11 1.51465 11H8.99993V18.4853C8.99993 19.0376 9.44765 19.4853 9.99993 19.4853C10.5522 19.4853 10.9999 19.0376 10.9999 18.4853V11H18.4852C19.0375 11 19.4852 10.5523 19.4852 10C19.4852 9.44774 19.0375 9.00002 18.4852 9.00002L10.9999 9.00002V1.51474Z"
              fill="#9199A1"
            />
          </svg>
        </div>
        <input id="uploadImage" type="file" className="hidden" />
      </label>
    </div>
  );
}
export default UploadImage;
