"use client";

import { useEnvInfo } from '@/hooks/useEnvInfo';
import React, { useState } from 'react';

const ContactPage = () => {    
    const { data, isLoading }= useEnvInfo()
    console.log(data)
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        mensagem: '',
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission (e.g., send data to an API)
        console.log('Form Submitted', formData);
    };

    return (
      <div className="min-h-screen flex flex-col items-center py-10 px-6 bg-white text-gray-900">
        {/* Header Section */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Entre em Contato</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Estamos aqui para ajudar! Se você tiver alguma dúvida ou precisar de mais informações, não hesite em entrar em contato conosco.
          </p>
        </header>

        {/* Contact Form Section */}
        <section className="w-full max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-xl shadow-lg">
            <div className="mb-6">
              <label htmlFor="nome" className="block text-lg font-medium text-gray-800">Nome</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                className="w-full p-3 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-lg font-medium text-gray-800">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="mensagem" className="block text-lg font-medium text-gray-800">Mensagem</label>
              <textarea
                id="mensagem"
                name="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                required
                className="w-full p-3 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition"
            >
              Enviar Mensagem
            </button>
          </form>
        </section>

        {/* Contact Info Section */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Outras Formas de Contato</h2>
          <p className="text-lg text-gray-600 mb-4">Você também pode nos contatar através dos seguintes canais:</p>
          <div className="flex flex-col items-start gap-2">
            <p className="text-lg text-gray-600">
                {data?.OWNER_EMAIL? `Email: ${data?.OWNER_EMAIL}`: ""}
            </p>
            <p className="text-lg text-gray-600">
                {data?.OWNER_NUMBER? `Whatsapp: ${data.OWNER_NUMBER}`: ""}                
            </p>
          </div>
        </section>
      </div>
    );
};

export default ContactPage;
