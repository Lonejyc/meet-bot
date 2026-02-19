import { type InputHTMLAttributes } from "react";

interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  className?: string;
}

export default function InputField({
  type = "text",
  className = "",
  ...rest
}: InputFieldProps) {
  return (
    <input
      type={type}
      className={`w-full rounded-full bg-input px-6 py-3.5 font-sans text-sm text-primary placeholder:text-primary/50 outline-none ${className}`}
      {...rest}
    />
  );
}
