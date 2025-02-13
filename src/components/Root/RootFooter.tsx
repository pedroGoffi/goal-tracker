"use client";

import React, { JSX } from "react";
import { useEnvInfo } from "@/hooks/useEnvInfo";
import { motion } from "framer-motion";
import { FiArrowUp, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaLinkedin, FaGithub } from "react-icons/fa";

// Types
interface ContactInfo {
  email: string;
  phone: string;
  location: string;
}

interface SocialLink {
  platform: "linkedin" | "github";
  url: string;
  icon: JSX.Element;
}

// Constants
const CONTACT_INFO: ContactInfo = {
  email:    "pedro.h.goffi@gmail.com",
  phone:    "+55 (54) 99707-9061",
  location: "Rio Grande do Sul, Brasil"
};

const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: "linkedin",
    url:      "https://www.linkedin.com/in/pedro-henrique-goffi-de-paulo-bb0426230/",
    icon:     <FaLinkedin className="text-xl" />
  },
  {
    platform: "github",
    url:      "github.com/pedroGoffi",
    icon:     <FaGithub className="text-xl" />
  }
];

// Animation variants
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// Components
const BrandSection = () => (
  <motion.div
    variants={fadeInUpVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="space-y-4"
  >
    <div className="flex items-center gap-2">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Objectivo
      </h2>
      <div className="h-5 w-5 bg-purple-500 rounded-full animate-pulse" />
    </div>
    <p className="text-sm text-white/60 leading-relaxed max-w-md">
      Transformando ideias em soluções digitais inovadoras. 
      Acompanhe nossas atualizações e faça parte dessa jornada.
    </p>
  </motion.div>
);

const NewsletterSection = () => {
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // TODO: Implement newsletter subscription
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEmail("");
      // TODO: Show success message
    } catch (error) {
      // TODO: Show error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      variants={fadeInUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-4"
    >
      <h3 className="text-sm font-medium text-white/90">
        Inscreva-se em nossa newsletter
      </h3>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu melhor email"
          required
          disabled={isLoading}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm 
                   placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500
                   hover:border-white/20 transition-all duration-200 disabled:opacity-50"
        />
        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="shrink-0 bg-gradient-to-r from-blue-500 to-purple-500 
                   text-white px-6 py-3 rounded-lg font-medium transition-all
                   hover:opacity-90 focus:ring-2 focus:ring-purple-500 
                   focus:ring-offset-2 focus:ring-offset-[#0a0a0a]
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Enviando..." : "Inscrever"}
        </motion.button>
      </form>
    </motion.div>
  );
};

const ContactSection = () => {
  const contactItems = [
    { icon: <FiMail className="text-lg" />, text: CONTACT_INFO.email },
    { icon: <FiPhone className="text-lg" />, text: CONTACT_INFO.phone },
    { icon: <FiMapPin className="text-lg" />, text: CONTACT_INFO.location }
  ];

  return (
    <motion.div
      variants={fadeInUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-6"
    >
      <h3 className="text-sm font-semibold text-white/90 uppercase tracking-wider">
        Contato
      </h3>
      <div className="space-y-4">
        {contactItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 text-sm text-white/60 
                     hover:text-purple-400 transition-colors group cursor-pointer"
          >
            <span className="shrink-0 group-hover:scale-110 transition-transform">
              {item.icon}
            </span>
            {item.text}
          </div>
        ))}
      </div>
      <div className="flex gap-4 pt-2">
        {SOCIAL_LINKS.map((link) => (
          <motion.a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            className="p-2.5 bg-white/5 rounded-lg text-white/60 
                     hover:bg-white/10 hover:text-purple-400 transition-all
                     focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label={`Visite nosso ${link.platform}`}
          >
            {link.icon}
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

const ScrollToTopButton = () => (
  <motion.button
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    whileHover={{ scale: 1.05 }}
    className="flex items-center gap-2 text-white/50 hover:text-purple-400 
               transition-colors group focus:outline-none"
    aria-label="Voltar ao topo da página"
  >
    <FiArrowUp className="group-hover:-translate-y-1 transition-transform" />
    <span>Voltar ao Topo</span>
  </motion.button>
);

export default function Footer() {
  const { data: env } = useEnvInfo();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0a0a0a] border-t border-white/5 overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10"
      />

      <div className="container mx-auto px-4 py-16 relative">
        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          <div className="space-y-8 lg:w-1/2">
            <BrandSection />
            <NewsletterSection />
          </div>
          <div className="lg:w-1/2">
            <ContactSection />
          </div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="border-t border-white/10 my-12"
        />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-white/50 text-center">
            &copy; {currentYear} Objectivo {env?.OWNER_NAME && `- ${env.OWNER_NAME}`}.
            Todos os direitos reservados.
          </p>
          <ScrollToTopButton />
        </div>
      </div>
    </footer>
  );
}
