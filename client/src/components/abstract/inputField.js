export default function InputField({
  placeholder,
  setValue,
  inputType,
  value,
  testId,
}) {
  return (
    <input
      data-testid={testId}
      type={inputType}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
