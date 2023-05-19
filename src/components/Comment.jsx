import { useState } from 'react';
import axios from 'axios';
import { ReactComponent as More } from '../images/more.svg';
import Dog from '../images/dog.jpeg';
import Input from './Input/Input';
import Button from './Button/Button';

function Comment({
  commentId,
  name,
  email,
  text,
  modifiedAt,
  postId,
  modified,
  profileImg,
}) {
  const [moreSelect, setMoreSelect] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const [onDelete, setOnDelete] = useState(false);
  const [commentError, setCommentError] = useState('');

  const onDeleteModal = () => {
    setOnDelete(true);
  };

  const handleEditClick = () => {
    setIsEditMode(true);
    setMoreSelect(!moreSelect);
  };

  const handleSaveClick = postId => {
    if (text.length !== 0) {
      setEditedText(text);
      setIsEditMode(false);

      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/post/${postId}/comment/${commentId}`,
          {
            postId,
            commenetId: commentId,
            content: editedText,
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
          if (error.response && error.response.status === 403) {
            alert('본인이 작성한 댓글만 수정할 수 있어요❗️');
          }
        });
    } else {
      setCommentError('댓글 내용을 입력헤주세요.');
    }

    // const now = new Date();
    // const dateString = now.toLocaleString();
  };

  const handleChange = e => {
    setEditedText(e.target.value);
    if (e.target.value.length !== 0) {
      setCommentError('');
    } else {
      setCommentError('댓글 내용을 입력해주세요.');
    }
  };

  const handleClick = () => {
    setMoreSelect(!moreSelect);
  };

  function deleteComment(commentId) {
    const result = window.confirm('댓글을 삭제하시겠습니까?');
    if (result) {
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
          if (error.response && error.response.status === 403) {
            setMoreSelect(!moreSelect);
            alert('본인이 작성한 댓글만 삭제할 수 있어요❗️');
          }
        });
    }
  }

  return (
    <div className="pb-32">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="user-profile h-32 w-32 onlyMobile:h-24 onlyMobile:w-24">
            <img src={profileImg} alt="임시이미지" />
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
        <div className="flex flex-row items-start">
          <Input
            type="text"
            value={editedText}
            isError={commentError}
            onChange={e => handleChange(e)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleSaveClick(postId);
              }
            }}
            className="mt-5 w-[100%] text-16 text-black-900 onlyMobile:text-12"
          />
          <Button
            className="btn-size-l color-yellow ml-8 mt-5 shrink-0"
            onClick={() => handleSaveClick(postId)}
          >
            수정
          </Button>
        </div>
      ) : (
        <p className="mb-10 mt-5 text-16 text-black-900 onlyMobile:text-12">
          {text}
          {modified ? (
            <div className="ml-10 inline-block text-12 text-black-350">
              (수정됨)
            </div>
          ) : null}
        </p>
      )}
      <p className="mt-10 text-14 text-black-350 onlyMobile:text-12">
        {/* {new Date(modifiedAt).toLocaleString()} */}
        {new Date(
          new Date(modifiedAt).getTime() + 9 * 60 * 60 * 1000,
        ).toLocaleString()}
      </p>
    </div>
  );
}
export default Comment;
