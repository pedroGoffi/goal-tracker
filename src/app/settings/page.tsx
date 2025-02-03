"use client"


import { useSession } from "next-auth/react"
import useUser from "@/hooks/useUser"
import { Company, Department, Permission, User } from "@prisma/client"


type FullUser = User & {
  company?:     Company | null
  department?:  Department | null
  permissions:  Permission[]
}

export default function PaginaConfiguracoesUsuario() {
    const session = useSession()
    const user = useUser(session?.data) as any as FullUser  

    if (!user) {
      return <div className="min-h-screen bg-gray-900 text-red-500 p-8">Usuário não encontrado</div>
    }    

    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
        <div>
          UNIMPLEMENTED
          
        </div>
        
      </div>
    )
}