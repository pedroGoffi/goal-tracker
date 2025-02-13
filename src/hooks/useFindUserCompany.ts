import { Company } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useFindUserCompany = (userId: string | null) => {
    const fetchUserCompany = async () => {
        if(!userId) return null
        const response = await axios.post(`/api/company/find/userId/${userId}`)
        return response.data.company // Retorna diretamente os dados da empresa
    }
    return useQuery<Company>({
        queryKey:   ['find-user-company', userId],
        queryFn:    () => fetchUserCompany(),
        staleTime:  Infinity
    })
}