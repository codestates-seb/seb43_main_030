import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import DropDownMenu from '../components/DropDownMenu';
import Dog from '../images/dog.jpeg';
import { ReactComponent as ArrowOpen } from '../images/arrow-open.svg';
import { ReactComponent as ArrowClose } from '../images/arrow-close.svg';
import { ReactComponent as Plus } from '../images/plus.svg';
import ListReview from '../components/List/ListReview';

function Mypage({ auth, setAuth, user, serUser }) {
  const [isLogin, setIsLogin] = useState('true');
  const [nickname, setNickname] = useState('쫑이콩이맘');
  const [dropDown, setDropDown] = useState(false);
  const [nameEdit, setNameEdit] = useState(false);
  const [value, setValue] = useState('');

  const handleDropdown = () => {
    setDropDown(!dropDown);
  };

  const handleNameEdit = () => {
    setNameEdit(!nameEdit);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/mypage`)
      .then(res => {
        setValue(res.data);
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(value);

  return (
    <div className="flex flex-col items-center pt-130 onlyMobile:pt-64 ">
      <div className="w-full max-w-[1280px] px-80 onlyMobile:max-w-full onlyMobile:px-0">
        {isLogin ? (
          <div className="flex">
            <div className="relative mr-[8.3%] w-[33.3%]">
              <div className="sticky-card">
                <div className="flex-center flex-col">
                  <div className="user-profile mb-8 h-48 w-48 overflow-hidden rounded-[12px]">
                    <img src={Dog} alt="예시이미지" />
                  </div>
                  <div className="flex-center w-full max-w-190 items-center py-8">
                    <span className="min-w-88 px-8 text-center text-14">
                      {nickname}
                    </span>
                    {dropDown ? (
                      <ArrowClose
                        className="h-6 min-w-10 cursor-pointer"
                        onClick={handleDropdown}
                      />
                    ) : (
                      <ArrowOpen
                        className="h-6 min-w-10 cursor-pointer"
                        onClick={handleDropdown}
                      />
                    )}
                    {dropDown ? <DropDownMenu /> : null}
                  </div>
                  <p className="mb-16 text-12 text-black-350">이메일</p>
                  <div className="flex-center mb-24 w-full gap-4">
                    <div className="flex-center w-full flex-col">
                      <p className="text-12 text-black-350">후기</p>
                      <p className="text-28 font-bold">0</p>
                    </div>
                    <div className="flex-center w-full flex-col">
                      <p className="text-12 text-black-350">게시글</p>
                      <p className="text-28 font-bold">12</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between border-t-[1px] border-black-070 pt-24 text-16 onlyMobile:py-32 onlyMobile:text-14">
                  <div className="flex flex-col items-center">
                    <Button
                      className="color-yellow flex-center btn-size-l mb-8"
                      icon="plus"
                    />
                    <span className="text-12 text-black-350">프로필 추가</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Button
                      className="border-gray flex-center btn-size-l mb-8"
                      icon="setting"
                    />
                    <span className="text-12 text-black-350">계정 설정</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Button
                      className="border-gray flex-center btn-size-l mb-8"
                      icon="logout"
                    />
                    <span className="text-12 text-black-350">로그아웃</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative w-[63%] pl-8 onlyMobile:w-full onlyMobile:px-24">
              <div className="pb-48 onlyMobile:pb-32">
                <h2 className="mb-24 text-22 font-bold text-black-900 onlyMobile:mb-12 onlyMobile:text-22">
                  프로필
                </h2>
                <div className="mb-24 onlyMobile:mb-20">
                  <div className="flex items-center justify-between">
                    <p className="mb-4 text-14 text-black-350 onlyMobile:text-12">
                      프로필 사진
                    </p>
                    <Button className="btn-text-default text-14 text-black-350 onlyMobile:text-12">
                      변경
                    </Button>
                  </div>
                  <div className="user-profile h-80 w-80 onlyMobile:h-48 onlyMobile:w-48">
                    <img src={Dog} alt="임시이미지" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <p className="mb-4 text-14 text-black-350 onlyMobile:text-12">
                      닉네임
                    </p>
                    {!nameEdit ? (
                      <Button
                        className="btn-text-default text-14 text-black-350 onlyMobile:text-12"
                        onClick={handleNameEdit}
                      >
                        수정
                      </Button>
                    ) : (
                      ''
                    )}
                  </div>
                  {!nameEdit ? (
                    <p>쫑이콩이맘</p>
                  ) : (
                    <div>
                      <div className="flex">
                        <Input />
                        <Button className="color-black btn-size-l ml-8 shrink-0">
                          중복 검사
                        </Button>
                      </div>
                      <div className="mt-16 flex gap-3">
                        <Button className="color-yellow btn-size-l">
                          수정
                        </Button>
                        <Button
                          className="border-gray btn-size-l"
                          onClick={handleNameEdit}
                        >
                          취소
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="content-line">
                <h5 className="mb-24 text-22 font-bold onlyMobile:text-18">
                  작성한 후기
                </h5>
                <div className="flex flex-col gap-8">
                  {/* <ListReview />
                  <ListReview />
                  <ListReview /> */}
                </div>
              </div>
              <div className="content-line">
                <h5 className="mb-24 text-22 font-bold onlyMobile:text-18">
                  작성한 게시글
                </h5>
                <div className="flex flex-col gap-8">
                  {/* <ListReview />
                  <ListReview />
                  <ListReview /> */}
                </div>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Mypage;
