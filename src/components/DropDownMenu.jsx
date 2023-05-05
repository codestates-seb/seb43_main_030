function DropDownMenu() {
  const profiles = ['쫑이콩이맘', '쫑이', '콩이'];

  return (
    <div className="shadow-dropDown-shadow flex h-284 w-226 flex-col items-start justify-center rounded-[10px] border-2 px-12 py-16">
      <ul className="ul profile w-202 px-8 py-12 text-left">
        <li className="pb-8 text-12">프로필</li>
        {profiles.map((profile, idx) => {
          return (
            <li className={`li profile${idx} py-12 text-14 last:border-b`}>
              {profiles[idx]}
            </li>
          );
        })}
      </ul>
      <ul className="ul menu border-2 p-8">
        <li className="li text-14">마이페이지</li>
        <li className="li text-14">로그아웃</li>
      </ul>
    </div>
  );
}

export default DropDownMenu;
