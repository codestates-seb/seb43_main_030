import cls from '../../utils/tailwind';

function InputRadio(props) {
  const { type } = props;

  return (
    <div className="flex">
      <label htmlFor="radio1">
        <input type={type} id="radio1" name="tabs" className="peer hidden" />
        <div className="radio-button" />
      </label>
      <label htmlFor="radio2">
        <input type={type} id="radio2" name="tabs" className="peer hidden" />
        <div className="radio-button" />
      </label>
    </div>
  );
}

export default InputRadio;
