import cls from '../../utils/tailwind';

function Radio(props) {
  const {
    children,
    value,
    name,
    defaultChecked,
    disabled,
    id,
    labelClass,
    onClick,
  } = props;

  return (
    <label htmlFor={id} className={cls('flex-center gap-1.5', labelClass)}>
      <input
        id={id}
        type="radio"
        value={value}
        name={name}
        defaultChecked={defaultChecked}
        disabled={disabled}
        className="peer hidden"
        onClick={onClick}
      />
      <div className="flex-center radio-button" />

      {children}
    </label>
  );
}

export default Radio;
