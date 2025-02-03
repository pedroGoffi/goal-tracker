"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Target, BarChart, Rocket, Sparkles, Lock, LayoutDashboard, Trophy, Calendar } from 'lucide-react';

const AboutPage = () => {
  const features = [
    {
      icon: <LayoutDashboard className="w-8 h-8" />,
      title: "Dashboard Intuitivo",
      description: "Controle completo em uma interface moderna e adaptável",
      color: "from-blue-400 to-cyan-400"
    },
    {
      icon: <BarChart className="w-8 h-8" />,
      title: "Análise em Tempo Real",
      description: "Métricas atualizadas instantaneamente",
      color: "from-purple-400 to-fuchsia-400"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Planejamento Flexível",
      description: "Agende e ajuste metas dinamicamente",
      color: "from-green-400 to-emerald-400"
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Criptografia AES-256",
      description: "Segurança de nível bancário",
      color: "from-orange-400 to-amber-400"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900 text-gray-100 overflow-hidden">
      {/* Hero Section com Parallax */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative pt-32 pb-48 px-6 text-center overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-blue-500/30 blur-3xl -top-32 -left-32 animate-float"></div>
          <div className="absolute w-[400px] h-[400px] bg-gradient-to-l from-purple-500/30 blur-3xl -bottom-32 -right-32 animate-float-delayed"></div>
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="mx-auto mb-12 w-fit bg-gradient-to-br from-blue-500 to-purple-600 p-1 rounded-2xl"
        >
          <div className="bg-gray-900 rounded-2xl p-8 backdrop-blur-xl">
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-purple-400 animate-pulse" />
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Objetivo Fácil
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              A revolução na gestão de metas pessoais chegou. Transforme seus objetivos em realidade com tecnologia 
              intuitiva e design inspirador.
            </p>
          </div>
        </motion.div>
      </motion.section>

      {/* Features Grid Interativo */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-6 mb-32"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -10 }}
            className={`group relative p-8 rounded-2xl bg-gradient-to-br ${feature.color} hover:shadow-2xl transition-all duration-300`}
          >
            <div className="absolute inset-0 bg-gray-900/90 rounded-2xl group-hover:opacity-0 transition-opacity" />
            <div className="relative z-10">
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br mb-6">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Seção de Demonstração Interativa */}
      <div className="relative py-32 px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 mb-16"
          >
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Experiência Imersiva
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Navegue por seus objetivos com uma interface fluida que combina visual impactante e funcionalidades 
              estratégicas.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-xl font-bold text-lg"
            >
              Experimente Grátis
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative lg:absolute lg:right-0 lg:top-32 lg:w-1/2"
          >
            <div className="relative aspect-video bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20" />
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <Rocket className="w-24 h-24 mx-auto mb-8 text-purple-400 animate-float" />
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Preview Interativo
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Timeline Animada */}
      <div className="py-32 px-6 bg-gradient-to-b from-gray-900/50 to-transparent">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-20">Sua Jornada Conosco</h3>
          
          <div className="relative">
            <div className="absolute left-1/2 w-1 bg-gradient-to-b from-blue-400 to-purple-500 h-full -translate-x-1/2" />
            
            {[1, 2, 3, 4].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`mb-16 w-full ${index % 2 === 0 ? 'pr-8 pl-16' : 'pl-8 pr-16'} relative`}
              >
                <div className={`absolute top-4 w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center ${index % 2 === 0 ? '-right-4' : '-left-4'}`}>
                  <span className="text-gray-900 font-bold">{index + 1}</span>
                </div>
                <div className={`p-8 rounded-2xl bg-gray-800 backdrop-blur-xl ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <h4 className="text-xl font-bold mb-4">Etapa {index + 1}</h4>
                  <p className="text-gray-300">Descrição detalhada do processo de evolução contínua</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;