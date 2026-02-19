interface InputFieldProps {
  type?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function InputField({
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  className = "",
}: InputFieldProps) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full rounded-full bg-input px-6 py-3.5 font-sans text-sm text-primary placeholder:text-primary/50 outline-none ${className}`}
    />
  );
}
