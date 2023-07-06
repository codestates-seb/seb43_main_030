import { useState } from 'react';
import cls from '../utils/tailwind';

function TextArea(props) {
  const { value, placeholder, maxLength, className, onChange, textClass } =
    props;
  const [focus, setFocus] = useState(false);

  return (
    <div
      className={cls(
        'rounded-lg border border-solid border-black-070 px-18 ',
        className,
        focus && 'border-yellow-500',
      )}
    >
      <textarea
        className={cls(
          'box-border w-full text-14 text-black-900  focus:outline-0',
          textClass,
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
