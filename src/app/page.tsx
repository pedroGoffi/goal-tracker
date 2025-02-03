"use client";

import { motion } from 'framer-motion';
import { 
  Target, 
  ChartBar, 
  ShieldCheck,
  CalendarCheck,
  Database,
  ArrowRight,
  PlayCircle,
  Trophy,
  LayoutDashboard
} from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const features = [
    {
      icon: <Trophy className="w-8 h-8 text-blue-400" />,
      title: "Gestão de Metas",
      description: "Defina e organize objetivos com sistema de milestones",
      badge: "Intuitivo"
    },
    {
      icon: <ChartBar className="w-8 h-8 text-green-400" />,
      title: "Análise Visual",
      description: "Dashboards interativos e relatórios de progresso",
      badge: "Em Tempo Real"
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-purple-400" />,
      title: "Segurança Total",
      description: "Dados protegidos com criptografia avançada",
      badge: "Confiável"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <header className="max-w-6xl mx-auto px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 relative"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-100 leading-tight">
            Alcance Seus Objetivos com
            <span className="block mt-3 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Precisão e Clareza
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Plataforma intuitiva para definição, acompanhamento e análise de metas pessoais e profissionais
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href="/cadastro"
              className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-green-500 text-white px-8 py-4 rounded-xl font-medium hover:from-blue-500 hover:to-green-400 transition-all shadow-lg hover:shadow-blue-500/20"
            >
              <Target className="w-5 h-5" />
              Começar Agora
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            
            <Link
              href="/demonstracao"
              className="flex items-center gap-3 border border-blue-400/30 bg-blue-400/10 px-8 py-4 rounded-xl hover:border-blue-300/50 transition-all backdrop-blur-sm"
            >
              <PlayCircle className="w-5 h-5 text-blue-400" />
              Ver Demonstração
            </Link>
          </div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div 
          className="mt-16 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="p-4 border-b border-gray-700 flex items-center gap-4 bg-gray-900">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 bg-gray-700 h-8 rounded-lg" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Progress Chart */}
            <div className="space-y-4">
              <div className="h-48 bg-gray-900 rounded-xl p-4">
                <div className="flex items-end gap-3 h-full">
                  {[60, 80, 100].map((height, index) => (
                    <motion.div
                      key={index}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      className="w-1/3 bg-gradient-to-t from-blue-600 to-green-500 rounded-t-xl"
                    />
                  ))}
                </div>
              </div>
              <div className="text-center text-sm text-blue-400 font-medium">
                Progresso Mensal
              </div>
            </div>

            {/* Goals List */}
            <div className="space-y-6">
              {['Meta Profissional', 'Desenvolvimento Pessoal', 'Saúde e Bem-Estar'].map((goal, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-100">{goal}</h3>
                    <div className="h-1 bg-gray-700 rounded-full mt-2">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-600 to-green-500 rounded-full transition-all duration-500"
                        style={{ width: `${(index + 1) * 30}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </header>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-700"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <div className="mb-2">
                <span className="bg-blue-400/10 text-blue-400 text-xs px-3 py-1 rounded-full">
                  {feature.badge}
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Security Section */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-blue-600/30 to-green-500/30 rounded-2xl p-8 border border-blue-400/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block p-4 bg-blue-400/10 rounded-2xl mb-6">
              <ShieldCheck className="w-12 h-12 mx-auto text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-100">
              Segurança e Privacidade
            </h2>
            <p className="text-lg mb-8 text-gray-300">
              Seus dados protegidos com tecnologia de última geração
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              {['Criptografia AES-256', 'Backups Diários', 'Autenticação em 2 Fatores'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-900/50 p-4 rounded-lg border border-blue-400/20">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}