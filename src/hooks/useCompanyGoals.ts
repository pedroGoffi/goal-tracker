import { Goal, GoalFrequency, GoalType } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export function useCompanyGoals(slug: string, goalType: "ALL" | GoalType, goalFrequency: "ALL" | GoalFrequency){
    const fetchGoals = async (): Promise<Goal[] | null> => {
        const res = await axios.post(`/api/company/${slug}/goals/${goalType}/${goalFrequency}`)        
        if(res.data?.goals) return res.data?.goals as Goal[]
        return null
    }

    return useQuery<Goal[] | null>({
        queryKey: ['goals', slug, goalType, goalFrequency],
        queryFn:  () => fetchGoals(),
        staleTime: Infinity,
        retryOnMount:   false,

    })
}