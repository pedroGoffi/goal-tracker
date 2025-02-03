"use client";

import React, { useState, useReducer, useEffect } from 'react';
import { 
  Building2, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  AlertCircle,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  Calendar,
  Globe,
  DollarSign,
  TrendingUp,
  Briefcase
} from 'lucide-react';

import axios from 'axios'
import { CreationState_t } from '@/app/api/company/register/route';
import { redirect, useRouter } from 'next/navigation';


const formReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'UPDATE_FIELD':
        return {
          ...state,
          [action.section]: {
            ...state[action.section],
            [action.field]: action.value
          }
        };
      case 'RESET_FORM':
        return action.initialState;
      default:
        return state;
    }
};



export default function CompanyRegisterView(){
  const router = useRouter();
  const initialState: CreationState_t = {
      basicInfo: {
        nomeEmpresa: '',
        nomeFantasia: '',
        cnpj: '',
        tipoEmpresa: '',
      },
      contactInfo: {
        email: '',
        telefone: '',
        site: '',
        cep: '',
        endereco: '',
        cidade: '',
        estado: '',
      },
      financialInfo: {
        capitalSocial: '',
        faturamentoAnual: '',
        setorAtividade: '',
        dataFundacao: '',
      }
    };

  // const router = useRouter()
  const [formResponse, setFormResponse] = useState<any>(null)
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<any>({});  
  const steps = [
    {
      title: 'Informações da Empresa',
      icon: <Building2 className="mr-2 text-blue-600" />,
      fields: [
        { 
          name: 'nomeEmpresa', 
          label: 'Nome Empresarial', 
          type: 'text', 
          icon: <CreditCard />
        },
        { 
          name: 'nomeFantasia', 
          label: 'Nome Fantasia', 
          type: 'text', 
          icon: <Building2 />
        },
        { 
          name: 'cnpj', 
          label: 'CNPJ', 
          type: 'text', 
          mask: '00.000.000/0001-00',
          icon: <CreditCard />
        },
        { 
          name: 'tipoEmpresa', 
          label: 'Tipo de Empresa', 
          type: 'select',
          options: [
            { value: 'mei', label: 'MEI' },
            { value: 'me', label: 'Microempresa' },
            { value: 'ltda', label: 'Sociedade Limitada' },
            { value: 'sa', label: 'Sociedade Anônima' }
          ],
          icon: <Building2 />
        }
      ]
    },
    {
      title: 'Contato e Localização',
      icon: <MapPin className="mr-2 text-green-600" />,
      fields: [
        { 
          name: 'email', 
          label: 'E-mail', 
          type: 'email', 
          icon: <Mail />
        },
        { 
          name: 'telefone', 
          label: 'Telefone', 
          type: 'tel', 
          mask: '(00) 00000-0000',
          icon: <Phone />
        },
        { 
          name: 'site', 
          label: 'Site (opcional)', 
          type: 'text',
          icon: <Globe />
        },
        { 
          name: 'cep', 
          label: 'CEP', 
          type: 'text', 
          mask: '00000-000',
          icon: <MapPin />
        }
      ]
    },
    {
      title: 'Informações Financeiras',
      icon: <CreditCard className="mr-2 text-purple-600" />,
      fields: [
        { 
          name: 'capitalSocial', 
          label: 'Capital Social', 
          type: 'number', 
          icon: <DollarSign />
        },
        { 
          name: 'faturamentoAnual', 
          label: 'Faturamento Anual', 
          type: 'number', 
          icon: <TrendingUp />
        },
        { 
          name: 'setorAtividade', 
          label: 'Setor de Atividade', 
          type: 'select',
          options: [
            { value: 'comercio', label: 'Comércio' },
            { value: 'servicos', label: 'Serviços' },
            { value: 'industria', label: 'Indústria' },
            { value: 'tecnologia', label: 'Tecnologia' }
          ],
          icon: <Briefcase />
        },
        { 
          name: 'dataFundacao', 
          label: 'Data de Fundação', 
          type: 'date', 
          icon: <Calendar />
        }
      ]
    }
  ];
  const handleChange = (section: any, field: any) => (e: any) => {      
    dispatch({
      type: 'UPDATE_FIELD',
      section,
      field,
      value: e.target.value
    });
  };
  
  const validateStep = () => {
      const currentStepFields = steps[currentStep].fields;
        const currentSection = Object.keys(state)[currentStep];
        const newErrors: any = {};

        currentStepFields.forEach(field => {
            const value = state[currentSection][field.name];
            if (!value && field.name !== 'site') {                
                newErrors[field.name] = 'Campo obrigatório';
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
      if (validateStep()) {
        setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
      }
    };

       const prevStep = () => {
      setCurrentStep(prev => Math.max(prev - 1, 0));
    };

       // Adicionei a implementação de handleSubmit
    const handleSubmit = async (e: any) => {
      e.preventDefault();

      // Validar todos os campos antes de submeter
      const allErrors: any = {};
      steps.forEach((_, index) => {
        const currentStepFields = steps[index].fields;
        const currentSection = Object.keys(state)[index];

        currentStepFields.forEach(field => {
          const value = state[currentSection][field.name];
          if (!value && field.name !== 'site') {
            allErrors[field.name] = 'Campo obrigatório';
          }
        });
      });
      
      // Se houver erros, atualiza o estado de erros
      if (Object.keys(allErrors).length > 0) {
        setErrors(allErrors);
        return;
      }

      // Processamento final do formulário      
      const response: any = await axios.post('/api/company/register', state)
      if(response.data){
        setFormResponse(response.data)
      }      
    };
    console.log(state)
    
    useEffect(() => {
      if (formResponse) {
        console.log(formResponse); // Log response to see the returned data
        const companySlug = formResponse.companySlug;
        redirect(`/my-company/${companySlug}`);
      }
    }, [router, formResponse]);
    
        

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-xl bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white flex items-center">
            {steps[currentStep].icon}
            <h2 className="text-2xl font-bold">{steps[currentStep].title}</h2>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit}>
              {steps[currentStep].fields.map((field: any) => (
                <div key={field.name} className="mb-4">
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    {field.icon && React.cloneElement(field.icon, { className: 'mr-2 text-gray-500' })}
                    {field.label}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      value={state[Object.keys(state)[currentStep]][field.name]}
                      onChange={handleChange(Object.keys(state)[currentStep], field.name)}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300"
                    >
                      <option value="">Selecione</option>
                      {field.options.map((option: any) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      value={state[Object.keys(state)[currentStep]][field.name]}
                      onChange={handleChange(Object.keys(state)[currentStep], field.name)}
                      className={`w-full p-3 border rounded-lg focus:ring-2 ${
                        errors[field.name] ? 'border-red-500 focus:ring-red-300' : 'focus:ring-blue-300'
                      }`}
                    />
                  )}
                  {errors[field.name] && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="mr-2" size={16} /> {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}

                <div className="flex justify-between mt-6">
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                  >
                    <ChevronLeft className="mr-2" /> Anterior
                  </button>
                )}

                {currentStep < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="ml-auto flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Próximo <ChevronRight className="ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="ml-auto flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    <CheckCircle2 className="mr-2" /> Finalizar Registro
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};  