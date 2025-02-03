interface TextInputFields {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}
export function TextInput({
  id,
  label,
  placeholder,
  type = "text",
  required = false }: TextInputFields) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}