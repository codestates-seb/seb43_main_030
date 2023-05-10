import { useState } from 'react';
import InputBtn from '../components/InputBtn';
import Button from '../components/Button/Button';
import ListCommunity from '../components/List/ListCommunity';
import Dog from '../images/dog.jpeg';
import { ReactComponent as Star } from '../images/star-on.svg';
import { ReactComponent as ArrowNext } from '../images/arrow-next.svg';
import { ReactComponent as ArrowPrev } from '../images/arrow-prev.svg';

function Community() {
  return (
    <div className="mb-64 flex flex-col items-center pt-130 onlyMobile:mt-0 onlyMobile:pt-64 ">
      <div className="max-w-[1280px] px-80 onlyMobile:max-w-full onlyMobile:px-0">
        <div className="relative">
          <div className="relative h-432 overflow-hidden rounded-[16px] onlyMobile:h-300 onlyMobile:rounded-0">
            <img src={Dog} alt="예시이미지" className="w-full blur-lg" />
            <div className="absolute left-0 top-0 h-full w-full bg-black opacity-50" />
          </div>
          <div className=" absolute bottom-[48px] left-[48px] w-full text-white onlyMobile:bottom-[24px] onlyMobile:left-[20px]">
            <p className=" mb-20 max-w-450 text-40 font-bold leading-tight onlyMobile:max-w-[60%] onlyMobile:text-32">
              왈독 애견 유치원 왈독 애견 유치원원원투
            </p>
            <div className="mb-8 flex items-center">
              <Star />
              <span className="text-16">4.3</span>(
              <span className="text-16">12</span>)
            </div>
            <p>안녕하세요 왈독 애견유치원입니당!</p>
          </div>
        </div>
        <InputBtn
          placeholder="검색어를 입력해주세요."
          className="m-40 !mx-0 !w-full max-w-full onlyMobile:px-24"
        />
        <div className="onlyMobile:px-24">
          <div className="w-full border-b border-black-070">
            <button
              className="community-tab-on mr-20 text-20 onlyMobile:text-18"
              type="button"
            >
              공지
            </button>
            <button className="mr-20 text-20 onlyMobile:text-18" type="button">
              커뮤니티
            </button>
          </div>
          <div className="pt-24">
            <div className="flex items-center justify-between">
              <p className="text-18 font-bold  onlyMobile:text-16">
                공지글 <span>5개</span>
              </p>
              <Button className="btn-size-l color-yellow w-168">글쓰기</Button>
            </div>
            <div>
              <ul>
                <ListCommunity />
                <ListCommunity />
                <ListCommunity />
                <ListCommunity />
                <ListCommunity />
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
