import { CompanyDatabaseHandler } from "@/lib/prisma/CompanyService";
import { Company } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export interface CreationState_t {
  basicInfo: {
    nomeEmpresa:  string;
    nomeFantasia: string;
    cnpj:         string;
    tipoEmpresa:  string;
  },

  contactInfo: {
    email:      string;
    telefone:   string;
    site:       string;
    cep:        string;
    endereco:   string;
    cidade:     string;
    estado:     string;
  },

  financialInfo: {
    capitalSocial: string;
    faturamentoAnual: string;
    setorAtividade: string;
    dataFundacao: string;
  }
}

export async function POST(req: NextRequest) {
  const { basicInfo, contactInfo, financialInfo }: CreationState_t = await req.json(); // Get request body as JSON
  console.log("SERV RECV STATE = ")
  console.log(basicInfo, contactInfo, financialInfo)
  try {
    const company = {      
      nomeEmpresa:         basicInfo.nomeEmpresa,       
      nomeFantasia:        basicInfo.nomeFantasia,         
      cnpj:                basicInfo.cnpj, 
      tipoEmpresa:         basicInfo.tipoEmpresa,       
      capitalSocial:       financialInfo.capitalSocial,
      faturamentoAnual:    financialInfo.faturamentoAnual,             
      setorAtividade:      financialInfo.setorAtividade,           
      foundationDate:      new Date(financialInfo.dataFundacao),                  
    }    
    const newCompany = await CompanyDatabaseHandler.createCompany(company as Company);
    
    return NextResponse.json({ 
      message:      "Company created successfully",
      companySlug:  newCompany.id
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating company:', error);
    return NextResponse.json({ error: 'Failed to create company' }, { status: 500 });
  }
}
