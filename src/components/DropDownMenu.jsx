import { useState } from 'react';

function DropDownMenu() {
  const profiles = ['쫑이콩이맘', '쫑이', '콩이'];
  const [activeIndex, setActiveIndex] = useState(null);

  const profileActive = event => {
    const index = Number(event.target.className.split(' ')[1].slice(-1)); // 클릭한 li 요소의 인덱스 추출
    setActiveIndex(index); // 클릭한 li 요소의 인덱스를 상태로 업데이트
  };

  return (
    <div className="flex h-284 w-226 flex-col items-start justify-center rounded-[10px] px-12 py-16 shadow-dropDownShadow">
      <ul className="ul profile w-202 px-8 py-12 text-left">
        <li className="pb-8 text-12 text-black-350">프로필</li>
        {profiles.map((profile, idx) => {
          const activeClass = activeIndex === idx ? 'font-bold' : '';
          return (
            <li
              className={`li profile${idx} cursor-pointer py-12 text-14 last:border-b ${activeClass}`}
              onClick={profileActive}
              role="presentation"
            >
              {profiles[idx]}
            </li>
          );
        })}
      </ul>
      <ul className="ul menu px-8 text-left">
        <li className="li cursor-pointer pb-12 text-14">마이페이지</li>
        <li className="li cursor-pointer pb-12 pt-12  text-14">로그아웃</li>
      </ul>
    </div>
  );
}

export default DropDownMenu;
