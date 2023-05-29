export default function InputField({
  placeholder,
  setValue,
  inputType,
  value,
  testId,
  name,
  required,
}) {
  return (
    <input
      required={required}
      name={name}
      data-testid={testId}
      type={inputType}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue && setValue(e.target.value)}
    />
  );
}
