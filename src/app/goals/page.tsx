export default function GoalsPage() {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        {/* Título */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-semibold text-indigo-700">Rastreador de Metas</h1>
          <p className="text-xl text-gray-600">Gerencie suas metas e alcance seus objetivos com facilidade</p>
        </header>
  
        {/* Formulário para adicionar uma nova meta */}
        <section className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-medium text-gray-800 mb-4">Adicionar Meta</h2>
          <form className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Título da Meta"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              placeholder="Descrição da Meta"
              rows={4}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
            <button
              type="submit"
              className="bg-indigo-700 text-white py-2 rounded-lg hover:bg-indigo-800 transition-colors duration-300"
            >
              Adicionar Meta
            </button>
          </form>
        </section>
  
        {/* Lista de metas */}
        <section>
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Minhas Metas</h2>
          <div className="space-y-4">
            {/* Meta 1 */}
            <div className="flex justify-between bg-white p-4 rounded-lg shadow-md">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700">Meta 1</h3>
                <p className="text-gray-600">Descrição da meta 1.</p>
              </div>
              <button className="text-red-600 hover:text-red-800">Excluir</button>
            </div>
            {/* Meta 2 */}
            <div className="flex justify-between bg-white p-4 rounded-lg shadow-md">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700">Meta 2</h3>
                <p className="text-gray-600">Descrição da meta 2.</p>
              </div>
              <button className="text-red-600 hover:text-red-800">Excluir</button>
            </div>
          </div>
        </section>
      </div>
    );
  }
  