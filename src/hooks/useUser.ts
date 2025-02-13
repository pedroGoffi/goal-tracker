import { PublicUser } from '@/lib/AuthOptions';
import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Session } from 'next-auth';

// Função para pegar os dados em cache ou retornar null se não existir
export default function useUser(session: Session | null){    
    const fetchData = async () => {
        if(!session?.user) return null;
        const userId: string | undefined = (session?.user as PublicUser)?.id        
        
        if(!userId) return null 
        const response = await axios.post(`/api/users/${userId}/get`)
        return response.data?.user ?? null
    }
    

    return useQuery<Omit<User, 'password'>>({
        queryKey:       [`user-${session?.user?.name}`],
        queryFn:        () => fetchData(),
        staleTime:      Infinity,
        retryOnMount:   false,
    })    
}