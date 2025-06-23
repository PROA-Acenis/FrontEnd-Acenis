import basicPlanImg from '../../assets/imgs/imgs-planos/img_basicPlan.jpg'
import mediumPlanImg from '../../assets/imgs/imgs-planos/img_mediumPlan.jpg'
import plusPlanImg from '../../assets/imgs/imgs-planos/img_plusPlan.jpg'
import { Link } from 'react-router-dom';

function PlanosPage() {
  return(
    <div className="w-full h-full overflow-hidden bg-gradient-to-b from-orange-100 to-orange-200">
      
      <div className="container mx-auto px-4 py-12">
        
        <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold text-center text-yellow-500 mb-16">
          Planos para Profissionais
        </h1>

        <div className="flex flex-col xl:flex-row justify-center items-center xl:items-stretch gap-8 max-w-7xl mx-auto">
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 w-full max-w-md xl:w-120 flex-shrink-0">
            <div className="p-6 h-full flex flex-col justify-between">
              <div className="w-full h-40 rounded-xl mb-6 overflow-hidden">
                <img 
                  src={basicPlanImg}
                  alt="Profissional de saúde - Plano Básico"
                  className="w-full h-full rounded-lg object-contain hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              <h2 className="text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-4">Básico</h2>
              
              <div className="text-center mb-6">
                <span className="text-4xl lg:text-[42px] font-bold text-red-400">GRATIS</span>
                <p className="text-gray-600 text-sm mt-1">(Perfil limitado)</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="w-2 h-2 mr-3">✓</span>
                  <span className="text-gray-700 lg:text-[18px]">Perfil básico no diretório</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mr-3">✓</span>
                  <span className="text-gray-700 lg:text-[18px]">Visibilidade limitada</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mr-3">✓</span>
                  <span className="text-gray-700 lg:text-[18px]">Sem acesso à dashboard</span>
                </li>
              </ul>
              
              <button className="w-full bg-red-300 hover:bg-red-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300">
                Criar perfil
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 border-2 border-yellow-500 relative w-full max-w-md xl:w-120 flex-shrink-0">
            
            <div className="bg-yellow-500 text-center py-2">
              <span className="text-white lg:text-2xl font-semibold">Mais popular</span>
            </div>
            
            <div className="p-6">
              <div className="w-full h-40 rounded-xl mb-6 overflow-hidden">
                <img 
                  src={mediumPlanImg}
                  alt="Profissional de saúde - Plano Intermediário"
                  className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              <h2 className="text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-4">Profissional</h2>
              
              <div className="text-center mb-6">
                <span className="text-sm text-gray-600">R$</span>
                <span className="text-4xl font-bold lg:text-[42px] text-yellow-500">89,90</span>
                <span className="text-gray-600">/mês</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="w-2 h-2 mr-3">✓</span>
                  <span className="text-gray-700 lg:text-[18px]">Perfil destacado no diretório</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mr-3">✓</span>
                  <span className="text-gray-700 lg:text-[18px]">Visibilidade 3x maior</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mr-3">✓</span>
                  <span className="text-gray-700 lg:text-[18px]">Acesso básico à dashboard</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mr-3">✓</span>
                  <span className="text-gray-700 lg:text-[18px]">Até 5 avaliações de clientes</span>
                </li>
              </ul>
              
              <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 lg:mt-[26px]">
                Assinar plano
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 w-full max-w-md xl:w-120 flex-shrink-0">
            <div className="p-6">
              <div className="w-full h-40 rounded-xl mb-6 overflow-hidden">
                <img 
                  src={plusPlanImg} 
                  alt="Profissional de saúde - Plano Premium"
                  className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              <h2 className="text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-4">Premium</h2>
              
              <div className="text-center mb-6">
                <span className="text-sm text-gray-600">R$</span>
                <span className="text-4xl lg:text-[42px] font-bold text-green-500">149,90</span>
                <span className="text-gray-600">/mês</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="w-2 h-2 mr-3">✓</span>
                  <span className="text-gray-700 lg:text-[18px]">Perfil em destaque na homepage</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mr-3">✓</span>
                  <span className="text-gray-700 lg:text-[18px]">Visibilidade 10x maior</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mr-3">✓</span>
                  <span className="text-gray-700 lg:text-[18px]">Dashboard completa</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mr-3">✓</span>
                  <span className="text-gray-700 lg:text-[18px]">Avaliações ilimitadas</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mr-3">✓</span>
                  <span className="text-gray-700 lg:text-[18px]">Estatísticas detalhadas</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mr-3">✓</span>
                  <span className="text-gray-700 lg:text-[18px]">Suporte prioritário</span>
                </li>
              </ul>
              
              <button className="w-full bg-green-400 hover:bg-green-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300">
                Assinar plano
              </button>
              
            </div>
          </div>
        </div>
      </div>
      <button className="absolute top-0 left-0 w-1/7 p-4 text-3xl">
        <Link to='/HomePage'><i className="bi bi-arrow-left"></i></Link>
      </button>
    </div>
  )
}

export default PlanosPage