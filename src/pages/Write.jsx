import { useMediaQuery } from 'react-responsive';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import { setAuth } from '../actions/areaFilterActions';
import QuillEditor from '../utils/quillEditor';
import Button from '../components/Button/Button';
import Radio from '../components/Radio/Radio';
import RadioGroup from '../components/Radio/RadioGroup';
import TextArea from '../components/TextArea';
import defaultImg from '../images/profile.png';

function Write() {
  const [category, setCategory] = useState('community');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [contents, setContents] = useState('');
  const [img, setImg] = useState([]);
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const navigate = useNavigate();
  const { postId } = useParams();
  const { id } = useParams();
  const curProfile = useSelector(state => state.curProfile);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    if (postId) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/community/${id}/post/${postId}`,
        )
        .then(response => {
          setTitle(response.data.data.title);
          setContent(response.data.data.content);
          setContents(content);
        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            text: `error! ${error}`,
            confirmButtonColor: '#FFD337',
          });
        });
    }
  }, [postId, content, id]);

  const saveCategory = event => {
    setCategory(event.target.value);
  };

  const saveTitle = event => {
    setTitle(event.target.value);
  };

  const handleCancel = () => {
    Swal.fire({
      text: '글쓰기를 취소하고 이전 페이지로 돌아가시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FFD337',
      cancelButtonColor: '#ffffff',
      confirmButtonText: '네',
      cancelButtonText: '<span style="color:#000000">아니오<span>',
    }).then(result => {
      if (result.isConfirmed) {
        navigate(-1);
      }
    });
  };

  const submitData = event => {
    if (!title || !content) {
      Swal.fire({
        icon: 'error',
        text: '제목과 내용을 입력해주세요❗️',
        confirmButtonColor: '#FFD337',
      });
      return;
    }

    const formData = new FormData();

    const headers = {
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'multipart/form-data',
      },
    };
    if (postId) {
      const data = {
        title,
        content: contents,
        category,
      };
      formData.append(
        'patchDto',
        new Blob([JSON.stringify(data)], { type: 'application/json' }),
      );
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/api/community/${id}/post/${postId}`,
          formData,
          headers,
        )
        .then(navigate(`/community/${id}/post/${postId}`))
        .then(window.location.reload())
        .catch(error => {
          if (error.response && error.response.status === 401) {
            Swal.fire({
              icon: 'error',
              text: '토큰이 만료되었습니다. 재로그인 해주세요.',
              confirmButtonColor: '#FFD337',
            });
            dispatch(setAuth(false));
            localStorage.removeItem('token');
            navigate(`community/${id}`);
          } else {
            Swal.fire({
              icon: 'error',
              text: `error! ${error}`,
              confirmButtonColor: '#FFD337',
            });
          }
        });
    } else {
      const data = {
        title,
        content,
        category,
      };
      formData.append(
        'postDto',
        new Blob([JSON.stringify(data)], { type: 'application/json' }),
      );
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/community/${id}/post`,
          formData,
          headers,
        )
        .then(response => {
          const url = response.headers.location;
          const naviUrl = url.substring(url.lastIndexOf('/') + 1);
          navigate(`/community/${id}/post/${naviUrl}`);
        })
        .catch(error => {
          if (error.response && error.response.status === 401) {
            Swal.fire({
              icon: 'error',
              text: '토큰이 만료되었습니다. 재로그인 해주세요.',
              confirmButtonColor: '#FFD337',
            });
            dispatch(setAuth(false));
            localStorage.removeItem('token');
            navigate(`community/${id}`);
          } else {
            Swal.fire({
              icon: 'error',
              text: `error! ${error}`,
              confirmButtonColor: '#FFD337',
            });
          }
        });
    }
  };

  return (
    <div className="relative mb-64 flex flex-col items-center pt-130 onlyMobile:pt-92">
      <div className="w-full max-w-[1280px] px-80 onlyMobile:px-20">
        <div
          className="flex-between fixed top-[60px] z-[10] flex w-[calc(100%-160px)] max-w-[1120px] border-b border-black-070
        bg-white pb-30 pt-70 onlyMobile:relative onlyMobile:top-0 onlyMobile:z-0 onlyMobile:w-full onlyMobile:pt-0"
        >
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

        <div className="mt-80 border-b border-black-070 py-50 onlyMobile:mt-0 onlyMobile:py-32">
          <p className="write-title">현재 프로필</p>
          <p className="write-sub-title">
            다른 프로필로 글을 작성하고 싶으신 경우 프로필을 변경 후 글을
            작성해주세요.
          </p>
          <div className="flex">
            <div className="user-profile h-64 w-64">
              {curProfile.imageUrl ? (
                <img src={curProfile.imageUrl} alt="프로필이미지" />
              ) : (
                <img src={defaultImg} alt="임시이미지" />
              )}
            </div>
            <div className=" ml-10 flex flex-col items-start justify-center">
              <p className="text-left text-16 font-bold onlyMobile:text-12">
                {curProfile.name}
              </p>
              <p className="text-10 text-black-350">{curProfile.email}</p>
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
              maxLength="40"
              placeholder="제목을 입력해주세요."
              onChange={saveTitle}
              textClass="box-border h-20 w-full overflow-x-auto my-15"
              className="flex items-center"
            />
          </div>
        </div>

        <div className=" py-50 onlyMobile:py-32">
          <p className="write-title">내용</p>
          <p className="write-sub-title">
            작성하시는 글의 내용을 입력해주세요.
          </p>
          <div>
            <QuillEditor
              setImg={setImg}
              content={content}
              setContent={setContent}
              contents={contents}
              setContents={setContents}
              postId={postId}
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

export default Write;
