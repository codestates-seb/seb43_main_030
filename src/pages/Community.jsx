import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputBtn from '../components/InputBtn';
import Button from '../components/Button/Button';
import ListCommunity from '../components/List/ListCommunity';
import Dog from '../images/dog.jpeg';
import { ReactComponent as Star } from '../images/star-on.svg';
import { ReactComponent as ArrowNext } from '../images/arrow-next.svg';
import { ReactComponent as ArrowPrev } from '../images/arrow-prev.svg';

function Community() {
  const [postList, setPostList] = useState([]);
  const [kinderInfo, setKinderInfo] = useState([]);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const apiUrl2 = 'http://localhost:3001';

  useEffect(() => {
    axios
      .get(`${apiUrl2}/post`)
      .then(response => {
        setPostList(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [setPostList]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/community/1`)
      .then(response => setKinderInfo(response.data))
      .catch(error => console.log(error));
  }, [apiUrl]);
  console.log(kinderInfo);
  return (
    <div className="mb-64 flex flex-col items-center pt-130 onlyMobile:mt-0 onlyMobile:pt-64 ">
      <div className="max-w-[1280px] px-80 onlyMobile:max-w-full onlyMobile:px-0">
        <div className="relative">
          <div className="relative h-432 overflow-hidden rounded-[16px] onlyMobile:h-300 onlyMobile:rounded-0">
            <img
              src={Dog}
              alt="예시이미지"
              className="w-full blur-lg onlyMobile:blur-[10px]"
            />
            <div className="absolute left-0 top-0 h-full w-full bg-black opacity-50" />
          </div>
          <div className=" absolute bottom-[48px] left-[48px] w-full text-white onlyMobile:bottom-[24px] onlyMobile:left-[20px] onlyMobile:w-[calc(100%-20px)]">
            <p className=" mb-20 max-w-450 text-40 font-bold leading-tight onlyMobile:max-w-[60vw] onlyMobile:text-32 onlyMini:mb-14 onlyMini:max-w-[70vw] onlyMini:text-26">
              {kinderInfo.data && kinderInfo.data.name.replace(/"/g, '')}
            </p>
            <div className="mb-8 flex items-center onlyMini:mb-2">
              <Star />
              <span className="text-16 onlyMini:text-14">
                {kinderInfo.data && kinderInfo.data.ratedReviewsAvg}
              </span>
              (<span className="text-16 onlyMini:text-14">12</span>)
            </div>
            <p className="onlyMini:text-14">
              {kinderInfo.data && kinderInfo.data.introduction}
            </p>
          </div>
        </div>
        <InputBtn
          placeholder="검색어를 입력해주세요."
          className="m-40 !mx-0 !w-full max-w-full onlyMobile:px-24 onlyMini:my-30"
        />
        <div className="onlyMobile:px-24">
          <div className="w-full border-b border-black-070">
            <button className="community-tab-on" type="button">
              공지
            </button>
            <button className="community-tab-off" type="button">
              커뮤니티
            </button>
          </div>
          <div className="pt-24">
            <div className="flex items-center justify-between">
              <p className="text-18 font-bold  onlyMobile:text-16">
                공지글 <span>{postList.length}</span>
              </p>
              <Link
                className="flex-center btn-size-l color-yellow flex w-168 rounded-[8px]"
                to="/write"
              >
                글쓰기
              </Link>
            </div>
            <div>
              <ul>
                {postList &&
                  postList.map(post => {
                    return <ListCommunity post={post} />;
                  })}
              </ul>
            </div>
            <div className="mt-50 flex justify-center">
              <Button className="btn-pagination-default">
                <ArrowPrev />
              </Button>
              <Button className="btn-pagination-default">1</Button>
              <Button className="btn-pagination-default">2</Button>
              <Button className="btn-pagination-default">3</Button>
              <Button className="btn-pagination-default">4</Button>
              <Button className="btn-pagination-default">5</Button>
              <Button className="btn-pagination-default">
                <ArrowNext />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Community;
