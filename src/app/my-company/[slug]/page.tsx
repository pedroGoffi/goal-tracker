"use client"
import { BigLoadingSpinner } from '@/components/LoadingSpinner';
import SubNavbar from '@/components/my-company/my-company-navbar';
import { useCompany } from '@/hooks/useCompany';
import useUser from '@/hooks/useUser';
import { motion } from 'framer-motion';
import { LayoutDashboard, BarChart, Settings, Rocket, Zap, Users, Briefcase, Globe, Clock, PieChart, Target, TrendingUp, FileText, Bell, Shield, Loader, Plus } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect, useParams } from 'next/navigation';
import { useEffect } from 'react';

  

interface Action{
    icon:           React.ReactElement,
    title:          string,
    description:    string,
    bgColor:        string,
    href:           string
}
export default function MyCompanyHomeView() {
    const session               = useSession();
    const { slug }              = useParams()
    let { 
        data:           userData, 
        isLoading:      userLoading
    } = useUser(session.data);    
    const {
        data: companyInfo
    } = useCompany(slug as string)
        
    // Panel actions
    const actions: Action[] = [
        {
            icon:           <Plus size={32} className="text-white"/>,
            title:          'Adicionar item',
            bgColor:        'bg-gradient-to-br from-lime-950 to-lime-500',
            description:    'Adicionar metricas',
            href:           "add-goal"
        },
        {
            icon: <LayoutDashboard size={32} className="text-white" />,
            title: 'Dashboard',
            description: 'Acesse métricas detalhadas em tempo real.',
            bgColor: 'bg-gradient-to-br from-primary to-secondary',
            href:           "#"
        },
        {
            icon: <BarChart size={32} className="text-white" />,
            title: 'Relatórios',
            description: 'Gere relatórios personalizados para seus objetivos.',
            bgColor: 'bg-gradient-to-br from-purple-500 to-indigo-600',
            href:           "#"
        },
        {
            icon: <Settings size={32} className="text-white" />,
            title: 'Configurações',
            description: 'Configure suas preferências e integrações.',
            bgColor: 'bg-gradient-to-br from-pink-500 to-rose-600',
            href:           "#"
        },
        {
            icon: <Rocket size={32} className="text-white" />,
            title: 'Otimização',
            description: 'Descubra como melhorar seus resultados.',
            bgColor: 'bg-gradient-to-br from-teal-500 to-cyan-600',
            href:           "#"
        },        
        {
            icon: <Bell size={32} className="text-white" />,
            title: 'Notificações',
            description: 'Mantenha-se atualizado com alertas importantes.',
            bgColor: 'bg-gradient-to-br from-blue-500 to-sky-600',
            href:           "#"
        },
    ];

    
    if(session.status == "loading" || userLoading) {
        return <BigLoadingSpinner />
    }
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-dark to-dark-2 text-white">
            <SubNavbar slug={slug as string} key='my-company-navbar'/>
            {/* Header */}
            <motion.header
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="py-12 bg-dark-2/50 backdrop-blur-md"
            >
                <div className="container mx-auto px-4 text-center">
                
                <h1 className="text-5xl font-bold mb-4">
                    Seja bem vindo(a) <hr />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                        {userData?.name}
                    </span>                
                </h1>
                                                
                <p className="text-lg text-gray-300">
                    Transformamos dados em resultados. Escolha uma ação para começar.
                </p>
                </div>
            </motion.header>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-16">
                {/* Company Info Panel */}
                <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-dark-2/50 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-gray-800/50 mb-16"
                >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="flex items-center space-x-4">
                    <Briefcase size={32} className="text-primary" />
                    <div>
                        <h2 className="text-xl font-bold">{companyInfo?.nomeFantasia}</h2>
                        <p className="text-gray-300">Empresa</p>
                    </div>
                    </div>
                    <div className="flex items-center space-x-4">
                    <Clock size={32} className="text-secondary" />
                    <div>
                        <h2 className="text-xl font-bold">Fundada em {new Date(companyInfo?.createdAt!).toLocaleDateString()}</h2>
                        <p className="text-gray-300">História</p>
                    </div>
                    </div>
                    <div className="flex items-center space-x-4">
                    <Globe size={32} className="text-primary" />
                    <div>
                        <h2 className="text-xl font-bold">{companyInfo?.setorAtividade}</h2>
                        <p className="text-gray-300">Localização</p>
                    </div>
                    </div>
                    <div className="flex items-center space-x-4">
                    <Users size={32} className="text-secondary" />
                    <div>
                        <h2 className="text-xl font-bold">{companyInfo?.cnpj}</h2>
                        <p className="text-gray-300">Funcionários</p>
                    </div>
                    </div>
                    <div className="flex items-center space-x-4">
                    <PieChart size={32} className="text-primary" />
                    <div>
                        <h2 className="text-xl font-bold">{companyInfo?.faturamentoAnual}</h2>
                        <p className="text-gray-300">Faturamento Anual</p>
                    </div>
                    </div>
                    <div className="flex items-center space-x-4">
                    <Rocket size={32} className="text-secondary" />
                    <div>
                        <h2 className="text-xl font-bold">{companyInfo?.tipoEmpresa}</h2>
                        <p className="text-gray-300">Missão</p>
                    </div>
                    </div>
                </div>
                </motion.div>

                {/* Action Panel */}
                <motion.h2
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-3xl font-bold text-center mb-12"
                >
                O que você deseja fazer hoje?
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {actions.map((action, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        className={`${action.bgColor} p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer`}
                    >
                    <Link 
                        href={`/my-company/${slug}/${action.href}`}
                        className="flex flex-col items-center text-center space-y-4"
                    >                        
                        {action.icon}
                        <h2 className="text-2xl font-bold">{action.title}</h2>
                        <p className="text-gray-200">{action.description}</p>
                    </Link>
                    </motion.div>
                ))}
                </div>
            </div>
        </div>
    );
}