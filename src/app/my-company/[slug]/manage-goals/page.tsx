"use client";

import { useState } from "react";
import { Goal, GoalFrequency } from "@prisma/client";
import { useCompanyGoals } from "@/hooks/useCompanyGoals";
import { ChevronDownIcon, ChevronUpIcon, ArrowRightIcon } from "lucide-react"; // Import Lucide icons
import SubNavbar from "@/components/my-company/my-company-navbar";
import { useParams } from "next/navigation";

export default function ManageGoalsPage() {
    const { slug } = useParams()
    const [frequency, setFrequency] = useState<"ALL" | GoalFrequency>("ALL");
    const { data, isLoading } = useCompanyGoals(slug as string, "ALL", "ALL");

    return (
        <div className="p-8 bg-gradient-to-br from-blue-50 to-white shadow-xl rounded-lg max-w-4xl mx-auto">
            <SubNavbar slug={slug as string} />
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center py-10">Gerenciar Metas</h1>

            {/* Frequency Selection */}
            <div className="flex justify-between items-center mb-6">
              <label htmlFor="frequency" className="text-lg  font-medium">Frequência:</label>
              <div className="relative">
                  <select
                      id="frequency"
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value as GoalFrequency)}
                      className="p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10 appearance-none text-white text-center"
                  > 
                      <option value="ALL">Todas</option>
                      <option value="DAILY">Diárias</option>
                      <option value="WEEKLY">Semanais</option>
                      <option value="MONTHLY">Mensais</option>
                      <option value="SEMESTRALLY">Semestrais</option>
                      <option value="ANNUALLY">Anuais</option>
                  </select>
                {/* Arrow Icon */}
                <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              </div>
            </div>

            {/* Loading and Goal List */}
            {isLoading ? (
              <div className="flex justify-center text-lg text-gray-600">Carregando...</div>
            ) : (
              <ul className="space-y-8">
                {data?.map((goal: Goal) => (
                  // Render the goal only if the frequency matches or if frequency is "ALL"
                  (frequency === "ALL" || goal.frequency === frequency) && (
                    <li key={goal.id} className="p-6 bg-white shadow-md rounded-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
                      <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-semibold text-gray-900">{goal.title}</h2>
                        <ArrowRightIcon className="w-6 h-6 text-gray-600 cursor-pointer hover:text-indigo-500" />
                      </div>
                      <p className="text-gray-600 mt-2">{goal.description}</p>
                      <div className="text-sm text-gray-500 mt-4">
                        <span className="font-semibold">Status:</span> {goal.status} | 
                        <span className="font-semibold"> Prazo:</span> {new Date(goal.endDate).toLocaleDateString()}
                      </div>
                    </li>
                  )
                ))}
              </ul>
            )}
        </div>
  );
}
