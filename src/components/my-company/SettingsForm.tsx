import { useState } from 'react';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import PasswordInputField from '../PasswordInputField';
import InputField from '../InputField';
import ErrorMessage from '../ErrorMessage';



interface SettingsFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SettingsFormProps {
  currentData: SettingsFormData;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ currentData }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<SettingsFormData>(currentData);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axios.put('/api/user/settings', formData);
      router.push('/profile');
    } catch (error) {
      console.error('Error updating settings:', error);
      setError('Failed to update settings. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">        
      {error && <ErrorMessage message={error} />}
      
      <InputField
        label="Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        required
      />
      
      <InputField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        required
      />
      
      <PasswordInputField
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
      />
      
      <PasswordInputField
        label="Confirm Password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleInputChange}
      />
      
      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400"
        >
          {loading ? 'Updating...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};

export default SettingsForm;
