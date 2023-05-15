import { useState } from 'react';
import axios from 'axios';
import { ReactComponent as More } from '../images/more.svg';
import Dog from '../images/dog.jpeg';
import Input from './Input/Input';
import Button from './Button/Button';

function Comment({
  profileId,
  commentId,
  name,
  imageUrl,
  email,
  text,
  createdAt,
  postId,
}) {
  const [moreSelect, setMoreSelect] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEditClick = () => {
    setIsEditMode(true);
    setMoreSelect(!moreSelect);
  };

  const handleSaveClick = postId => {
    setEditedText(text);
    setIsEditMode(false);

    const now = new Date();
    const dateString = now.toLocaleString();

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/post/${postId}/comment/${commentId}`,
        {
          data: {
            postId,
            commenetId: commentId,
            content: editedText,
          },
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
      )
      .then(response => {
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleChange = e => {
    setEditedText(e.target.value);
  };

  const handleClick = () => {
    setMoreSelect(!moreSelect);
  };

  function deleteComment(commentId) {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/post/${postId}/comment/${commentId}`,
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
      )
      .then(response => {
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div className="pb-32">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="user-profile h-32 w-32 onlyMobile:h-24 onlyMobile:w-24">
            <img src={Dog} alt="임시이미지" />
          </div>
          <span className="px-8 text-14">{name}</span>
          <span className="text-14 text-black-350 onlyMobile:text-12">
            {email}
          </span>
        </div>
        <div className="relative">
          <button type="button">
            <More width="16" height="16" onClick={handleClick} />
          </button>
          {moreSelect ? (
            <ul className="absolute right-[-25px] flex flex w-80 flex-col items-center justify-center rounded-[10px] bg-white p-10 shadow-dropDownShadow">
              <li
                onClick={() => handleEditClick()}
                role="presentation"
                className=" flex w-full cursor-pointer items-center justify-center rounded-md px-8 py-10 text-14 hover:bg-black-025 onlyMobile:text-12"
              >
                수정
              </li>
              <li
                onClick={() => deleteComment(commentId)}
                role="presentation"
                className="flex w-full cursor-pointer items-center justify-center rounded-md px-8 py-10 text-14 hover:bg-black-025 onlyMobile:text-12"
              >
                삭제
              </li>
            </ul>
          ) : (
            ''
          )}
        </div>
      </div>
      {isEditMode ? (
        <div className="flex flex-row items-center">
          <Input
            type="text"
            value={editedText}
            onChange={e => handleChange(e)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleSaveClick(commentId);
              }
            }}
            className="mb-10 mt-5 w-[100%] text-16 text-black-900 onlyMobile:text-12"
          />
          <Button
            className="btn-size-l color-yellow ml-8 shrink-0"
            onClick={() => handleSaveClick(commentId)}
          >
            수정
          </Button>
        </div>
      ) : (
        <p className="mb-10 mt-5 text-16 text-black-900 onlyMobile:text-12">
          {text}
        </p>
      )}
      <p className="text-14 text-black-350 onlyMobile:text-12">{createdAt}</p>
    </div>
  );
}
export default Comment;
