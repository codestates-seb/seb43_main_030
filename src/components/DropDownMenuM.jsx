import { useState } from 'react';
import { ReactComponent as Search } from '../images/search.svg';

function DropDownMenuM() {
  const profiles = ['쫑이콩이맘', '쫑이', '콩이'];
  const [activeIndex, setActiveIndex] = useState(null);

  const profileActive = event => {
    const classList = event.target.className.split(' ');
    if (classList.length > 1) {
      const index = classList[4].slice(-1);
      setActiveIndex(index);
    }
  };

  const renderProfile = () => {
    return profiles.map((profile, idx) => {
      const activeClass = Number(activeIndex) === idx ? 'font-bold' : '';
      return (
        <li
          className={`flex h-58 items-center justify-start profile${idx} cursor-pointer px-8 py-12 text-14 ${activeClass} rounded-lg hover:bg-black-025`}
          onClick={profileActive}
          role="presentation"
        >
          {Number(activeIndex) === idx ? (
            <Search className="mr-10 inline-block h-24 w-24 rounded-md border" />
          ) : null}
          {profiles[idx]}
        </li>
      );
    });
  };

  return (
    <div className="absolute right-0 top-[64px] z-10 flex w-full flex-col items-start justify-center rounded-[10px] border-b border-black-050 px-24 py-8 shadow-headerShadow">
      <ul className="profile w-full py-12 text-left">
        <li className="px-8 pb-8 text-12 text-black-350">프로필</li>
        {renderProfile()}
        <div className="mt-4 h-1 border-b" />
      </ul>
      <ul className="menu px-8 text-left">
        <li className="h-58 cursor-pointer pb-12 pt-12 text-14">마이페이지</li>
        <li className="h-58 cursor-pointer pb-12 pt-12 text-14">로그아웃</li>
      </ul>
    </div>
  );
}

export default DropDownMenuM;
