"use client";

import { useEnvInfo } from "@/hooks/useEnvInfo";
import { motion } from "framer-motion";
import { FiArrowUp, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaDiscord, FaTiktok, FaSpotify, FaDribbble } from "react-icons/fa";
import { SiWebflow } from "react-icons/si";

export default function RodapeModerno() {
  const { data: env } = useEnvInfo();

  const voltarAoTopo = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const redesSociais = [
    { icone: <SiWebflow className="text-2xl" />, link: "#" },
    { icone: <FaDiscord className="text-2xl" />, link: "#" },
    { icone: <FaTiktok className="text-2xl" />, link: "#" },
    { icone: <FaSpotify className="text-2xl" />, link: "#" },
    { icone: <FaDribbble className="text-2xl" />, link: "#" },
  ];

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
      {/* Gradiente de fundo */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10 opacity-10" />
      
      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          {/* Coluna da Marca */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 text-2xl font-bold">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Objectivo
                </span>
                <div className="h-6 w-6 bg-purple-500 rounded-full" />
              </div>
              <p className="mt-4 text-sm text-white/60 leading-relaxed">
                Redefinindo o acompanhamento de metas através de insights com IA
                e design centrado no usuário.
              </p>
            </motion.div>
            
            {/* Formulário de Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-white/90">
                  Assine nossa newsletter
                </h4>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Digite seu email"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    aria-label="Digite seu email"
                  />
                  <button className="shrink-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
                    Assinar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Links do Produto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h4 className="text-sm font-semibold text-white/90 uppercase tracking-wider">
              Produto
            </h4>
            <ul className="space-y-4">
              {['Funcionalidades', 'Integrações', 'Planos', 'Atualizações', 'Documentação'].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-sm text-white/60 hover:text-purple-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Links da Empresa */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h4 className="text-sm font-semibold text-white/90 uppercase tracking-wider">
              Empresa
            </h4>
            <ul className="space-y-4">
              {['Sobre', 'Blog', 'Carreiras', 'Imprensa', 'Contato'].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-sm text-white/60 hover:text-purple-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contato e Redes Sociais */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h4 className="text-sm font-semibold text-white/90 uppercase tracking-wider">
              Contato
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-white/60 hover:text-purple-400 transition-colors">
                <FiMail className="shrink-0" />
                contato@objectivo.com.br
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60 hover:text-purple-400 transition-colors">
                <FiPhone className="shrink-0" />
                +55 (11) 99999-9999
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60 hover:text-purple-400 transition-colors">
                <FiMapPin className="shrink-0" />
                São Paulo, Brasil
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              {redesSociais.map((rede, index) => (
                <motion.a
                  key={index}
                  href={rede.link}
                  whileHover={{ y: -2 }}
                  className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-purple-400"
                  aria-label={`Link para ${rede.link}`}
                >
                  {rede.icone}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divisor */}
        <div className="border-t border-white/10 my-12" />

        {/* Rodapé Inferior */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-white/50 text-center">
            &copy; {new Date().getFullYear()} Objectivo - {env?.OWNER_NAME}.
            Todos os direitos reservados.
          </p>
          
          <motion.button
            onClick={voltarAoTopo}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 text-white/50 hover:text-purple-400 transition-colors"
            aria-label="Voltar ao topo da página"
          >
            <FiArrowUp />
            <span>Voltar ao Topo</span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}