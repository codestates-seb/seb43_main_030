import { useState } from 'react';
import cls from '../utils/tailwind';

function TextArea(props) {
  const { value, placeholder, maxLength, className, onChange } = props;
  const [focus, setFocus] = useState(false);

  return (
    <div
      className={cls(
        'flex items-center rounded-lg border border-solid border-black-070 pl-18 pr-18',
        className,
        focus && 'border-yellow-500',
      )}
    >
      <textarea
        className={cls(
          'my-15 box-border h-20 w-full overflow-x-auto text-14 text-black-900 focus:outline-0',
        )}
        // onChange={e => setText(e.target.value)}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      <p className=" w-55 text-right text-12 text-black-200">
        {value.length} / {maxLength}
      </p>
    </div>
  );
}
export default TextArea;
