import Dog from '../images/dog.jpeg';
import Button from '../components/Button/Button';
import InputSelectBox from '../components/Input/InputSelectBox';
import TextArea from '../components/TextArea';

function Post() {
  return (
    <div className="mb-64 flex flex-col items-center pt-130 onlyMobile:pt-92">
      <div className="w-full max-w-[1162px] px-50 onlyMobile:px-20">
        <div className="flex-between flex border-b border-black-070 pb-30">
          <h3 className="w-full text-28 font-bold onlyMobile:text-22">
            글쓰기
          </h3>
          <div className="flex shrink-0">
            <Button className="btn-size-l mr-10">취소</Button>
            <Button className="btn-size-l color-yellow">등록하기</Button>
          </div>
        </div>
        <div className="프로필">
          <p className="write-title">현재 프로필</p>
          <p className="write-sub-title">
            다른 프로필로 글을 작성하고 싶으신 경우 프로필을 변경 후 글을
            작성해주세요.
          </p>
          <div className="flex">
            <div className="user-profile h-64 w-64">
              <img src={Dog} alt="임시이미지" />
            </div>
            <div>
              <p>쫑이콩이맘</p>
              <p>dsfdsf@naver.com</p>
            </div>
          </div>
        </div>
        <div className="카테고리 선택">
          <p className="write-title">카테고리 선택</p>
          <p className="write-sub-title">
            견주님의 경우 공지사항 카테고리에는 글을 작성하실 수 없습니다.
            커뮤니티를 선택 후 글을 작성해주세요!
          </p>
          <div>
            <InputSelectBox
              options="공지,카테고리"
              placeholder="카테고리를 선택해주세요."
            />
          </div>
        </div>

        <div className="제목">
          <p className="write-title">제목</p>
          <p className="write-sub-title">
            작성하시는 글의 제목을 입력해주세요.
          </p>
          <div>
            <TextArea maxLength="80" placeholder="제목을 입력해주세요." />
          </div>
        </div>

        <div className="내용">
          <p className="write-title">내용</p>
          <p className="write-sub-title">
            작성하시는 글의 내용을 입력해주세요.
          </p>
          <div className="텍스트에디터" />
        </div>
      </div>

      <div className="fixed bottom-0 left-0">
        <Button className="btn-size-l ">취소</Button>
        <Button className="btn-size-l color-yellow">등록하기</Button>
      </div>
    </div>
  );
}

export default Post;
