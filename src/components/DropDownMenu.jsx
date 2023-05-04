function DropDownMenu() {
  const profiles = ['쫑이콩이맘', '쫑이', '콩이'];

  return (
    <div className="dropDownMenu w-226 h-284 py-16 px-12">
      <ul className="ul profile">
        프로필
        {profiles.map((profile, idx) => {
          return <li className={`li profile${idx}`}>{profiles[idx]}</li>;
        })}
      </ul>
      <ul className="ul menu">
        <li className="li myPage">마이페이지</li>
        <li className="li logout">로그아웃</li>
      </ul>
    </div>
  );
}

export default DropDownMenu;
