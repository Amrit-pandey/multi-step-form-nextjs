import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  type?: string;
  label : string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldValues;
  placeholder: string;
}
const Input = ({
  id,
  type = "text",
  disabled,
  required,
  register,
  errors,
  placeholder,
  label,
}: InputProps) => {
  return (
    <>
      {label}
      <input
        type={type}
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder={placeholder}
        className={`
        border 
        rounded-lg 
        p-4 
        outline-none 
        focus:outline-none 
        ${errors[id] ? "border-rose-500" : "border-gray-300"}
        ${errors[id] ? "focus:border-rose-500" : "focus:border-gray-300"}
    `}
    />
  
    </>
  );
};

export default Input;
