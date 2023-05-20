import { useState, useRef } from 'react';
import cls from '../utils/tailwind';

function UploadImage(props) {
  const { className, setImage, image, prevImages } = props;

  const [display, setDisplay] = useState('');

  const fileInput = useRef(null);

  const handleFileChange = e => {
    const uploadFiles = e.target.files;
    const newImages = [];

    if (uploadFiles && uploadFiles.length > 0) {
      for (let i = 0; i < uploadFiles.length; i += 1) {
        setImage(uploadFiles[i]);
        // setImage(uploadFiles);
      }
    } else {
      setImage([]);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setDisplay(reader.result);
      }
    };
    reader.readAsDataURL(uploadFiles[0]);
    // reader.readAsDataURL(uploadFiles[0]);
  };

  const deleteImage = e => {
    console.log(e.target.files);
  };

  return (
    <div className="h-80 w-80">
      {/* <label htmlFor="uploadImage" className="cursor-pointer"> */}
      {prevImages ? (
        <>
          {/* <div className="h-80 w-80 bg-black-350"></div> */}
          <div
            className="user-profile flex-center relative z-50 overflow-hidden"
            onClick={() => {
              fileInput.current.click();
            }}
            onKeyDown={() => {}}
            tabIndex={0}
            role="button"
          >
            <img
              src={prevImages.imageUrl}
              alt="Uploaded"
              className="h-full w-full object-cover blur-[5px] onlyMobile:blur-[5px]"
            />
            {/* <div className="absolute left-0 top-0 h-full w-full bg-black opacity-50" />
            <p
              className="z-100 absolute right-0 top-0 p-8 text-white"
              // onClick={deleteImage()}
              role="presentation"
            >
              삭제
            </p> */}
          </div>
        </>
      ) : image ? (
        <div
          className="user-profile overflow-hidden"
          onClick={() => {
            fileInput.current.click();
          }}
          onKeyDown={() => {}}
          tabIndex={0}
          role="button"
        >
          <img
            src={display}
            alt="Uploaded"
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div
          className="flex-center mr-10 flex h-80 w-80 rounded-[8px] bg-black-050"
          onClick={() => {
            fileInput.current.click();
          }}
          onKeyDown={() => {}}
          tabIndex={0}
          role="button"
        >
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
      )}
      <input
        id="uploadImage"
        type="file"
        ref={fileInput}
        accept="image/jpg, image/png, image/jpeg"
        className="hidden"
        onChange={handleFileChange}
      />
      {/* </label> */}
    </div>
  );
}
export default UploadImage;
