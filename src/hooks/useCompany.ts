import { Company } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Função para buscar os dados da empresa com base no `slug`
const fetchCompanyData = async (slug: string) => {
  const response = await axios.post(`/api/company/find/uuid/${slug}`)
  return response.data.company // Retorna diretamente os dados da empresa
}

// Hook customizado para usar os dados da empresa
export function useCompany(slug: string) {
  return useQuery<Company>({
    queryKey:       ['company', slug],
    queryFn:        () => fetchCompanyData(slug),
    retryOnMount:   false,
    staleTime:      Infinity // Since this will be called allot we will cache this stuff
  })
}
