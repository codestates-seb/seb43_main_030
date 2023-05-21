import './App.css';
import './styles/utilities.css';
import { useMediaQuery } from 'react-responsive';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
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
import OauthLogin from './pages/OauthLogin';
import OauthRole from './pages/OauthRole';
import { setCurProfile } from './actions/areaFilterActions';

function App() {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const location = useLocation();

  const hideFooterRoutes = ['/map', '/login', '/signup', '/find-password', '*'];
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <div className="h-[calc(100vh-80px)]">
      {isMobile ? <MHeader /> : <PcHeader />}

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />

        <Route path="/map" element={<Map />} />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/find-password" element={<FindPw />} />
        <Route path="/kindergarten/:id" element={<KinderDetail />} />
        <Route path="/community" element={<Community />} />
        <Route path="/write" element={<Write />} />
        <Route path="/mypage/:id" element={<Mypage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/write/:postId" element={<Write />} />
        <Route path="/post/:postId" element={<Post />} />
        <Route path="/oauthlogin" element={<OauthLogin />} />
        <Route path="/oauthrole" element={<OauthRole />} />
      </Routes>
      {shouldHideFooter ? null : <Footer />}
    </div>
  );
}

export default App;
