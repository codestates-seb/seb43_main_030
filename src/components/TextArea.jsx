import { useState } from 'react';
import cls from '../utils/tailwind';

function TextArea(props) {
  const { value, placeholder, maxLength, className } = props;
  const [text, setText] = useState('');
  const [focus, setFocus] = useState(false);

  return (
    <div
      className={cls(
        'relative rounded-lg border border-solid border-black-070 pl-18 pr-18',
        className,
        focus && 'border-yellow-500',
      )}
    >
      <textarea
        className={cls(
          'box-border h-50 w-full pt-17 text-14 text-black-900 focus:outline-0',
        )}
        onChange={e => setText(e.target.value)}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      <p className="absolute absolute right-[20px] top-[17px] text-right text-12 text-black-200">
        {text.length} / {maxLength}
      </p>
    </div>
  );
}
export default TextArea;
