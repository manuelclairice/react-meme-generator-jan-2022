export default function Input({
  text,
  type,
  id,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="inputArea">
      <label htmlFor={id}>{text}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
