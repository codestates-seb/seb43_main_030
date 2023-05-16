import './App.css';
import './styles/utilities.css';
import { useMediaQuery } from 'react-responsive';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MHeader from './components/Header/MHeader';
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
import FindPw from './pages/FindPw';

function App() {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const location = useLocation();

  const hideFooterRoutes = ['/map', '/login', '/signup', '/find-password', '*'];
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  // 로그인 관련 state
  const [auth, setAuth] = useState(false);

  // 지도 관련 state
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="h-[calc(100vh-80px)]">
      {isMobile ? (
        <MHeader
          inputValue={inputValue}
          setInputValue={setInputValue}
          auth={auth}
          setAuth={setAuth}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      ) : (
        <PcHeader
          inputValue={inputValue}
          setInputValue={setInputValue}
          auth={auth}
          setAuth={setAuth}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Main
              inputValue={inputValue}
              setInputValue={setInputValue}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          }
        />
        <Route
          path="/login"
          element={<Login auth={auth} setAuth={setAuth} />}
        />

        <Route
          path="/map"
          element={
            <Map inputValue={inputValue} setInputValue={setInputValue} />
          }
        />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/find-password" element={<FindPw />} />
        <Route
          path="/kindergarten/:id"
          element={<KinderDetail auth={auth} />}
        />
        <Route path="/community" element={<Community />} />
        <Route path="/write" element={<Write />} />
        <Route
          path="/mypage/:id"
          element={<Mypage auth={auth} setAuth={setAuth} />}
        />
        <Route path="*" element={<NotFound />} />
        <Route path="/write/:postId" element={<Write />} />
        <Route path="/post/:postId" element={<Post />} />
      </Routes>
      {shouldHideFooter ? null : <Footer />}
    </div>
  );
}

export default App;
