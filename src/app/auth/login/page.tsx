"use client";

import React, { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { Lock, Mail } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const LoginSchema = z.object({
  email:    z.string().email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória")
});

export default function AuthLoginPage() {  
  const { status } = useSession();
  
  if (status === "authenticated") {        
    redirect('/');
  }

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const validatedData = LoginSchema.parse(formData);      
      const loginResponse = await signIn('credentials', {        
        email:        validatedData.email,
        password:     validatedData.password,
        callbackUrl:  "/"
      });
      
      console.log(loginResponse)

      if (loginResponse?.error) {
        throw new Error(loginResponse.error);
      }

      console.log(loginResponse)

    } catch (err: any) {
      setErrors({
        general: err instanceof z.ZodError 
          ? err.errors[0].message 
          : err.message || "Erro ao fazer login"
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          Entrar
        </h1>

        {errors.general && (
          <div className="mb-4 p-3 bg-red-900/20 border border-red-700 text-red-400 text-center rounded">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <Mail className={`absolute top-3 left-3 ${errors.email ? 'text-red-400' : 'text-gray-500'}`} size={20} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-2 bg-gray-800 text-white border-2 rounded-lg focus:outline-none 
                ${errors.email 
                  ? 'border-red-500 focus:ring focus:ring-red-700' 
                  : 'border-gray-700 focus:border-blue-600 focus:ring focus:ring-blue-900'
                }`}
              placeholder="Email"
              required
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="relative">
            <Lock className={`absolute top-3 left-3 ${errors.password ? 'text-red-400' : 'text-gray-500'}`} size={20} />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-2 bg-gray-800 text-white border-2 rounded-lg focus:outline-none 
                ${errors.password 
                  ? 'border-red-500 focus:ring focus:ring-red-700' 
                  : 'border-gray-700 focus:border-blue-600 focus:ring focus:ring-blue-900'
                }`}
              placeholder="Senha"
              required
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 text-white font-semibold rounded-lg transition 
              ${isSubmitting 
                ? 'bg-blue-900 cursor-not-allowed' 
                : 'bg-blue-700 hover:bg-blue-600 focus:ring focus:ring-blue-900'
              }`}
          >
            {isSubmitting ? 'Entrando...' : 'Login'}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-400">
          Não possui uma conta?{" "}
          <Link href="/auth/signup" className="text-blue-500 hover:underline font-semibold">
            Cadastrar
          </Link>
        </p>
      </div>
    </div>
  );
}