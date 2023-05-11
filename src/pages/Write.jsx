import { useMediaQuery } from 'react-responsive';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import Button from '../components/Button/Button';
import Radio from '../components/Radio/Radio';
import RadioGroup from '../components/Radio/RadioGroup';
import TextArea from '../components/TextArea';

function Post() {
  const [category, setCategory] = useState('community');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userProfile, setUserProfile] = useState({});
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const navigate = useNavigate();
  const { postId } = useParams();

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

  useEffect(() => {
    axios
      .get(`http://localhost:3001/post/${postId}`)
      .then(response => {
        setTitle(response.data.title);
        setContent(response.data.content);
      })
      .catch(error => {
        console.log(error);
      });
  }, [postId]);

  const saveCategory = event => {
    setCategory(event.target.value);
  };

  const saveTitle = event => {
    setTitle(event.target.value);
  };

  const handleCancel = () => {
    const result = window.confirm(
      '글쓰기를 취소하고 이전 페이지로 돌아가시겠습니까?',
    );
    if (result) {
      navigate(-1);
    }
  };

  const submitData = event => {
    if (!title || !content) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    const currentDate = new Date();
    const postData = {
      title,
      content,
      category,
      date: currentDate,
      comment: [],
      likes: 0,
    };

    if (postId) {
      axios
        .put(`http://localhost:3001/post/${postId}`, postData)
        .then(navigate(`/post/${postId}`))
        .catch(error => {
          console.log(error);
        });
    } else {
      axios
        .post(`http://localhost:3001/post`, postData)
        .then(navigate(`/community`))
        .catch(error => {
          console.log(error);
        });
    }
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
              <Button className="btn-size-l mr-10" onClick={handleCancel}>
                취소
              </Button>
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
              onChange={saveCategory}
            >
              커뮤니티
            </Radio>
            <Radio
              id="category2"
              name="contact"
              value="notification"
              labelClass="text-14 disabled:black-200"
              onChange={saveCategory}
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
              // defaultValue={title}
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
              data={content || `<p>내용을 입력해주세요.</p>`}
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
          <Button className="btn-size-l grow" onClick={handleCancel}>
            취소
          </Button>
          <Button className="btn-size-l color-yellow grow" onClick={submitData}>
            등록하기
          </Button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default Post;
