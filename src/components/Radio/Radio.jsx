import cls from '../../utils/tailwind';

function Radio(props) {
  const { children, value, name, defaultChecked, disabled, id } = props;

  return (
    <label htmlFor={id} className="flex-center gap-1.5">
      <input
        id={id}
        type="radio"
        value={value}
        name={name}
        defaultChecked={defaultChecked}
        disabled={disabled}
        className="peer hidden"
      />
      <div className="flex-center radio-button" />

      {children}
    </label>
  );
}

export default Radio;
