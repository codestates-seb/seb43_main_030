import { useState } from 'react';
import axios from 'axios';
import { ReactComponent as More } from '../images/more.svg';
import Dog from '../images/dog.jpeg';

function Comment({ profileId, id, name, imageUrl, email, text, createdAt }) {
  const [moreSelect, setMoreSelect] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = id => {
    setEditedText(text);
    setIsEditMode(false);

    const now = new Date();
    const dateString = now.toLocaleString();

    axios
      .put(`http://localhost:3001/comments/${id}`, {
        name,
        email,
        text: editedText,
        createdAt: dateString,
      })
      .then(response => {
        console.log(response.data);
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

  function deleteComment(id) {
    axios
      .delete(`http://localhost:3001/comments/${id}`)
      .then(response => {
        console.log(response.data);
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
                onClick={() => deleteComment(id)}
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
        <input
          type="text"
          value={editedText}
          onChange={e => handleChange(e)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleSaveClick(id);
            }
          }}
          className="mb-10 mt-5 text-16 text-black-900 onlyMobile:text-12"
        />
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
