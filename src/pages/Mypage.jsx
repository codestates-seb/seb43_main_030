import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import {
  setCurProfile,
  setAuth,
  setCurUser,
  setActiveIndex,
  setUser,
} from '../actions/areaFilterActions';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import ListReview from '../components/List/ListReview';
import ListCommunity from '../components/List/ListCommunity';
import SettingModal from './SettingModal';
import ProfileCreateModal from './ProfileCreateModal';
import { RenderProfile } from '../utils/util';
import Profile from '../images/profile.png';
import { ReactComponent as ArrowOpen } from '../images/arrow-open.svg';
import { ReactComponent as ArrowClose } from '../images/arrow-close.svg';
import { ReactComponent as Perpett } from '../images/perpett-on.svg';
import { ReactComponent as Plus } from '../images/plus.svg';

function Mypage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navi = useNavigate();

  // const [value, setValue] = useState(useSelector(state => state.curProfile));
  const value = useSelector(state => state.curProfile);
  const auth = useSelector(state => state.auth);
  const activeIndex = useSelector(state => state.activeIndex);
  // const value = useSelector(state => state.curProfile);
  const [nickname, setNickname] = useState(
    useSelector(state => state.curProfile.name),
  );
  const user = useSelector(state => state.user);
  const [nameEdit, setNameEdit] = useState(false);
  const [nameErr, setNameErr] = useState('');

  const [dropDown, setDropDown] = useState(false);
  const curUser = useSelector(state => state.curUser);

  const [profileModal, setProfileModal] = useState(false);
  const [settingModal, setSettingModal] = useState(false);
  const [reviewModal, setRevieModal] = useState(false);

  useEffect(() => {
    // const getUsers = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/users/profile`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then(res => {
        console.log(res.data);
        dispatch(setUser(res.data));
        // dispatch(setCurUser(res.data));
        // dispatch(setCurProfile(res.data));
        console.log('getUser찍힘');
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/users/profile/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then(res => {
        console.log(res.data.data);
        // dispatch(setUser(res.data));
        dispatch(setCurUser(res.data.data));
        dispatch(setCurProfile(res.data.data));
        console.log('getUser찍힘22');
      })
      .catch(err => {
        console.log(err);
      });
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const getUsers = () => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}/api/users/profile/${id}`, {
  //       headers: {
  //         Authorization: localStorage.getItem('token'),
  //       },
  //     })
  //     .then(res => {
  //       console.log(res.data);
  //       dispatch(setUser(res.data));
  //       dispatch(setCurUser(res.data));
  //       dispatch(setCurProfile(res.data));
  //       console.log('getUser찍힘');
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  // 모달 관련 함수
  const modalProfileOnOff = () => {
    setProfileModal(!profileModal);
  };
  const modalSettingOnOff = () => {
    setSettingModal(!settingModal);
  };
  const modalReviewOnOff = () => {
    setRevieModal(!reviewModal);
  };
  const modalClose = () => {
    setProfileModal(false);
    setSettingModal(false);
    setRevieModal(false);
  };

  // 로그아웃 함수
  const handleLogout = () => {
    dispatch(setAuth(false));
    localStorage.removeItem('token');
    dispatch(setCurUser({}));
    dispatch(setUser([]));
    dispatch(setCurProfile({}));
    dispatch(setActiveIndex(''));
    navi('/');
  };

  // 프로필 변경 드롭다운 함수
  const handleDropdown = () => {
    setDropDown(!dropDown);
  };

  // 닉네임 수정 함수
  const handleNameInput = () => {
    setNameEdit(!nameEdit);
    setNickname(value.name);
    setNameErr('');
  };
  const handleNameChange = e => {
    setNickname(e.target.value);
    console.log(nickname);
  };
  const handleErr = () => {
    return nickname ? setNameErr('닉네임을 입력해주세요.') : setNameErr('');
  };

  // dropdown 에서 프로필 선택
  const clickedProfile = (idx, id) => {
    dispatch(setCurUser(user[idx]));
    dispatch(setCurProfile(user[idx]));
    // setValue(user[idx]);
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/users/profile/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then(res => {
        dispatch(setCurProfile(res.data.data));
        setDropDown(false);
        dispatch(setActiveIndex(idx));
      });
  };

  function profileActive(e) {
    const classList = e.target.className.split(' ');
    const indexClass = classList.find(className =>
      className.startsWith('profile'),
    );
    if (indexClass) {
      const index = parseInt(indexClass.slice(-1), 10);
      dispatch(setActiveIndex(index));
    }
  }

  // 닉네임 수정하기
  const handleNameEdit = () => {
    if (!nickname) {
      setNameErr('닉네임을 입력해주세요.');
    } else {
      // handleErr();

      const formData = new FormData();
      const data = {
        name: nickname,
      };
      formData.append(
        'patchDto',
        new Blob([JSON.stringify(data)], { type: 'application/json' }),
      );
      setNameEdit(false);

      if (nickname.length > 0) {
        axios
          .patch(
            `${process.env.REACT_APP_API_URL}/api/users/profile/${value.profileId}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: localStorage.getItem('token'),
              },
            },
          )
          .then(res => {
            const resData = res.data.data.name;
            dispatch(setCurUser({ ...curUser, name: resData }));
            dispatch(setCurProfile({ ...value, name: resData }));
            // getUsers();
          })
          .catch(err => {
            console.log(`${err}: 닉네임을 수정하지 못했습니다.`);
            console.log(err);
          });
      }
    }
  };

  // 프로필 삭제하기
  const handleProfileDelete = (idx, profileId) => {
    Swal.fire({
      text: '해당 프로필을 삭제하시겠습니까??',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FFD337',
      cancelButtonColor: '#ffffff',
      confirmButtonText: '네',
      cancelButtonText: '<span style="color:#000000">아니오<span>',
    }).then(result => {
      if (result.isConfirmed) {
        if (idx < activeIndex) {
          dispatch(setActiveIndex(activeIndex - 1));
        }

        axios
          .delete(
            `${process.env.REACT_APP_API_URL}/api/users/profile/${profileId}`,
            {
              headers: {
                Authorization: localStorage.getItem('token'),
              },
            },
          )
          .then(res => {
            if (user.length === 1) {
              dispatch(setActiveIndex(user[0]));
              console.log('프로필 삭제 성공');
            }
          })
          // .then(() => {
          //   getUsers();
          // })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  const onChangeImg = e => {
    e.preventDefault();

    if (e.target.files) {
      const uploadFile = e.target.files[0];
      console.log(uploadFile);
      const formData = new FormData();
      formData.append('image', uploadFile);

      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/api/users/profile/${value.profileId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: localStorage.getItem('token'),
            },
          },
        )
        .then(res => {
          const userMap = user.map(e => {
            if (e.profileId === value.profileId) {
              return { ...e, imageUrl: res.data.data.imageUrl };
            }
            return e;
          });
          dispatch(setCurProfile(res.data.data));
          dispatch(
            setCurUser({ ...curUser, imageUrl: res.data.data.imageUrl }),
          );
          dispatch(setUser(userMap));
          console.log(res);
          console.log('ㅎㅎ');
          // window.location.reload();
        })
        .catch(err => {
          console.log(`${err}: 이미지를 수정하지 못했습니다.`);
        });
    }
  };
  console.log('curProfile:', value);
  console.log('curUser:', curUser);
  console.log('user:', user);

  return (
    <div className="relative flex flex-col items-center pt-130 onlyMobile:pt-88 ">
      <div className="w-full max-w-[1280px] px-80 onlyMobile:max-w-full onlyMobile:px-24">
        {auth ? (
          <div className="flex onlyMobile:flex-col">
            <div className="mr-[8.3%] w-[33.3%] onlyMobile:mr-0 onlyMobile:w-full">
              {/* 좌측 프로필 */}
              <div className="sticky-card">
                <div className="flex-center flex-col">
                  <div className="user-profile mb-8 h-48 w-48 overflow-hidden rounded-[12px] onlyMobile:h-64 onlyMobile:w-64">
                    {value.imageUrl ? (
                      <img src={value.imageUrl} alt="img" />
                    ) : (
                      <img src={Profile} alt="defaultImage" />
                    )}
                  </div>
                  <div className="flex-center w-full items-center py-8">
                    {dropDown ? (
                      <Button
                        type="button"
                        onClick={handleDropdown}
                        className="btn-size-s color-white w-full active:bg-black-025 "
                      >
                        <span className="min-w-88 px-8 text-center text-16 font-bold onlyMobile:text-14">
                          {value.name}
                        </span>
                        <ArrowClose className="h-6 min-w-10 cursor-pointer" />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={handleDropdown}
                        className="btn-size-s color-white w-full active:bg-black-025"
                      >
                        <span className="min-w-88 px-8 text-center text-16 font-bold onlyMobile:text-14">
                          {value.name}
                        </span>
                        <ArrowOpen className="h-6 min-w-10 cursor-pointer" />
                      </Button>
                    )}
                    {dropDown ? (
                      <div className="dropdown-box top-[128px] z-10 mx-20 w-[90%] px-12 py-16 onlyMobile:top-[148px]">
                        <ul className="profile w-full py-2 text-left">
                          <RenderProfile
                            profileActive={e => profileActive(e)}
                            clickedProfile={(idx, id) =>
                              clickedProfile(idx, id)
                            }
                            handleDelete={handleProfileDelete}
                          />
                        </ul>
                      </div>
                    ) : null}
                  </div>

                  {/* 내가 쓴 총 후기 및 게시글 */}
                  <p className="mb-16 text-12 text-black-350">{value.email}</p>
                  <div className="flex-center mb-24 w-full gap-4">
                    <div className="flex-center w-full flex-col">
                      <p className="text-12 text-black-350">후기</p>
                      <p className="text-28 font-bold onlyMobile:text-18">
                        {value?.reviews?.length}
                      </p>
                    </div>
                    <div className="flex-center w-full flex-col">
                      <p className="text-12 text-black-350">게시글</p>
                      <p className="text-28 font-bold onlyMobile:text-18">
                        {value?.posts?.length}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 프로필 추가, 설정, 로그아웃 버튼 */}
                <div className="flex justify-between border-t-[1px] border-black-070 pt-24 text-16 onlyMobile:py-32 onlyMobile:text-14">
                  <div className="flex w-full flex-col items-center">
                    {user && user.length < 4 ? (
                      <>
                        <Button
                          className="color-yellow flex-center btn-size-l onlyMobile:btn-size-s mb-8 onlyMobile:w-32"
                          icon="plus"
                          onClick={modalProfileOnOff}
                        />
                        <span className="text-12 text-black-350">
                          프로필 추가
                        </span>
                      </>
                    ) : (
                      <>
                        <Button
                          className="color-yellow flex-center btn-size-l onlyMobile:btn-size-s mb-8 onlyMobile:w-32"
                          onClick={modalProfileOnOff}
                          disabled
                        >
                          <Plus />
                        </Button>
                        <span className="text-12 text-black-100">
                          프로필 추가
                        </span>
                      </>
                    )}
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
            <div className="w-[63%] pl-8 onlyMobile:w-full">
              <div className="pb-48 onlyMobile:py-32">
                <div className="mb-24 flex items-center justify-between onlyMobile:mb-16 ">
                  <h5 className="text-22 font-bold text-black-900 onlyMobile:text-18">
                    프로필
                  </h5>
                </div>
                {/* 사진 및 닉네임 변경 */}
                <div className="mb-24 onlyMobile:mb-20">
                  <div className="flex items-center justify-between">
                    <p className="mb-4 text-14 text-black-350 onlyMobile:text-12">
                      프로필 사진
                    </p>
                    <div>
                      <label htmlFor="uploadImage">
                        <p className="btn-text-default cursor-pointer text-14 text-black-350 onlyMobile:text-12">
                          변경
                        </p>

                        <input
                          id="uploadImage"
                          type="file"
                          className="hidden"
                          onChange={onChangeImg}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="user-profile h-80 w-80 onlyMobile:h-48 onlyMobile:w-48">
                    {value.imageUrl ? (
                      <img src={value.imageUrl} alt="img" />
                    ) : (
                      <img src={Profile} alt="defaultImage" />
                    )}
                  </div>
                </div>
                <div className="mb-24 onlyMobile:mb-20">
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

                  {/* 닉네임 수정 시 인풋 과 버튼 */}
                  {!nameEdit ? (
                    <p className="onlyMobile:text-14">{value.name}</p>
                  ) : (
                    <div>
                      <div className="flex">
                        <Input
                          value={nickname}
                          onChange={handleNameChange}
                          isError={nameErr}
                        />
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
                {value.breed ? (
                  <div className="">
                    <p className="mb-4 text-14 text-black-350 onlyMobile:text-12">
                      견종
                    </p>
                    <p className="onlyMobile:text-14">{value.breed}</p>
                  </div>
                ) : (
                  ''
                )}
              </div>

              {/* 작성한 후기 */}
              <div className="content-line w-full">
                <h5 className="mb-24 text-22 font-bold onlyMobile:mb-16 onlyMobile:text-18">
                  작성한 후기
                </h5>
                {value?.reviews?.length !== 0 ? (
                  <div className="flex flex-col gap-8">
                    {value?.reviews?.map(el => {
                      return (
                        <ListReview
                          key={el.reviewId}
                          post={el}
                          className="hidden"
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex-center flex-col">
                    <Perpett className="mb-16 h-104 w-104" />
                    <p className="text-14 text-black-350">
                      아직 작성한 후기가 없어요.
                    </p>
                  </div>
                )}
              </div>

              {/* 작성한 게시글 */}
              <div className="content-line w-[cal(63%-8px)] pl-8">
                <h5 className="mb-24 text-22 font-bold onlyMobile:mb-16 onlyMobile:text-18">
                  작성한 게시글
                </h5>
                {value?.posts?.length !== 0 ? (
                  <div className="flex flex-col gap-8">
                    {value?.posts?.map(el => {
                      return (
                        <ListCommunity
                          key={el.postId}
                          post={el}
                          className="text-max hidden"
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex-center flex-col">
                    <Perpett className="mb-16 h-104 w-104" />
                    <p className="text-14 text-black-350">
                      아직 작성한 게시글이 없어요.
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
      {profileModal ? (
        <ProfileCreateModal
          onClick={modalClose}
          setProfileModal={setProfileModal}
        />
      ) : (
        ''
      )}
      {settingModal ? (
        <SettingModal onClick={modalClose} setSettingModal={setProfileModal} />
      ) : (
        ''
      )}
      {/* {reviewModal ? </> : ''} */}
    </div>
  );
}

export default Mypage;
