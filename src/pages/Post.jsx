import { ReactComponent as View } from '../images/view.svg';
import { ReactComponent as PerpettOn } from '../images/perpett-on.svg';
import { ReactComponent as PerpettOff } from '../images/perpett-off.svg';
import { ReactComponent as More } from '../images/more.svg';
import Comment from '../components/Comment';
import Dog from '../images/dog.jpeg';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';

function Post() {
  return (
    <div className="mb-64 flex flex-col items-center pt-130 onlyMobile:pt-92">
      <div className="w-full max-w-[1162px] px-50 onlyMobile:px-20">
        <div className="border-b border-solid border-black-070 pb-32">
          <p className="text-14 text-black-350 onlyMobile:text-12">
            왈독 애견유치원 왈독 - 커뮤니티
          </p>
          <div className="flex items-center">
            <div className="w-full">
              <p className="text-28 font-bold onlyMobile:text-22">
                커뮤니티 게시글꺼
              </p>
              <div className="mt-12 flex flex w-full items-center justify-between">
                <div className="flex flex-col">
                  <div className="mb-12 flex items-center">
                    <div className="user-profile h-24 w-24">
                      <img src={Dog} alt="임시이미지" />
                    </div>
                    <p className="relative pl-5 pr-12 text-14 text-black-900 onlyMobile:text-12">
                      콩이쫑이맘
                    </p>
                  </div>
                  <div className="flex">
                    <p className="list-gray-small flex items-center">
                      <View width="16" height="16" className="mr-5" />
                      조회 1,212
                    </p>
                    <p className="list-gray-small flex items-center pl-12">
                      <PerpettOff width="16" height="16" className="mr-5" />
                      좋아요 12
                    </p>
                  </div>
                </div>
                <p className="text-14 text-black-350 onlyMobile:text-12 ">
                  23.00.00
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-solid border-black-070 pb-24">
          <div className="py-32 onlyMobile:py-24 onlyMobile:text-14">
            포스트 컨텐츠 영역포스트 컨텐츠 영역포스트 컨텐츠 영역포스트 컨텐츠
            영역포스트 컨텐츠 영역포스트 컨텐츠 영역포스트 컨텐츠 영역포스트
            컨텐츠 영역포스트 컨텐츠 영역포스트 컨텐츠 영역포스트 컨텐츠
            영역포스트 컨텐츠 영역포스트 컨텐츠 영역포스트 컨텐츠 영역포스트
            컨텐츠 영역포스트 컨텐츠 영역포스트 컨텐츠 영역포스트 컨텐츠
            영역포스트 컨텐츠 영역포스트 컨텐츠 영역포스트 컨텐츠 영역포스트
            컨텐츠 영역포스트 컨텐츠 영역포스트 컨텐츠 영역포스트 컨텐츠
            영역포스트 컨텐츠 영역포스트 컨텐츠 영역포스트 컨텐츠 영역포스트
            컨텐츠 영역포스트 컨텐츠 영역
          </div>
          <div className="mb-40">
            <button
              className="mr-15 text-14 text-black-350 onlyMobile:text-12"
              type="button"
            >
              수정
            </button>
            <button
              className="text-14 text-black-350 onlyMobile:text-12"
              type="button"
            >
              삭제
            </button>
          </div>
          <div className="flex justify-between">
            <div className="items:center flex text-16 onlyMobile:text-14">
              <PerpettOff width="24" height="24" className="mr-10" />
              좋아요
              <span className="pl-5 font-bold">21</span>
            </div>
            <div className="flex">
              <Button className="btn-size-m border-gray mr-10 ">이전글</Button>
              <Button className="btn-size-m border-gray">다음글</Button>
            </div>
          </div>
        </div>
        <div className="py-30">
          <p className="mb-30 text-16 font-bold onlyMobile:text-14">
            댓글<span className="pl-2">3</span>
          </p>
          <div className="w-full rounded-[12px] bg-black-025 px-32 pt-32">
            <Comment />
            <Comment />
          </div>
          <div className="mt-20 flex w-full">
            <Input
              placeholder="댓글을 입력해주세요."
              className="!margin-0 w-full"
            />
            <Button className="btn-size-l color-yellow ml-8 shrink-0 ">
              댓글 등록
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
