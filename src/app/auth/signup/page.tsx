"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { z } from "zod";
import axios from "axios";
import { Mail, Lock, User, Key, AlertCircle } from "lucide-react";
import { signIn } from "next-auth/react";

// Validation Schema
const SignupSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .regex(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
    .regex(/[0-9]/, "Senha deve conter pelo menos um número"),
  companyKey: z.string().min(4, "Chave da empresa inválida")
});

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    companyKey: "",
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    companyKey?: string;
    general?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Refs for input elements to prevent scroll on focus
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Prevent scroll on focus
    const preventScroll = (e: FocusEvent) => {
      e.preventDefault();
      (e.target as HTMLElement).focus();
    };

    const inputs = formRef.current?.querySelectorAll('input');
    inputs?.forEach(input => {
      input.addEventListener('focus', preventScroll);
    });

    return () => {
      inputs?.forEach(input => {
        input.removeEventListener('focus', preventScroll);
      });
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear specific field error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Validate form data
      const validatedData = SignupSchema.parse(formData);

      const res = await axios.post("/api/auth/user/signup", validatedData);
      
      // Automatic login after signup
      await signIn('credentials', {
        redirect: false,
        email:    validatedData.email, 
        password: validatedData.password
      });

      // Redirect or show success
      window.location.href = "/dashboard";

    } catch (err: any) {
      if (err instanceof z.ZodError) {
        // Handle validation errors
        const fieldErrors: any = {};
        err.errors.forEach(error => {
          fieldErrors[error.path[0]] = error.message;
        });
        setErrors(fieldErrors);
      } else {
        // Handle API or network errors
        setErrors({
          general: err.response?.data?.message 
            || "Erro ao criar conta. Tente novamente."
        });
      }
      setIsSubmitting(false);
    }
  };

  const InputWithIcon = ({ 
    type, 
    name, 
    value, 
    onChange, 
    placeholder, 
    icon: Icon, 
    error 
  }: {
    type: string,
    name: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder: string,
    icon: React.ComponentType<{ size?: number, className?: string }>,
    error?: string
  }) => (
    <div className="relative">
      <Icon className={`absolute top-3 left-3 ${error ? 'text-red-400' : 'text-gray-500'}`} size={20} />
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full pl-10 pr-4 py-2 bg-gray-800 text-white border-2 rounded-lg focus:outline-none 
          ${error 
            ? 'border-red-500 focus:ring focus:ring-red-700' 
            : 'border-gray-700 focus:border-blue-600 focus:ring focus:ring-blue-900'
          }`}
        placeholder={placeholder}
        required
        autoComplete="off"
      />
      {error && (
        <div className="absolute right-2 top-3 text-red-400">
          <AlertCircle size={20} />
        </div>
      )}
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          Criar Conta
        </h1>

        {errors.general && (
          <div className="mb-4 p-3 bg-red-900/20 border border-red-700 text-red-400 text-center rounded">
            {errors.general}
          </div>
        )}

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <InputWithIcon
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Digite seu nome"
            icon={User}
            error={errors.name}
          />

          <InputWithIcon
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Digite seu email"
            icon={Mail}
            error={errors.email}
          />

          <InputWithIcon
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Digite sua senha"
            icon={Lock}
            error={errors.password}
          />

          <InputWithIcon
            type="text"
            name="companyKey"
            value={formData.companyKey}
            onChange={handleInputChange}
            placeholder="Chave de sua empresa"
            icon={Key}
            error={errors.companyKey}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 text-white font-semibold rounded-lg transition 
              ${isSubmitting 
                ? 'bg-blue-900 cursor-not-allowed' 
                : 'bg-blue-700 hover:bg-blue-600 focus:ring focus:ring-blue-900'
              }`}
          >
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-400">
          Já possui conta?{" "}
          <Link href="/auth/login" className="text-blue-500 hover:underline font-semibold">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;