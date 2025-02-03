"use client"

import { useCompany } from "@/hooks/useCompany"
import { redirect, useParams } from "next/navigation"
import { CheckCircle, XCircle } from 'lucide-react'
import SubNavbar from "@/components/my-company/my-company-navbar"
import { useSession } from "next-auth/react"
import useUser from "@/hooks/useUser"



export default function MyCompanyPage() {
    const { slug }                      = useParams()    
    const session                       = useSession()    
    const { 
        data: user
    } = useUser(session.data)
    
    const { 
        data:           company, 
        isLoading:      isLoadingCompany, 
        isError:        isErrorCompany 
    }  = useCompany(slug as string)

    if (session.status != "authenticated") 
        redirect('/')
        
    
    console.log("USER -------")
    console.log(user)

    if (isLoadingCompany) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="text-lg text-gray-600">Carregando sua empresa...</div>
            </div>
        )
    }

    if (isErrorCompany) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <XCircle className="text-red-500 mr-2" size={24} />
                <div className="text-lg text-red-500">Erro ao carregar as informações da empresa.</div>
            </div>
        )
    }

    if (!company) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="text-lg text-gray-600">Não foi possível encontrar a empresa.</div>
            </div>
        )
    }

    return (
        <>
            
            <SubNavbar slug={slug as string}/>
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">


                <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                    <CheckCircle className="inline-block text-green-500 mr-2" size={28} />
                    Informações da Empresa
                </h1>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <strong className="text-gray-700">Nome da Empresa:</strong>
                        <span className="text-gray-600">{company.nomeEmpresa}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <strong className="text-gray-700">Nome Fantasia:</strong>
                        <span className="text-gray-600">{company.nomeFantasia}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <strong className="text-gray-700">CNPJ:</strong>
                        <span className="text-gray-600">{company.cnpj}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <strong className="text-gray-700">Tipo de Empresa:</strong>
                        <span className="text-gray-600">{company.tipoEmpresa}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <strong className="text-gray-700">Setor de Atividade:</strong>
                        <span className="text-gray-600">{company.setorAtividade}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <strong className="text-gray-700">Capital Social:</strong>
                        <span className="text-gray-600">{company.capitalSocial}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <strong className="text-gray-700">Faturamento Anual:</strong>
                        <span className="text-gray-600">{company.faturamentoAnual!}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <strong className="text-gray-700">Data de Fundação:</strong>
                        <span className="text-gray-600">{new Date(company.foundationDate!).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <strong className="text-gray-700">Data de Criação:</strong>
                        <span className="text-gray-600">{new Date(company.createdAt!).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <strong className="text-gray-700">Última Atualização:</strong>
                        <span className="text-gray-600">{new Date(company.updatedAt!).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        </>
    )
}   
