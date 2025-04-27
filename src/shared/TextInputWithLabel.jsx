function TextInputWithLabel({ elementId, label, ref, onChange, value }) {
  return (
    <>
      <label htmlFor={elementId}>{label}</label>
      <input
        type="text"
        id={elementId}
        value={value}
        placeholder="Please enter your text "
        ref={ref}
        onChange={onChange}
      />
    </>
  );
}
export default TextInputWithLabel;
