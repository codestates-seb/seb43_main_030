function ToastAlertToken() {
  return (
    <div className="alertContainer flex-center h-56 w-500 rounded-xl bg-red-400 text-white ">
      <span className="w-436 text-18">
        토큰이 만료되었습니다. 재로그인 해주세요.
      </span>
      <button className="closeBtn min-h-32 min-w-32 text-14" type="button">
        X
      </button>
    </div>
  );
}

export default ToastAlertToken;
