function DropDownMenu() {
  const profiles = ['쫑이콩이맘', '쫑이', '콩이'];

  return (
    <div className="dropDownMenu w-226 h-284 py-16 px-12 shadow-dropDown-shadow rounded-[10px] flex flex-col justify-center items-start">
      <ul className="ul p-8 border-2 profile">
        <li className="border-2 p-8">프로필</li>
        {profiles.map((profile, idx) => {
          return (
            <li className={`li border-2 px-12 py-8 profile${idx}`}>
              {profiles[idx]}
            </li>
          );
        })}
      </ul>
      <ul className="ul p-8 border-2 menu">
        <li className="li border-2 px-12 myPage">마이페이지</li>
        <li className="li border-2 px-12 logout">로그아웃</li>
      </ul>
    </div>
  );
}

export default DropDownMenu;
