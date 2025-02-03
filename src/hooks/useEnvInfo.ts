import { EnvInfo } from '@/app/api/static-info/route';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'


// Função para buscar os dados da empresa com base no `slug`

export function useEnvInfo() {
    const fetchData = async () => {
        const response = await axios.post(`/api/static-info`);
        return response.data.data;
    }
    return useQuery<EnvInfo>({
      queryKey:       ['env-info'],
      queryFn:        () => fetchData(),
      retryOnMount:   false,
      staleTime:      Infinity // Since this will be called allot we will cache this stuff
    })
}
