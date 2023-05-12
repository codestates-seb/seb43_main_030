import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import DropDownMenu from '../components/DropDownMenu';
import Profile from '../images/profile.png';
import { ReactComponent as ArrowOpen } from '../images/arrow-open.svg';
import { ReactComponent as ArrowClose } from '../images/arrow-close.svg';
import { ReactComponent as Perpett } from '../images/perpett-on.svg';
import ListReview from '../components/List/ListReview';
import Post from '../components/List/ListCommunity';
import ProfileCreateModal from './ProfileCreateModal';
import SettingModal from './SettingModal';

function Mypage({ auth, setAuth, user, serUser }) {
  const { id } = useParams();

  const [value, setValue] = useState('');
  const [isLogin, setIsLogin] = useState('true');
  const [nickname, setNickname] = useState('');
  const [nameEdit, setNameEdit] = useState(false);
  const [nameValue, setNameValue] = useState(nickname);
  const [nameErr, setNameErr] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [settingModal, setSettingModal] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/mypage/${id}`)
      .then(res => {
        setValue(res.data);
        setNickname(res.data.name);
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const modalProfileOnOff = () => {
    setProfileModal(!profileModal);
  };
  const modalSettingOnOff = () => {
    setSettingModal(!settingModal);
  };
  const modalClose = () => {
    setProfileModal(false);
    setSettingModal(false);
  };

  const handleLogout = () => {
    setAuth(false);
    localStorage.removeItem('token');
  };

  const handleDropdown = () => {
    setDropDown(!dropDown);
  };

  const handleNameInput = () => {
    setNameEdit(!nameEdit);
    setNickname(value.name);
  };
  const handleNameChange = e => {
    setNickname(e.target.value);
    setNameValue(e.target.value);
    console.log(nameValue);
  };
  // const handleErr = () => {
  //   nickname.length === 0 ? setNameErr(true) : setNameErr(false);
  // };
  const handleNameEdit = () => {
    const editName = {
      name: nameValue,
    };

    setNameEdit(false);

    if (nickname.length > 0) {
      axios
        .patch(`http://localhost:3001/mypage/${id}`, editName)
        .then(() => {
          setNickname(prev => {
            return { ...prev, editName };
          });
        })
        .catch(err => {
          console.log(`${err}: 닉네임을 수정하지 못했습니다.`);
        });
    }
  };
  // console.log(nickname);

  return (
    <div className="flex flex-col items-center pt-130 onlyMobile:pt-88 ">
      <div className="w-full max-w-[1280px] px-80 onlyMobile:max-w-full onlyMobile:px-24">
        {isLogin ? (
          <div className="flex onlyMobile:flex-col">
            <div className="relative mr-[8.3%] w-[33.3%] onlyMobile:mr-0 onlyMobile:w-full">
              {/* 좌측 프로필 */}
              <div className="sticky-card">
                <div className="flex-center flex-col">
                  <div className="user-profile mb-8 h-48 w-48 overflow-hidden rounded-[12px] onlyMobile:h-64 onlyMobile:w-64">
                    <img src={Profile} alt="프로필예시이미지" />
                  </div>
                  <div className="flex-center w-full max-w-190 items-center py-8">
                    <span className="min-w-88 px-8 text-center text-16 font-bold onlyMobile:text-14">
                      {value.name}
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

                  {/* 내가 쓴 총 후기 및 게시글 */}
                  <p className="mb-16 text-12 text-black-350">이메일</p>
                  <div className="flex-center mb-24 w-full gap-4">
                    <div className="flex-center w-full flex-col">
                      <p className="text-12 text-black-350">후기</p>
                      <p className="text-28 font-bold onlyMobile:text-18">
                        {value.ratedReviewsCount}
                      </p>
                    </div>
                    <div className="flex-center w-full flex-col">
                      <p className="text-12 text-black-350">게시글</p>
                      <p className="text-28 font-bold onlyMobile:text-18">
                        {value.ratedPostsCount}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 프로필 추가, 설정, 로그아웃 버튼 */}
                <div className="flex justify-between border-t-[1px] border-black-070 pt-24 text-16 onlyMobile:py-32 onlyMobile:text-14">
                  <div className="flex w-full flex-col items-center">
                    <Button
                      className="color-yellow flex-center btn-size-l onlyMobile:btn-size-s mb-8 onlyMobile:w-32"
                      icon="plus"
                      onClick={modalProfileOnOff}
                    />
                    <span className="text-12 text-black-350">프로필 추가</span>
                  </div>
                  <div className="flex w-full flex-col items-center">
                    <Button
                      className="border-gray flex-center btn-size-l onlyMobile:btn-size-s mb-8 onlyMobile:w-32"
                      icon="setting"
                      onClick={modalSettingOnOff}
                    />
                    <span className="text-12 text-black-350">계정 설정</span>
                  </div>
                  <div className="flex w-full flex-col items-center">
                    <Button
                      className="border-gray flex-center btn-size-l onlyMobile:btn-size-s mb-8 onlyMobile:w-32"
                      icon="logout"
                      onClick={handleLogout}
                    />
                    <span className="text-12 text-black-350">로그아웃</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 우측 정보 */}
            <div className="relative w-[63%] pl-8 onlyMobile:w-full">
              <div className="pb-48 onlyMobile:py-32">
                <h5 className="mb-24 text-22 font-bold text-black-900 onlyMobile:mb-16 onlyMobile:text-18">
                  프로필
                </h5>
                {/* 사진 및 닉네임 변경 */}
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
                    <img src={Profile} alt="임시이미지" />
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
                        onClick={handleNameInput}
                      >
                        수정
                      </Button>
                    ) : (
                      ''
                    )}
                  </div>
                  {!nameEdit ? (
                    <p className="onlyMobile:text-14">{value.name}</p>
                  ) : (
                    // 닉네임 수정 시 인풋 과 버튼
                    <div>
                      <div className="flex">
                        <Input value={nickname} onChange={handleNameChange} />
                        <Button className="color-black btn-size-l ml-8 shrink-0">
                          중복 검사
                        </Button>
                      </div>
                      <div className="mt-16 flex gap-3">
                        <Button
                          className="color-yellow btn-size-l"
                          onClick={handleNameEdit}
                        >
                          수정
                        </Button>
                        <Button
                          className="border-gray btn-size-l"
                          onClick={handleNameInput}
                        >
                          취소
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 작성한 후기 */}
              <div className="content-line">
                <h5 className="mb-24 text-22 font-bold onlyMobile:mb-16 onlyMobile:text-18">
                  작성한 후기
                </h5>
                {value && value.reviews.length !== 0 ? (
                  <div className="flex flex-col gap-8">
                    {value.reviews &&
                      value.reviews.map(el => {
                        return (
                          <ListReview
                            key={el.reviewId}
                            id={el.reviewId}
                            contents={el.content.text}
                            images={el.content.images}
                            ratedReview={el.ratedReviewAvg}
                            createdAt={el.createdAt}
                          />
                        );
                      })}
                  </div>
                ) : (
                  <div className="flex-center flex-col">
                    <Perpett className="mb-16 h-104 w-104" />
                    <p className="text-14 text-black-350">
                      첫 후기를 등록해보세요!
                    </p>
                  </div>
                )}
              </div>

              {/* 작성한 게시글 */}
              <div className="content-line">
                <h5 className="mb-24 text-22 font-bold onlyMobile:mb-16 onlyMobile:text-18">
                  작성한 게시글
                </h5>
                {value && value.post.length !== 0 ? (
                  <div className="flex flex-col gap-8">
                    {value.post &&
                      value.post.map(el => {
                        return (
                          <Post key={el.reviewId} id={el.reviewId} post={el} />
                        );
                      })}
                  </div>
                ) : (
                  <div className="flex-center flex-col">
                    <Perpett className="mb-16 h-104 w-104" />
                    <p className="text-14 text-black-350">
                      첫 게시글을 등록해보세요!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
      {profileModal ? <ProfileCreateModal onClick={modalClose} /> : ''}
      {settingModal ? <SettingModal onClick={modalClose} /> : ''}
    </div>
  );
}

export default Mypage;
