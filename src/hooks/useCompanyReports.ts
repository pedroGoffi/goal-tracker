// constants/reports.ts

import { Report } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const reports: Report[] = [
    {
      id: '1',
      title: 'Relatório Financeiro Trimestral',
      description: 'Este relatório contém os dados financeiros do primeiro trimestre de 2025, com análises de receita e lucros.',
      status: 'PENDING',  // Usando o valor correspondente ao enum ReportStatus
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-03-31'),
      companyId: 'company-1',
      metrics: {
        receita: 50000,
        lucro: 12000,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      title: 'Relatório de Desempenho Operacional',
      description: 'Relatório mensal com os indicadores de desempenho operacional das unidades de produção da empresa.',
      status: 'IN_PROGRESS',  // Usando o valor correspondente ao enum ReportStatus
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-01-31'),
      companyId: 'company-1',
      metrics: {
        unidadesProduzidas: 10000,
        custoOperacional: 3000,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      title: 'Relatório de Vendas de Dezembro',
      description: 'Relatório com a performance de vendas da empresa no mês de dezembro, comparando com o ano anterior.',
      status: 'COMPLETED',  // Usando o valor correspondente ao enum ReportStatus
      startDate: new Date('2024-12-01'),
      endDate: new Date('2024-12-31'),
      companyId: 'company-2',
      metrics: {
        totalVendas: 200000,
        comparacaoAnoAnterior: 10,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4',
      title: 'Relatório de Satisfação do Cliente',
      description: 'Análise da satisfação do cliente com os serviços prestados, com base em pesquisas realizadas no último mês.',
      status: 'COMPLETED',  // Usando o valor correspondente ao enum ReportStatus
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-01-31'),
      companyId: 'company-3',
      metrics: {
        satisfacaoMedia: 85,
        reclamacoes: 15,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '5',
      title: 'Relatório de Sustentabilidade Ambiental',
      description: 'Relatório trimestral sobre as ações e resultados das iniciativas de sustentabilidade ambiental da empresa.',
      status: 'PENDING',  // Usando o valor correspondente ao enum ReportStatus
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-03-31'),
      companyId: 'company-2',
      metrics: {
        reducaoCO2: 5000, // em kg
        economiasEnergia: 12000, // em kWh
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '6',
      title: 'Relatório de Inovação Tecnológica',
      description: 'Relatório anual sobre as inovações tecnológicas implementadas pela empresa e os resultados alcançados.',
      status: 'IN_PROGRESS',  // Usando o valor correspondente ao enum ReportStatus
      startDate: new Date('2024-12-01'),
      endDate: new Date('2024-12-31'),
      companyId: 'company-3',
      metrics: {
        novosProdutosLançados: 3,
        investimentosTecnologia: 150000,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  
  
  
export interface DateRange {
    startDate:  string;
    endDate:    string
}
const fetchReports = async (slug: string, dateRange: DateRange, status: string) => {
    return reports;
    // Fazendo a requisição para a API para buscar os relatórios
    const res = await axios.post(`/api/company/${slug}/reports/${status}`, { dateRange })        
    console.log("FETCH REPORTS = ")
    console.log(res.data)
    if (!res.data) {
      throw new Error('Erro ao carregar relatórios');
    }
    throw new Error('Erro ao carregoihfsadhupisfdaihupsdfhpuidsfhpohiofds\óhifsdar relatórios');
    
    //return res.json();
  };
  
export const useCompanyReports = (slug: string, dateRange: DateRange, status: string) => {
    return useQuery<Report[]>({
        queryKey:   ['reports', slug, dateRange, status],
        queryFn:    () => fetchReports(slug, dateRange, status),
        staleTime:  Infinity,        
    });
};