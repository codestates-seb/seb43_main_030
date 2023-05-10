import { useMediaQuery } from 'react-responsive';
import { ReactComponent as StarOn } from '../images/star-on.svg';
import Dog from '../images/dog.jpeg';
import ListNotice from '../components/List/ListNotice';
import ListReview from '../components/List/ListReview';
import Button from '../components/Button/Button';
import { ReactComponent as ArrowNext } from '../images/arrow-next.svg';
import { ReactComponent as ArrowPrev } from '../images/arrow-prev.svg';

function KinderDetail() {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  return (
    <div className="mb-64 flex flex-col items-center pt-130 onlyMobile:pt-64 ">
      <div className="max-w-[1280px] px-80 onlyMobile:max-w-full onlyMobile:px-0">
        <div className="relative mb-48 h-432 overflow-hidden rounded-[16px] onlyMobile:mb-24 onlyMobile:h-300 onlyMobile:rounded-0">
          <img src={Dog} alt="예시이미지" className="w-full" />
        </div>
        <div className="flex">
          <div className="relative w-[63%] pl-8 onlyMobile:w-full onlyMobile:px-24">
            <div className="pb-48 onlyMobile:pb-32">
              <h2 className="mb-24 text-28 font-bold text-black-900 onlyMobile:mb-12 onlyMobile:text-22">
                왈독 애견 유치원
              </h2>
              <p className="onlyMobile:text-14">유치원 소개 영역</p>
            </div>
            <div className="content-line">
              <h5 className="mb-24 text-22 font-bold onlyMobile:text-18">
                유치원 정보
              </h5>
              <div className="flex flex-col gap-2">
                <div>주소</div>
                <div>전화번호</div>
                <div>SNS</div>
                <div>오픈시간</div>
              </div>
            </div>
            <div className="content-line">
              <h5 className="mb-24 text-22 font-bold onlyMobile:text-18">
                유치원 공지사항
              </h5>
              <div className="flex flex-col gap-8 onlyMobile:gap-6">
                <ListNotice />
                <ListNotice />
                <Button className="border-gray btn-size-l mt-24 shrink-0 onlyMobile:mt-16">
                  공지사항 더보기
                </Button>
              </div>
            </div>
            <div className="content-line">
              <div className="mb-24 flex">
                <div className="flex w-full items-center ">
                  <StarOn className="mr-4 inline-block h-32 w-32 onlyMobile:h-24 onlyMobile:w-24" />
                  <span className="text-22 font-bold onlyMobile:text-18">
                    4.3 후기 12개
                  </span>
                </div>
                <Button className="color-yellow btn-size-l w-[160px]">
                  후기쓰기
                </Button>
              </div>
              <div className="flex flex-col gap-8">
                <ListReview />
                <ListReview />
                <ListReview />
                <ListReview />
                <ListReview />
              </div>
              <div className="mt-50 flex">
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
          {!isMobile ? (
            <div className="relative z-10 ml-[8.3%] w-[33.3%]">
              <div className="sticky-card top-[128px] mb-48">
                <h2 className="text-22 font-bold text-black-900">
                  왈독 애견 유치원
                </h2>
                <div className="mt-16 text-14">
                  <div className="mb-8">
                    <StarOn className="mr-4 inline-block" />
                  </div>
                  <p>주소영역</p>
                </div>
                <Button className="color-yellow btn-size-l mt-24">
                  커뮤니티 가기
                </Button>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="content-line onlyMobile:mx-24 onlyMobile:w-auto">
          <div className="mb-24 flex w-full items-center">
            <h5 className="w-full text-22 font-bold onlyMobile:text-18">
              유치원 지도보기
            </h5>
            <Button className="border-gray btn-size-l shrink-0">
              지도보기
            </Button>
          </div>
          <p className="">
            성수동1가 685-696번지 하1층 B동 115호 갤러리아포레 성동구 서울특별시
            KR
          </p>
          <div className="flex h-400 onlyMobile:h-240" />
        </div>
        {isMobile ? (
          <div className="fixed bottom-0 left-0 z-10 flex w-full bg-white px-20 py-10 shadow-bottomBoxShadow">
            <Button className="btn-size-l color-yellow grow">
              커뮤니티 가기
            </Button>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default KinderDetail;
