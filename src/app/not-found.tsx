"use client";

"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, BarChart2, Database } from 'lucide-react';
import Link from 'next/link';

const PageNotFound = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-ltext-black py-12 px-6 relative"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
       
      >        
        <div className="text-center text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-bl from-blue-500 to-pink-500 mb-8 tracking-wide animate-bounce transition-none">
          404
        </div>

        <motion.p
          className="text-2xl mb-6 opacity-80"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Desculpe, a página que você está procurando não existe ou foi movida.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="flex flex-col sm:flex-row justify-center gap-6"
        >
          <Link href="/" passHref>
            <motion.button
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 text-xl bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all duration-200"
            >
              Início
            </motion.button>
          </Link>

          <Link href="/contact" passHref>
            <motion.button
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 text-xl bg-transparent border-2 text-black border-white rounded-lg shadow-lg hover:bg-slate-500transition-all duration-200 hover:text-white"
            >
              Contato
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          className="flex flex-col items-center cursor-pointer"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <motion.div
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-10"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, ease: 'linear' }}
          >
            <Link href="#" passHref>
              <motion.div
                whileHover={{ scale: 1.1 }}
                initial={{ x: -200, y: 100 }}
                animate={{ x: 0, y: 0 }}
                transition={{ delay: 1, ease: 'linear' }}
                className="flex flex-col items-center cursor-pointer"
              >
                <TrendingUp size={40} />
                <span className="mt-2 text-sm">Exploração</span>
              </motion.div>
            </Link>

            <Link href="#" passHref>
              <motion.div
                whileHover={{ scale: 1.1 }}
                initial={{ x: -100, y: 100 }}
                animate={{ x: 0, y: 0 }}
                transition={{ delay: 1, ease: 'linear' }}
                className="flex flex-col items-center cursor-pointer"
              >
                <Shield size={40} />
                <span className="mt-2 text-sm">Segurança</span>
              </motion.div>
            </Link>

            <Link href="#" passHref>
              <motion.div
                whileHover={{ scale: 1.1 }}
                initial={{ x: 100, y: 100 }}
                animate={{ x: 0, y: 0 }}
                transition={{ delay: 1, ease: 'linear' }}
                className="flex flex-col items-center cursor-pointer"
              >
                <BarChart2 size={40} />
                <span className="mt-2 text-sm">Análises</span>
              </motion.div>
            </Link>

            <Link href="#" passHref>
              <motion.div
                whileHover={{ scale: 1.1 }}
                initial={{ x: 200, y: 100 }}
                animate={{ x: 0, y: 0 }}
                transition={{ delay: 1, ease: 'linear' }}
                className="flex flex-col items-center cursor-pointer"
              >
                <Database size={40} />
                <span className="mt-2 text-sm">Dados</span>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PageNotFound;
