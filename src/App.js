import './App.css';
import './styles/utilities.css';
import { useMediaQuery } from 'react-responsive';
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DropDownMenu from './components/DropDownMenu';
import InputBtn from './components/InputBtn';
import Button from './components/Button/Button';
import Input from './components/Input/Input';
import InputError from './components/Input/InputError';
import InputSelectBox from './components/Input/InputSelectBox';
import InputCheck from './components/Input/InputCheck';
import MHeader from './components/Header/MHeader';
import TextArea from './components/TextArea';
import UploadImage from './components/UploadImage';
import RatingStar from './components/RatingStar';
import ListNotice from './components/List/ListNotice';
import ListReview from './components/List/ListReview';
import ListCommunity from './components/List/ListCommunity';
import MainCard from './components/Card/MainCard';
import MapCard from './components/Card/MapCard';
import MapCardM from './components/Card/MapCardM';
import ToastAlert from './components/ToastAlert';
// import Pin from './components/Pin';
import Footer from './components/Footer';
import Main from './pages/Main';
import PcHeader from './components/Header/PcHeader';
import Login from './pages/Login';
import Map from './pages/Map';
import Community from './pages/Community';
import Post from './pages/Post';
import Write from './pages/Write';
import SignUp from './pages/SignUp';
import KinderDetail from './pages/KinderDetail';
import Mypage from './pages/Mypage';
import NotFound from './pages/NotFound';

function App() {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const location = useLocation();

  const hideFooterRoutes = ['/map', '/login', '/signup', '/find-password', '*'];
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  // 로그인 관련 state
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});
  const [curUser, setCurUser] = useState({});

  // 지도 관련 state
  const [kinderGartens, setKinderGartens] = useState([]);
  const [areaFilter, setAreaFilter] = useState(0);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/users/profile`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        })
        .then(res => {
          setAuth(true);
          setUser(res.data);
          setCurUser(res.data[0]);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(user);
  console.log(curUser);

  return (
    <div className="h-[calc(100vh-80px)]">
      {isMobile ? (
        <MHeader inputValue={inputValue} setInputValue={setInputValue} />
      ) : (
        <PcHeader
          inputValue={inputValue}
          setInputValue={setInputValue}
          kinderGartens={kinderGartens}
          setKinderGartens={setKinderGartens}
          auth={auth}
          setAuth={setAuth}
          user={user}
          curUser={curUser}
          setCurUser={setCurUser}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Main
              areaFilter={areaFilter}
              setAreaFilter={setAreaFilter}
              inputValue={inputValue}
              setInputValue={setInputValue}
              kinderGartens={kinderGartens}
              setKinderGartens={setKinderGartens}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              auth={auth}
              setAuth={setAuth}
              user={user}
              setUser={setUser}
              setCurUser={setCurUser}
            />
          }
        />

        <Route
          path="/map"
          element={
            <Map
              areaFilter={areaFilter}
              setAreaFilter={setAreaFilter}
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
          }
        />

        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/kindergarten/:id"
          element={<KinderDetail areaFilter={areaFilter} />}
        />
        <Route path="/community" element={<Community />} />
        <Route path="/write" element={<Write />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/write/:postId" element={<Write />} />
        <Route path="/post/:postId" element={<Post />} />
      </Routes>
      {shouldHideFooter ? null : <Footer />}
    </div>

    // <div className="App">
    //   <Button className="btn-size-s color-yellow ">버튼</Button>
    //   <Button className="btn-size-m color-yellow">버튼</Button>
    //   <Button className="btn-size-l color-yellow">버튼</Button>
    //   <Button className="btn-pagination-default">1</Button>
    //   <Button className="btn-text-default">수정</Button>
    //   <Button className="btn-size-m border-gray">btn이름</Button>
    //   <Button className="btn-size-m border-yellow">btn이름</Button>
    //   <Button className="btn-icon color-yellow" icon="search" />
    //   {/* ToDo : 지도 아이콘 사이즈 작게 수정 필요 */}
    //   <Button className="btn-size-m color-yellow" icon="map">
    //     btn이름
    //   </Button>
    //   <Button className="btn-size-l color-yellow" icon="map">
    //     btn이름
    //   </Button>

    //   {/* <Input placeholder="placeholder" type="text" className="input-default" /> */}
    //   <InputError
    //     type="text"
    //     placeholder="placeholder"
    //     isError="내용을 입력해주세요."
    //     className="input-default"
    //   />

    //   <Input
    //     placeholder="placeholder"
    //     type="text"
    //     className="border-blue-500"
    //     isComp="완료메시지이"
    //   />

    //   <InputError
    //     type="text"
    //     placeholder="이메일 주소를 입력해주세요."
    //     isError="이메일 주소를 입력해주세요."
    //     labelText="이메일"
    //     className="input-default"
    //   />
    //   <InputSelectBox />
    //   <InputBtn />
    //   <div className="tab-default">공지</div>

    //   <Pin />

    //   <DropDownMenu />

    //   <Header />
    //   <MHeader />

    //   <TextArea
    //     placeholder="placeholder"
    //     maxLength={200}
    //     className="h-130 w-328"
    //   />
    //   <UploadImage className="upload-image h-64 w-64" />
    //   <InputCheck type="checkbox" />
    //   <InputRadio type="radio" className="h-20 w-20" />

    //   <MainCard />
    //   <MapCard />
    //   <MapCardM />

    // <RatingStar />
    // <ListNotice />
    // <ListReview />
    // <ListCommunity />

    //   <ToastAlert text="게시물을 등록하였습니다." bgColor="bg-green-400" />
    //   <ToastAlert
    //     text="토큰이 만료되었습니다. 재로그인 해주세요."
    //     bgColor="bg-red-400"
    //   />
    // </div>
  );
}

export default App;
