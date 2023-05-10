import { useMediaQuery } from 'react-responsive';
import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import Button from '../components/Button/Button';
import Radio from '../components/Radio/Radio';
import RadioGroup from '../components/Radio/RadioGroup';
import TextArea from '../components/TextArea';
import Dog from '../images/dog.jpeg';

function Post() {
  const [areaFilter, setAreaFilter] = useState(''); // category
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userProfile, setUserProfile] = useState({});
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  useEffect(() => {
    axios
      .get('http://localhost:3001/profile1')
      .then(response => {
        setUserProfile(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const saveTitle = event => {
    setTitle(event.target.value);
  };

  const submitData = event => {
    if (!areaFilter || !title || !content) {
      alert('내용을 입력해주세요.');
      return;
    }

    const currentDate = new Date();
    const postObject = {
      title,
      content,
      category: 'community',
      date: currentDate,
    };

    axios
      .post('http://localhost:3001/post', { postObject })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="mb-64 flex flex-col items-center pt-130 onlyMobile:pt-92">
      <div className="w-full max-w-[1162px] px-50 onlyMobile:px-20">
        <div className="flex-between flex border-b border-black-070 pb-30">
          <h3 className="w-full text-28 font-bold onlyMobile:text-22">
            글쓰기
          </h3>
          {!isMobile ? (
            <div className="flex shrink-0">
              <Button className="btn-size-l mr-10">취소</Button>
              <Button className="btn-size-l color-yellow" onClick={submitData}>
                등록하기
              </Button>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="border-b border-black-070 py-50 onlyMobile:py-32">
          <p className="write-title">현재 프로필</p>
          <p className="write-sub-title">
            다른 프로필로 글을 작성하고 싶으신 경우 프로필을 변경 후 글을
            작성해주세요.
          </p>
          <div className="flex">
            <div className="user-profile h-64 w-64">
              <img src={userProfile.imageUrl} alt="임시이미지" />
            </div>
            <div className=" ml-10 flex flex-col items-start justify-center">
              <p className="text-left text-16 font-bold onlyMobile:text-12">
                {userProfile.name}
              </p>
              <p className="text-10 text-black-350">{userProfile.email}</p>
            </div>
          </div>
        </div>
        <div className="border-b border-black-070 py-50 onlyMobile:py-32">
          <p className="write-title">카테고리 선택</p>
          <p className="write-sub-title">
            견주님의 경우 공지사항 카테고리에는 글을 작성하실 수 없습니다.
            커뮤니티를 선택 후 글을 작성해주세요!
          </p>
          <RadioGroup>
            <Radio
              id="category1"
              name="contact"
              value="community"
              defaultChecked
              labelClass="text-14"
            >
              커뮤니티
            </Radio>
            <Radio
              id="category2"
              name="contact"
              value="notification"
              labelClass="text-14 disabled:black-200"
              disabled
            >
              공지사항
            </Radio>
          </RadioGroup>
        </div>

        <div className="border-b border-black-070 py-50 onlyMobile:py-32">
          <p className="write-title">제목</p>
          <p className="write-sub-title">
            작성하시는 글의 제목을 입력해주세요.
          </p>
          <div>
            <TextArea
              value={title}
              maxLength="80"
              placeholder="제목을 입력해주세요."
              onChange={saveTitle}
            />
          </div>
        </div>

        <div className=" py-50 onlyMobile:py-32">
          <p className="write-title">내용</p>
          <p className="write-sub-title">
            작성하시는 글의 내용을 입력해주세요.
          </p>
          <div>
            <CKEditor
              editor={ClassicEditor}
              data="<p>내용을 입력해주세요.</p>"
              onChange={(event, editor) => {
                const data = editor.getData();
                setContent(data);
              }}
            />
          </div>
        </div>
      </div>
      {isMobile ? (
        <div className="fixed bottom-0 left-0 z-10 flex w-full bg-white px-20 py-10 shadow-bottomBoxShadow">
          <Button className="btn-size-l grow">취소</Button>
          <Button className="btn-size-l color-yellow grow">등록하기</Button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default Post;
