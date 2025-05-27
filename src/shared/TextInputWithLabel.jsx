import styled from "styled-components";

const StyledTextInputWithLabel = styled.div`
  background-color: lightyellow;
  border-color: coral;
  padding: 0.5rem;
`;
function TextInputWithLabel({ elementId, label, ref, onChange, value }) {
  return (
    <StyledTextInputWithLabel>
      <label htmlFor={elementId}>{label}</label>
      <input
        type="text"
        id={elementId}
        value={value}
        placeholder="Please enter your text "
        ref={ref}
        onChange={onChange}
      />
    </StyledTextInputWithLabel>
  );
}
export default TextInputWithLabel;
