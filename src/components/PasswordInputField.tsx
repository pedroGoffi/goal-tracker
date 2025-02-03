import { Lock } from 'lucide-react';

interface PasswordInputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const PasswordInputField: React.FC<PasswordInputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1">
        <input
          type="password"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <Lock size={16} />
        </span>
      </div>
    </div>
  );
};

export default PasswordInputField;
