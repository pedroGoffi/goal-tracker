import { TextInput } from "@/components/TextInput";


export function CompanyRegistrationForm() {
    return (
        <form className="space-y-6">
          <TextInput
            id="nomeEmpresa"
            label="Nome da Empresa"
            placeholder="Digite o nome da sua empresa"
            required
          />
          <TextInput
            id="email"
            label="Endereço de E-mail"
            placeholder="Digite seu e-mail"
            type="email"
            required
          />
          <TextInput
            id="telefone"
            label="Número de Telefone"
            placeholder="Digite seu telefone"
            type="tel"
            required
          />
          <TextInput
            id="endereco"
            label="Endereço da Empresa"
            placeholder="Digite o endereço da sua empresa"
            required
          />
          <TextInput
            id="site"
            label="URL do Site"
            placeholder="Digite o site da sua empresa (opcional)"
            type="url"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition-colors duration-300"
          >
            Cadastrar Empresa
          </button>
        </form>
    );
}