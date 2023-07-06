import cls from '../../utils/tailwind';

function InputCheck(props) {
  const { type } = props;

  return (
    <div className="flex">
      <label htmlFor="option1">
        <input type={type} id="option1" name="tabs" className="peer hidden" />
        <div className="checkbox-button" />
      </label>
      <label htmlFor="option2">
        <input type={type} id="option2" name="tabs" className="peer hidden" />
        <div className="checkbox-button" />
      </label>
    </div>
  );
}

export default InputCheck;
