"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import SubNavbar from "@/components/my-company/my-company-navbar";

const mockCompanySettings = {
  id: "d2a8ffcb-b3f7-4b65-9d1f-83d27e2e5773",
  companyId: "e45d124f-b0e1-4d0f-96a2-bc9448e5bba9",
  timezone: "UTC",
  logoUrl: "https://example.com/logo.png",
  website: "https://techinnovations.com",
  emailContact: "support@techinnovations.com",
  phoneContact: "+1234567890",
  enableReports: true,
  enableNotifications: true,
  twoFactorAuth: false,
  createdAt: new Date("2023-01-01T12:00:00Z"),
  updatedAt: new Date("2024-01-01T12:00:00Z"),
};

export default function CompanySettingsPage() {
  const { slug } = useParams();
  const [companyData, setCompanyData] = useState(mockCompanySettings);
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setCompanyData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      console.log("Company Settings Saved", companyData);
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="max-h-screen bg-gray-900 p-6 max-w-2xl mx-auto">
      <SubNavbar slug={slug as string} />
      
      <div className="space-y-8">
        <h1 className="text-2xl font-bold text-gray-100 text-center">Configurações da Empresa</h1>
        
        <form onSubmit={handleSave} className="space-y-6 bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
          {/* Timezone */}
          <div>
            <label htmlFor="timezone" className="block text-sm font-medium text-gray-300 mb-2">
              Fuso Horário
            </label>
            <select
              id="timezone"
              name="timezone"
              value={companyData.timezone}
              onChange={handleInputChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="UTC">UTC</option>
              <option value="PST">PST</option>
              <option value="EST">EST</option>
              <option value="CET">CET</option>
            </select>
          </div>

          {/* Logo URL */}
          <div>
            <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-300 mb-2">
              URL do Logo
            </label>
            <input
              type="text"
              id="logoUrl"
              name="logoUrl"
              value={companyData.logoUrl}
              onChange={handleInputChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500"
              placeholder="https://example.com/logo.png"
            />
          </div>

          {/* Website */}
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-2">
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={companyData.website}
              onChange={handleInputChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500"
              placeholder="https://suaempresa.com"
            />
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="emailContact" className="block text-sm font-medium text-gray-300 mb-2">
                E-mail de Contato
              </label>
              <input
                type="email"
                id="emailContact"
                name="emailContact"
                value={companyData.emailContact}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500"
                placeholder="contato@empresa.com"
              />
            </div>

            <div>
              <label htmlFor="phoneContact" className="block text-sm font-medium text-gray-300 mb-2">
                Telefone de Contato
              </label>
              <input
                type="tel"
                id="phoneContact"
                name="phoneContact"
                value={companyData.phoneContact}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500"
                placeholder="+55 11 99999-9999"
              />
            </div>
          </div>

          {/* Features Section */}
          <div className="space-y-4 pt-4 border-t border-gray-700">
            <div className="flex items-center space-x-3">
              <input
                id="enableReports"
                name="enableReports"
                type="checkbox"
                checked={companyData.enableReports}
                onChange={handleInputChange}
                className="h-5 w-5 text-indigo-500 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500"
              />
              <label htmlFor="enableReports" className="text-sm font-medium text-gray-300">
                Habilitar Relatórios Automáticos
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                id="enableNotifications"
                name="enableNotifications"
                type="checkbox"
                checked={companyData.enableNotifications}
                onChange={handleInputChange}
                className="h-5 w-5 text-indigo-500 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500"
              />
              <label htmlFor="enableNotifications" className="text-sm font-medium text-gray-300">
                Habilitar Notificações
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                id="twoFactorAuth"
                name="twoFactorAuth"
                type="checkbox"
                checked={companyData.twoFactorAuth}
                onChange={handleInputChange}
                className="h-5 w-5 text-indigo-500 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500"
              />
              <label htmlFor="twoFactorAuth" className="text-sm font-medium text-gray-300">
                Autenticação em Dois Fatores (2FA)
              </label>
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={isSaving}
            className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Salvando...
              </span>
            ) : (
              "Salvar Configurações"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}