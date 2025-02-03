"use client"
import { motion } from 'framer-motion';
import { Rocket, Globe, BarChart, Users, BrainCircuit, ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const FloatingElement = ({ children }: any) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [-5, 5, -5] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

const ObjetivoFacilHomepage = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const features = [
    { icon: <Globe className="w-8 h-8" />, title: "Global Reach", metric: "25+", desc: "Countries served" },
    { icon: <Rocket className="w-8 h-8" />, title: "Innovation", metric: "98%", desc: "Success rate" },
    { icon: <Users className="w-8 h-8" />, title: "Community", metric: "10k+", desc: "Active users" },
    { icon: <BrainCircuit className="w-8 h-8" />, title: "AI Power", metric: "24/7", desc: "Smart analytics" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Objetivo Fácil
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Revolutionizing business strategy through intelligent goal management
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-block"
          >
            <button className="flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)] transition-all">
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 + 0.5 }}
                className="bg-gray-800/30 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 hover:border-cyan-400/30 transition-all"
              >
                <FloatingElement>
                  <div className="mb-4 text-cyan-400">{feature.icon}</div>
                </FloatingElement>
                <h3 className="text-2xl font-bold mb-2">{feature.metric}</h3>
                <p className="text-gray-400">{feature.title}</p>
                <p className="text-sm text-cyan-100/70 mt-2">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Grid Section */}
      <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            <div className="space-y-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Smart Goal Management
              </h2>
              <p className="text-gray-300 text-lg">
                Our AI-powered platform transforms your business objectives into actionable strategies with real-time progress tracking.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Automated Milestones", icon: <BarChart /> },
                  { title: "Team Collaboration", icon: <Users /> },
                  { title: "Predictive Analytics", icon: <BrainCircuit /> },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ x: -20 }}
                    animate={inView ? { x: 0 } : {}}
                    transition={{ delay: index * 0.2 }}
                    className="flex items-center gap-4 p-6 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/30 hover:border-cyan-400/30 transition-all"
                  >
                    <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative h-96 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-[3rem] border border-gray-700/50 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 backdrop-blur-xl" />
              <div className="relative z-10 p-8 text-center">
                <div className="inline-block transform rotate-12">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="text-cyan-400/20"
                  >
                    <BrainCircuit className="w-32 h-32" />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-500/10 to-purple-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: "95%", label: "Client Satisfaction" },
              { value: "2.5x", label: "Faster Growth" },
              { value: "10k+", label: "Daily Decisions" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.2 }}
                className="p-8 bg-gray-900/30 backdrop-blur-lg rounded-2xl border border-gray-700/50 text-center"
              >
                <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
                  {stat.value}
                </div>
                <div className="text-gray-300 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ObjetivoFacilHomepage;