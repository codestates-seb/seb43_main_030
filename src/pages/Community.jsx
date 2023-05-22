import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Pagination from '../components/Pagination';
import { setCategory } from '../actions/areaFilterActions';
import InputBtn from '../components/InputBtn';
import ListCommunity from '../components/List/ListCommunity';
import { ReactComponent as Star } from '../images/star-on.svg';
import NoList from '../images/perpett-nolist.png';

function Community() {
  const [postList, setPostList] = useState([]);
  const [kinderInfo, setKinderInfo] = useState([]);
  const [page, setPage] = useState(1);
  const [countPage, setCountPage] = useState(0);
  const [url, setUrl] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const commInputValue = useSelector(state => state.commInputValue);
  const category = useSelector(state => state.category);
  const searchClickState = useSelector(state => state.searchClickState);
  const auth = useSelector(state => state.auth);

  // 포스트 리스트와 현재 게시물 수
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/community/${id}/post?page=${page}&category=${category}&keyword=${commInputValue}`,
      )
      .then(response => {
        setPostList(response.data.data);
        setCountPage(response.data.pageInfo.totalElements);
        setUrl(
          `${process.env.REACT_APP_API_URL}/api/community/${id}/post?page=${page}&category=${category}`,
        );
      })
      .catch(error => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, category]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/community/${id}`)
      .then(response => setKinderInfo(response.data.data))
      .catch(error => console.log(error));
  }, [id]);

  // 탭 선택값 바꿔주기
  const tabSwitch = event => {
    const menu = event.target.innerText;
    let categoryValue = '';

    if (menu === '공지') {
      categoryValue = 'notification';
      // setCategory(categoryValue);
    } else if (menu === '커뮤니티') {
      categoryValue = 'community';
    }

    dispatch(setCategory(categoryValue));
  };

  // 페이지네이션
  const handlePageChange = page => {
    setPage(page);
  };

  // 글쓰기 버튼
  const handleWrite = () => {
    if (auth) {
      navigate(`/community/${id}/write`);
    } else {
      alert('로그인이 필요합니다.');
    }
  };

  return (
    <div className="mb-64 flex flex-col items-center pt-130 onlyMobile:mt-0 onlyMobile:pt-64 ">
      <div className="max-w-[1280px] px-80 onlyMobile:max-w-full onlyMobile:px-0">
        <div className="relative">
          <div className="relative h-432 overflow-hidden rounded-[16px] onlyMobile:h-300 onlyMobile:rounded-0">
            <img
              src={kinderInfo.imageUrl}
              alt="예시이미지"
              className="w-full blur-lg onlyMobile:blur-[10px]"
            />
            <div className="absolute left-0 top-0 h-full w-full bg-black opacity-50" />
          </div>
          <div className=" absolute bottom-[48px] left-[48px] w-full text-white onlyMobile:bottom-[24px] onlyMobile:left-[20px] onlyMobile:w-[calc(100%-20px)]">
            <p className=" mb-20 max-w-450 text-40 font-bold leading-tight onlyMobile:max-w-[60vw] onlyMobile:text-32 onlyMini:mb-14 onlyMini:max-w-[70vw] onlyMini:text-26">
              {kinderInfo.name && kinderInfo.name.replace(/"/g, '')}
            </p>
            <div className="mb-8 flex items-center onlyMini:mb-2">
              <Star />
              <span className="mr-2 text-16 onlyMini:text-14">
                {kinderInfo.ratedReviewsAvg}
              </span>
              (
              <span className="text-16 onlyMini:text-14">
                {kinderInfo.ratedReviewsCount}
              </span>
              )
            </div>
            <p className="onlyMini:text-14">{kinderInfo.introduction}</p>
          </div>
        </div>
        <InputBtn
          placeholder="검색어를 입력해주세요."
          className="m-40 !mx-0 !w-full max-w-full onlyMobile:px-24 onlyMini:my-30"
          pageState="community"
          commUrl={url}
          setPostList={setPostList}
        />
        <div className="onlyMobile:px-24">
          <div className="w-full border-b border-black-070">
            <button
              className={
                category === 'notification'
                  ? 'community-tab-on'
                  : 'community-tab-off'
              }
              onClick={tabSwitch}
              type="button"
            >
              공지
            </button>
            <button
              className={
                category === 'community'
                  ? 'community-tab-on'
                  : 'community-tab-off'
              }
              onClick={tabSwitch}
              type="button"
            >
              커뮤니티
            </button>
          </div>
          <div className="pt-24">
            <div className="flex items-center justify-between">
              <p className="text-18 font-bold  onlyMobile:text-16">
                {category === 'notification' ? `공지 ` : '커뮤니티 '}
                <span>{searchClickState ? postList.length : countPage}</span>
              </p>
              <button
                onClick={handleWrite}
                className="flex-center btn-size-l color-yellow flex w-168 rounded-[8px] onlyMobile:w-130"
                type="button"
              >
                글쓰기
              </button>
            </div>
            <div>
              <ul>
                {postList &&
                  postList.map(post => {
                    return (
                      <ListCommunity
                        post={post}
                        className="flex items-center pr-12"
                      />
                    );
                  })}
                {postList.length === 0 && (
                  <div className="flex-center relative flex-col">
                    <div className="flex-center mt-40 h-400 w-[100%] max-w-[1440px] flex-col px-80 onlyMobile:px-20">
                      <img
                        src={NoList}
                        alt="NoList"
                        className="w-160 onlyMobile:w-90"
                      />
                      <div className="flex-center h-70 text-40 font-black text-yellow-500 onlyMobile:text-30">
                        어..없네?
                      </div>
                    </div>
                  </div>
                )}
              </ul>
            </div>
            <div className="mt-50 flex justify-center">
              <div>
                <Pagination
                  count={searchClickState ? postList.length : countPage}
                  currentPage={page}
                  itemsCountPerPage={10}
                  onChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Community;
