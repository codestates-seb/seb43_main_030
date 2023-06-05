import { useState, useEffect } from 'react';
import { ReactComponent as Close } from '../images/close.svg';

function ToastAlert(props) {
  const { text, bgColor, onClick } = props;

  const [toast, setToast] = useState(false);

  const handleClose = () => {
    setToast(false);
  };

  const handleToast = () => {
    setToast(true);
  };

  // useEffect(() => {
  //   if (toast) {
  //     setTimeout(() => setToast(false, 1500));
  //   }
  // }, [toast]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onClick.setToast(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`fixed top-[10px] z-[101] flex h-56 w-full max-w-500 rounded-xl ${bgColor} text-white`}
    >
      <div className="flex-center relative">
        <span className="w-436 text-16">{text}</span>
        <button
          type="button"
          className="absolute right-0 top-[-4px]"
          onClick={handleClose}
        >
          <Close />
        </button>
      </div>
    </div>
  );
}

export default ToastAlert;
