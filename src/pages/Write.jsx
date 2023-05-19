import { useMediaQuery } from 'react-responsive';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import dateCalculate from '../components/dateCalculate';
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
  const [userProfile, setUserProfile] = useState({});
  const [img, setImg] = useState([]);
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const navigate = useNavigate();
  const { postId } = useParams();
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/users/profile/currentProfile`, {
        headers: { Authorization: localStorage.getItem('token') },
      })
      .then(response => {
        setUserProfile(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [apiUrl]);

  useEffect(() => {
    if (postId) {
      axios
        .get(`${apiUrl}/community/1/post/${postId}`)
        .then(response => {
          console.log(response.data.data);
          setTitle(response.data.data.title);
          setContent(response.data.data.content);
          setContents(
            content,
            response.data.data.image &&
              `<figure class=${response.data.data.images[0]}><img src=${response.data.data.images[0]} /></figure>`,
          );
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [apiUrl, postId, content]);

  const customUploadAdapter = loader => {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          loader.file.then(file => {
            setImg(preImg => [...preImg, file]);
            // setImg(file);
            // const formData = new FormData();
            // formData.append('images', file);
            // axios
            //   .post(`${apiUrl}/community/1/post`, formData, {
            //     headers: {
            //       Authorization: localStorage.getItem('token'),
            //       'Content-Type': 'multipart/form-data',
            //     },
            //   })
            //   .then(res => {
            //     resolve({
            //       default: res.data.data.uri,
            //     });
            //     console.log(res.data.data.uri);
            //   })
            //   .catch(err => console.log(err, file));
          });
        });
      },
    };
  };
  function uploadPlugin(editor) {
    // eslint-disable-next-line no-param-reassign
    editor.plugins.get('FileRepository').createUploadAdapter = loader => {
      return customUploadAdapter(loader);
    };
  }

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
    const dateString = dateCalculate(currentDate);

    const formData = new FormData();

    img.forEach(image => {
      formData.append('images', image);
    });

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
        .patch(`${apiUrl}/community/1/post/${postId}`, formData, headers)
        .then(response => console.log(response))
        .then(navigate(`/post/${postId}`))
        .catch(error => {
          console.log(error);
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
        .post(`${apiUrl}/community/1/post`, formData, headers)
        .then(response => console.dir(response))
        .then(navigate(`/community`))
        .catch(error => {
          console.log(error);
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
              {userProfile.imgageUrl ? (
                <img src={userProfile.imageUrl} alt="프로필이미지" />
              ) : (
                <img src={defaultImg} alt="임시이미지" />
              )}
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
            {postId ? (
              <CKEditor
                editor={ClassicEditor}
                config={
                  ({
                    placeholder: '내용을 입력해주세요.',
                  },
                  { extraPlugins: [uploadPlugin] })
                }
                data={contents}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setContents(data);
                }}
              />
            ) : (
              <CKEditor
                editor={ClassicEditor}
                config={
                  ({
                    placeholder: '내용을 입력해주세요.',
                  },
                  { extraPlugins: [uploadPlugin] })
                }
                data={content}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setContent(data);
                }}
              />
            )}
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
