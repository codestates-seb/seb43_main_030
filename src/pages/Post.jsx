import { useEffect, useState, useCallback } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { ReactComponent as View } from '../images/view.svg';
import LikeOff from '../images/perpett-off.png';
import LikeOn from '../images/community-like-on.png';
import Comment from '../components/Comment';
import Dog from '../images/dog.jpeg';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import dateCalculate from '../components/dateCalculate';

function Post() {
  const [post, setPost] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [comments, setComments] = useState([]);
  const [userName, setUserName] = useState('지은');
  const [userEmail, setUserEmail] = useState('aaa@naver.com');
  const [commentInput, setCommentInput] = useState('');
  const [like, setLike] = useState(false);
  const [countLike, setCountLike] = useState(0);
  const [previousPost, setPreviousPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);
  const navigate = useNavigate();
  const { postId } = useParams();
  const apiUrl = process.env.REACT_APP_API_URL;
  const apiUrl2 = 'http://localhost:3001';
  const token = process.env.REACT_APP_TOKEN;

  useEffect(() => {
    axios
      .get('http://localhost:3001/comments')
      .then(response => {
        setIsPending(true);
        // setPost(response.data[0]);
        setComments(response.data);
      })
      .catch(error => {
        console.log(error);
        setIsPending(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function changeInput(e) {
    setCommentInput(e.target.value);
  }

  function postComment() {
    const now = new Date();
    const dateString = now.toLocaleString();

    const data = {
      id: comments.length + 5,
      profileId: 5,
      email: userEmail,
      name: userName,
      imageUrl:
        'https://tgzzmmgvheix1905536.cdn.ntruss.com/2020/03/c320a089abe34b72942aeecc9b568295',
      text: commentInput,
      createdAt: dateString,
      motifiedAt: '2023-05-06T10:54:56.870994',
    };

    axios
      .post('http://localhost:3001/comments', data)
      .then(response => {
        console.log(response.data);
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    axios
      .get(`${apiUrl}/community/1/post/${postId}`)
      .then(response => {
        setPost(response.data.data);
        setCountLike(response.data.data.likes);
        // setLike(response.data.data.likestate);
      })
      .catch(error => {
        console.log(error);
      });
  }, [setPost, postId, apiUrl]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/community/1/post?page=1`)
      .then(response => {
        const posts = response.data.data;

        // 현재 게시글 인덱스 찾기
        const currentIndex = posts.findIndex(
          post => post.postId === Number(postId),
        );
        console.log(currentIndex);

        // 유효한 게시글만 필터링
        const validPosts = posts.filter(post => post.postId !== '');
        // 이전글 찾기
        const previousIndex = currentIndex - 1;
        const previous = previousIndex >= 0 ? validPosts[previousIndex] : null;
        setPreviousPost(previous);

        // 다음글 찾기
        const nextIndex = currentIndex + 1;
        const next =
          nextIndex < validPosts.length ? validPosts[nextIndex] : null;
        setNextPost(next);

        if (!next) {
          alert('마지막 글입니다.');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [apiUrl, postId]);

  const handleDelete = () => {
    const result = window.confirm('게시물을 삭제하시겠습니까?');
    if (result) {
      axios
        .delete(`http://localhost:3001/post/${postId}`)
        .then(alert('게시물이 삭제되었습니다.'))
        .then(navigate(`/community`))
        .catch(error => console.log(error));
    }
  };

  const handleEdit = useCallback(() => {
    navigate(`/write/${postId}`);
  }, [navigate, postId]);

  // const isLike = () => {
  //   setLike(!like);

  //   axios
  //     .put(`http://localhost:3001/post/${postId}`, {
  //       ...post,
  //       likes: like ? countLike - 1 : countLike + 1,
  //     })
  //     .then(response => {
  //       console.log(response.likes);
  //     })
  //     .catch(error => console.log(error));
  // };

  // 좋아요 버튼 코드
  const isLike = () => {
    const updatedLike = !like;
    const updatedLikes = updatedLike ? countLike + 1 : countLike - 1;

    setLike(updatedLike);
    setCountLike(updatedLikes);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .put(
        `${apiUrl}/post/${postId}/like`,
        {
          ...post,
          likes: updatedLikes,
          // likestate: updatedLike,
        },
        config,
      )
      .then(response => {
        console.log(response.data.likes);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="mb-64 flex flex-col items-center pt-130 onlyMobile:pt-92">
      <div className="w-full max-w-[1280px] px-80 onlyMobile:px-20">
        <div className="border-b border-solid border-black-070 pb-32">
          <div className="text-14 text-black-350 onlyMobile:text-12">
            <Link to="/" className="hover:underline">
              왈독 애견유치원 왈독
            </Link>
            <span> - </span>
            <Link to="/community" className="hover:underline">
              커뮤니티
            </Link>
          </div>
          <div className="flex items-center">
            <div className="w-full">
              <p className="text-28 font-bold onlyMobile:text-22">
                {post.title}
              </p>
              <div className="mt-12 flex flex w-full items-end justify-between">
                <div className="flex flex-col">
                  <div className="mb-12 flex items-center">
                    <div className="user-profile h-24 w-24">
                      <img src={Dog} alt="임시이미지" />
                    </div>
                    <p className="relative pl-5 pr-12 text-14 text-black-900 onlyMobile:text-12">
                      {post.name}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="list-gray-small flex items-center">
                      <View width="16" height="16" className="mr-5" />
                      조회 1,212
                    </p>
                    <p className="list-gray-small flex items-center pl-12">
                      <img
                        src={LikeOff}
                        alt="좋아요OFF"
                        className="mr-5 h-18 w-18"
                      />
                      좋아요 {countLike}
                    </p>
                  </div>
                </div>
                <p className="text-14 text-black-350 onlyMobile:text-12 ">
                  {dateCalculate(post.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-solid border-black-070 pb-24">
          <div className="py-32 onlyMobile:py-24 onlyMobile:text-14">
            {post.content}
          </div>
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
              <span className="pl-5 font-bold">{countLike}</span>
            </div>
            <div className="flex">
              {previousPost ? (
                <Link
                  to={`/post/${previousPost.postId}`}
                  // to="/post"
                  className="felx flex-center btn-size-m border-gray mr-10 rounded-md"
                >
                  이전글
                </Link>
              ) : (
                <Button className="btn-size-m border-gray mr-10" disabled>
                  이전글
                </Button>
              )}
              {nextPost ? (
                <Link
                  to={`/post/${nextPost.postId}`}
                  className="flex-center btn-size-m border-gray rounded-md"
                >
                  다음글
                </Link>
              ) : (
                <Button className="btn-size-m border-gray" disabled>
                  다음글
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="py-30">
          <p className="mb-30 text-16 font-bold onlyMobile:text-14">
            댓글
            <span className="pl-2">{isPending ? comments.length : null}</span>
          </p>
          <div className="w-full rounded-[12px] bg-black-025 px-32 pt-32">
            {comments.map(comment => {
              return (
                <Comment
                  key={comment.id}
                  id={comment.id}
                  profileId={comment.profileId}
                  name={comment.name}
                  imageUrl={comment.imageUrl}
                  email={comment.email}
                  text={comment.text}
                  createdAt={comment.createdAt}
                />
              );
            })}
          </div>
          <div className="mt-20 flex w-full">
            <Input
              placeholder="댓글을 입력해주세요."
              className="!margin-0 w-full"
              onChange={e => changeInput(e)}
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
