function ToastAlertPost() {
  return (
    <div className="alertContainer flex-center h-56 w-500 rounded-xl bg-green-400 text-white ">
      <span className="w-436 text-18">게시물을 등록하였습니다.</span>
      <button className="closeBtn min-h-32 min-w-32 text-14" type="button">
        X
      </button>
    </div>
  );
}

export default ToastAlertPost;
