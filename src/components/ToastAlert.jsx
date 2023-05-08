function ToastAlert(props) {
  const { text, bgColor } = props;
  return (
    <div className={`flex-center h-56 w-500 rounded-xl ${bgColor} text-white`}>
      <span className="w-436 text-18">{text}</span>
      <button className="min-h-32 min-w-32 text-14" type="button">
        X
      </button>
    </div>
  );
}

export default ToastAlert;
