import { PublicUser } from '@/lib/AuthOptions';
import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Session } from 'next-auth';

// Função para pegar os dados em cache ou retornar null se não existir

export default function useFileSender(session: Session | null){
    const uploadfile = async (file: File) => {
        if(!session) return null 
        // TODO
        const formdata = new FormData()
        formdata.append('file', file)
        const response = await axios.post('/api/upload/image', { formdata })
        console.log("RESPONSE FOR USE FILE SENDER")
        console.log(response)
    }
    return uploadfile
}