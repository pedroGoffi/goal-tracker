import { useState, useEffect } from 'react'

// Função para pegar os dados em cache ou retornar null se não existir
export default function useCached<T>(key: string, fetchData: () => Promise<T>){
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cachedData = localStorage.getItem(key)
    if (cachedData) {
      // Se os dados estiverem em cache, use-os diretamente
      setData(JSON.parse(cachedData))
      setLoading(false)
    } else {
      // Caso contrário, faça a requisição e armazene no cache
      fetchData().then((fetchedData) => {
        setData(fetchedData)
        localStorage.setItem(key, JSON.stringify(fetchedData))
        setLoading(false)
      })
    }
  }, [key, fetchData])

  return { data, loading }
}