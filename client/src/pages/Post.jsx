import { useEffect, useState, useCallback } from 'react';
import { useNavigate, Link, useParams, useNavigation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import Parser from 'html-react-parser';
import { setAuth } from '../actions/areaFilterActions';
import { ReactComponent as View } from '../images/view.svg';
import LikeOff from '../images/perpett-off.png';
import LikeOn from '../images/community-like-on.png';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import dateCalculate from '../components/dateCalculate';
import Comment from '../components/Comment';
import profile from '../images/profile.png';

function Post() {
  const [post, setPost] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [like, setLike] = useState(false);
  const [countLike, setCountLike] = useState(0);
  const [images, setImages] = useState([]);
  const [writerInfo, setWriterInfo] = useState([]);
  const [commentError, setCommentError] = useState('');
  const [kinderName, setKinderName] = useState([]);
  const navigate = useNavigate();
  const { postId } = useParams();
  const { id } = useParams();
  const auth = useSelector(state => state.auth);
  const curProfile = useSelector(state => state.curProfile);

  const dispatch = useDispatch();
  const navi = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/post/${postId}/comment`)
      .then(response => {
        setIsPending(true);
        // setPost(response.data[0]);
        setComments(response.data.data);
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          text: `error! ${error}`,
          confirmButtonColor: '#FFD337',
        });
        setIsPending(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function changeInput(e) {
    setCommentInput(e.target.value);
    if (e.target.value.length !== 0) {
      setCommentError('');
    } else {
      setCommentError('댓글 내용을 입력해주세요.');
    }
  }

  function postComment() {
    if (!auth) {
      Swal.fire({
        icon: 'error',
        text: '로그인을 먼저 해주세요❗️',
        confirmButtonColor: '#FFD337',
      }).then(res => {
        navi('/login');
      });
    }
    if (commentInput.length !== 0) {
      const data = {
        postId,
        content: commentInput,
      };

      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/post/${postId}/comment`,
          data,
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
          if (error.response && error.response.status === 401) {
            Swal.fire({
              icon: 'error',
              text: '토큰이 만료되었습니다. 재로그인 해주세요❗️',
              confirmButtonColor: '#FFD337',
            });
            dispatch(setAuth(false));
            localStorage.removeItem('token');
          }
        });
    } else {
      setCommentError('댓글 내용을 입력해주세요.');
    }
  }

  // 유치원 정보
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/community/${id}`)
      .then(response => {
        setKinderName(response.data.data);
      });
  }, [id]);

  // 게시글 정보
  useEffect(() => {
    window.scroll(0, 0);
    const headers = {
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'multipart/form-data',
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/community/${id}/post/${postId}`,
        localStorage.getItem('token') && headers,
      )
      .then(response => {
        setWriterInfo(response.data.data);
        setPost(response.data.data);
        setCountLike(response.data.data.likeCount);
        setLike(response.data.data.like);
        setImages(response.data.data.images);
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          Swal.fire({
            icon: 'error',
            text: '토큰이 만료되었습니다. 재로그인 해주세요❗️',
            confirmButtonColor: '#FFD337',
          });
          dispatch(setAuth(false));
          localStorage.removeItem('token');
        } else {
          Swal.fire({
            icon: 'error',
            text: `error! ${error}`,
            confirmButtonColor: '#FFD337',
          });
        }
      });
  }, [setPost, postId, id, auth, dispatch]);

  // 글삭제
  const handleDelete = useCallback(() => {
    Swal.fire({
      text: '게시글을 삭제하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FFD337',
      cancelButtonColor: '#ffffff',
      confirmButtonText: '네',
      cancelButtonText: '<span style="color:#000000">아니오<span>',
    }).then(result => {
      if (result.isConfirmed) {
        if (!auth) {
          Swal.fire({
            icon: 'error',
            text: '비회원은 글삭제가 불가능합니다❗️',
            confirmButtonColor: '#FFD337',
          });
          return;
        }

        axios
          .delete(
            `${process.env.REACT_APP_API_URL}/api/community/${id}/post/${postId}`,
            {
              headers: { Authorization: localStorage.getItem('token') },
            },
          )
          .then(response => {
            Swal.fire({
              text: '게시글이 삭제되었습니다.',
              confirmButtonColor: '#FFD337',
            }).then(result => {
              navigate(`/community/${id}`);
            });
          })
          .catch(error => {
            // 에러 처리
            console.log(error);
            if (error.response && error.response.status === 403) {
              Swal.fire({
                icon: 'error',
                text: '본인이 작성한 게시글만 삭제할 수 있어요❗️',
                confirmButtonColor: '#FFD337',
              });
            } else if (error.response && error.response.status === 401) {
              Swal.fire({
                icon: 'error',
                text: '토큰이 만료되었습니다. 재로그인 해주세요❗️',
                confirmButtonColor: '#FFD337',
              });
              dispatch(setAuth(false));
              localStorage.removeItem('token');
            } else {
              Swal.fire({
                icon: 'error',
                text: `error! ${error}`,
                confirmButtonColor: '#FFD337',
              });
            }
          });
      }
    });
  }, [id, postId, dispatch, auth, navigate]);

  // 글수정
  const handleEdit = useCallback(() => {
    if (!auth) {
      Swal.fire({
        icon: 'error',
        text: '비회원은 글수정이 불가능합니다❗️',
        confirmButtonColor: '#FFD337',
      });
      return;
    }
    if (
      writerInfo.email === curProfile.email &&
      writerInfo.name === curProfile.name
    ) {
      navigate(`/community/${id}/write/${postId}`);
    } else {
      Swal.fire({
        icon: 'error',
        text: '본인이 작성한 게시글만 수정할 수 있어요❗️',
        confirmButtonColor: '#FFD337',
      });
    }
  }, [writerInfo, curProfile, navigate, postId, id, auth]);

  // 좋아요
  const isLike = () => {
    if (!localStorage.getItem('token')) {
      Swal.fire({
        icon: 'error',
        text: '비회원은 좋아요가 불가능합니다❗️',
        confirmButtonColor: '#FFD337',
      });
      return;
    }
    const updatedLike = !like;
    const updatedLikes = updatedLike ? countLike + 1 : countLike - 1;

    setLike(updatedLike);
    setCountLike(updatedLikes);

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/post/${postId}/like`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then(response => {})
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="mb-64 flex flex-col items-center pt-130 onlyMobile:pt-92">
      <div className="w-full max-w-[1280px] px-80 onlyMobile:px-20">
        <div className="border-b border-solid border-black-070 pb-32">
          <div className="text-14 text-black-350 onlyMobile:text-12">
            <Link to={`/kindergarten/${id}`} className="hover:underline">
              {kinderName.name && kinderName.name.replace(/"/g, '')}
            </Link>
            <span> - </span>
            <Link to={`/community/${id}`} className="hover:underline">
              커뮤니티
            </Link>
          </div>
          <div className="flex items-center">
            <div className="w-full">
              <p className="text-28 font-bold onlyMobile:text-22">
                {post.title}
              </p>
              <div className="mt-12 flex w-full items-end justify-between">
                <div className="flex flex-col">
                  <div className="mb-12 flex items-center">
                    <div className="user-profile h-24 w-24">
                      {post.profileImageUrl ? (
                        <img src={post.profileImageUrl} alt="img" />
                      ) : (
                        <img src={profile} alt="defaultImage" />
                      )}
                    </div>
                    <p className="relative pl-5 pr-12 text-14 text-black-900 onlyMobile:text-12">
                      {post.name}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="list-gray-small flex items-center">
                      <View width="16" height="16" className="mr-5" />
                      조회 {post.views}
                    </p>
                    <p className="list-gray-small flex items-center pl-12">
                      <img
                        src={LikeOff}
                        alt="좋아요"
                        className="mr-5 h-18 w-18"
                      />
                      좋아요 {countLike}
                    </p>
                  </div>
                </div>
                <p className="text-14 text-black-350 onlyMobile:text-12 ">
                  {post.modifiedAt && dateCalculate(post.modifiedAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-solid border-black-070 pb-24">
          {Parser(
            `<div className="py-32 onlyMobile:py-24 onlyMobile:text-14 break-words">
              ${post.content ? post.content : ''}
            </div>`,
          )}
          {images &&
            images.map(el => {
              return Parser(`<img src="${el.imageUrl}" alt="게시물 이미지" />`);
            })}
          <div className="mb-40">
            <button
              className="mr-15 text-14 text-black-350 onlyMobile:text-12"
              type="button"
              onClick={handleEdit}
            >
              수정
            </button>
            <button
              className="text-14 text-black-350 onlyMobile:text-12"
              type="button"
              onClick={handleDelete}
            >
              삭제
            </button>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center text-16 onlyMobile:text-14">
              <button
                type="button"
                onClick={isLike}
                className={
                  like
                    ? 'flex-center flex h-40 w-40 rounded-[16px] bg-yellow-500 onlyMini:h-30 onlyMini:w-30 onlyMini:rounded-[12px]'
                    : 'flex-center flex h-40 w-40 rounded-[16px] border-[1px] border-black-070 onlyMini:h-30 onlyMini:w-30 onlyMini:rounded-[12px]'
                }
              >
                <img
                  src={like ? LikeOn : LikeOff}
                  alt="좋아요"
                  className="h-24 w-24 onlyMini:h-20 onlyMini:w-20"
                />
              </button>
              <span className="pl-10">좋아요</span>
            </div>
            <div className="flex">
              <Link
                to={`/community/${id}`}
                className="flex-center btn-size-m border-gray mr-10 flex rounded-md"
              >
                목록보기
              </Link>
            </div>
          </div>
        </div>
        <div className="py-30">
          <p className="mb-30 text-16 font-bold onlyMobile:text-14">
            댓글
            <span className="pl-2">{isPending ? comments.length : null}</span>
          </p>
          <div className="w-full rounded-[12px] bg-black-025 px-32 pt-32">
            {comments && comments.length !== 0 ? (
              comments.map(comment => {
                return (
                  <Comment
                    key={comment.commentId}
                    commentId={comment.commentId}
                    name={comment.name}
                    email={comment.email}
                    text={comment.content}
                    postId={postId}
                    modifiedAt={comment.modifiedAt}
                    modified={comment.modified}
                    profileImg={comment.imageUrl}
                  />
                );
              })
            ) : (
              <div className="pb-32">댓글이 없어요🥺</div>
            )}
          </div>
          <div className="mt-20 flex w-full">
            <Input
              placeholder="댓글을 입력해주세요."
              className="!margin-0 w-full"
              onChange={e => changeInput(e)}
              isError={commentError}
            />
            <Button
              className="btn-size-l color-yellow ml-8 shrink-0"
              onClick={() => postComment()}
            >
              댓글 등록
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
