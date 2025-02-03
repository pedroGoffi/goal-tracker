export const BigLoadingSpinner = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
        {/* Spinner */}
        <div className="relative w-24 h-24">
          {/* Anel externo */}
          <div className="absolute w-full h-full border-4 border-gray-800 rounded-full"></div>
          {/* Spinner animado */}
          <div className="absolute w-full h-full border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        </div>
        {/* Texto */}
        <p className="mt-6 text-xl font-semibold text-gray-300">Carregando...</p>
        {/* Texto adicional (opcional) */}
        <p className="mt-2 text-sm text-gray-500">Por favor, aguarde um momento.</p>
      </div>
    );
};