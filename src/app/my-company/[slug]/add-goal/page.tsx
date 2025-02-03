"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter, useParams, redirect } from "next/navigation";
import { BigLoadingSpinner } from "@/components/LoadingSpinner";
import { useCompany } from "@/hooks/useCompany";

// Tipos do formulário
type GoalFormData = {
  title: string;
  description: string;
  type: string;
  targetValue: number;
  startDate: string;
  endDate: string;
  frequency: string;
};

export default function AddGoalPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { data: company, isLoading: companyLoading } = useCompany(slug as string);

  const [formData, setFormData] = useState<GoalFormData>({
    title: "",
    description: "",
    type: "FINANCIAL",
    targetValue: 0,
    startDate: "",
    endDate: "",
    frequency: "MONTHLY",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    alert("TODO: submit add-goal");
    redirect(`/my-company/${slug}`)
  };

  if (companyLoading) return <BigLoadingSpinner />;

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Adicionar Nova Meta</h1>
      <GoalForm formData={formData} isSubmitting={isSubmitting} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
    </div>
  );
}

function GoalForm({ formData, isSubmitting, handleInputChange, handleSubmit }: { 
  formData: GoalFormData; 
  isSubmitting: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField label="Título" name="title" type="text" value={formData.title} onChange={handleInputChange} required />
      <TextAreaField label="Descrição" name="description" value={formData.description} onChange={handleInputChange} />
      <SelectField label="Tipo de Meta" name="type" value={formData.type} onChange={handleInputChange} options={{
        FINANCIAL: "Financeira",
        PERFORMANCE: "Desempenho",
        SALES: "Vendas",
        OPERATIONAL: "Operacional",
        CUSTOMER_SATISFACTION: "Satisfação do Cliente",
        INNOVATION: "Inovação",
        SUSTAINABILITY: "Sustentabilidade",
      }} />
      <InputField label="Valor Alvo" name="targetValue" type="number" value={formData.targetValue} onChange={handleInputChange} required />
      <InputField label="Data de Início" name="startDate" type="date" value={formData.startDate} onChange={handleInputChange} required />
      <InputField label="Data de Término" name="endDate" type="date" value={formData.endDate} onChange={handleInputChange} required />
      <SelectField label="Frequência" name="frequency" value={formData.frequency} onChange={handleInputChange} options={{
        DAILY: "Diária",
        WEEKLY: "Semanal",
        MONTHLY: "Mensal",
        SEMESTRALLY: "Semestral",
        ANNUALLY: "Anual",
      }} />
      <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400">
        {isSubmitting ? "Enviando..." : "Adicionar Meta"}
      </button>
    </form>
  );
}

function InputField({ label, name, type, value, onChange, required }: { 
  label: string;
  name: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-black dark:bg-gray-800 dark:text-white"
      />
    </div>
  );
}

function TextAreaField({ label, name, value, onChange }: { 
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-black dark:bg-gray-800 dark:text-white"
      />
    </div>
  );
}

function SelectField({ label, name, value, onChange, options }: { 
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Record<string, string>;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white text-black dark:bg-gray-800 dark:text-white"
      >
        {Object.entries(options).map(([key, label]) => (
          <option key={key} value={key}>{label}</option>
        ))}
      </select>
    </div>
  );
}
