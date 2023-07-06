function RadioGroup(props) {
  const { label, children } = props;

  return (
    <fieldset className="flex gap-10">
      <legend>{label}</legend>
      {children}
    </fieldset>
  );
}

export default RadioGroup;
