"use client";
// components/SubNavbar.tsx

import Link from 'next/link'
import { Home, List, Target, Settings, LogOutIcon } from 'lucide-react'
import { SyntheticEvent } from 'react';
import { redirect, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Props {
    slug: string
}

export default function SubNavbar({ slug }: Props) {    
    const handleCompanyLogout = async (e: SyntheticEvent) => {
        e?.preventDefault()
        
        console.log("SLUG ")
        console.log(slug)        

        const res: any = await axios.post(`/api/company/${slug}/logout`)
        if(!res.error) {
            return redirect('/')
        }        
    }
    return (
        <div className="bg-gray-700 text-white p-4 rounded-b-lg shadow-lg">
            <div className="flex justify-center items-center space-x-6">
                <nav className="flex space-x-6">
                    <Link href={`/my-company/${slug}`} className="flex items-center text-gray-300 hover:text-white">
                        <Home size={20} className="mr-2" />
                        Início
                    </Link>
                    <Link href={`/my-company/${slug}/manage-goals`} className="flex items-center text-gray-300 hover:text-white">
                        <Target size={20} className="mr-2" />
                        Metas
                    </Link>
                    <Link href={`/my-company/${slug}/reports`} className="flex items-center text-gray-300 hover:text-white">
                        <List size={20} className="mr-2" />
                        Relatórios
                    </Link>
                    <Link href={`/my-company/${slug}/info`} className="flex items-center text-gray-300 hover:text-white">
                        <List size={20} className="mr-2" />
                        Informações
                    </Link>
                    
                    <Link href={`/my-company/${slug}/settings`} className="flex items-center text-gray-300 hover:text-white">
                        <Settings size={20} className="mr-2" />
                        Configurações
                    </Link>

                    <button 
                        onClick={handleCompanyLogout}
                        className="flex items-center text-gray-300 hover:text-white">
                        <LogOutIcon size={29} className="mr-2" />
                        Sair
                    </button>
                </nav>
            </div>
        </div>
    )
}
