import basicPlanImg from '../../assets/imgs/imgs-planos/img_basicPlan.jpg'
import mediumPlanImg from '../../assets/imgs/imgs-planos/img_mediumPlan.jpg'
import plusPlanImg from '../../assets/imgs/imgs-planos/img_plusPlan.jpg'

/* importando o tailwind
<script src="https://cdn.tailwindcss.com"></script>
*/

function PlanosPage() {
  return(
    <div className="w-full h-full overflow-hidden bg-gradient-to-b from-orange-100 to-orange-200">
      
      <div className="container mx-auto px-4 py-12">
        
        {/* Título principal */}
        <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold text-center text-yellow-500 mb-16">
          Planos e Preços
        </h1>

        {/* Cards de planos */}
        <div className="flex flex-col xl:flex-row justify-center items-center xl:items-stretch gap-8 max-w-7xl mx-auto">
          
          {/* Plano Básico */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 w-full max-w-md xl:w-120 flex-shrink-0">
            <div className="p-6 h-full flex flex-col justify-between">
              {/* Imagem do plano - SUBSTITUIR PELA SUA IMAGEM */}
              <div className="w-full h-40 rounded-xl mb-6 overflow-hidden">
                <img 
                  src={basicPlanImg}
                  alt="Duas meninas estudando - SUBSTITUIR ESTA IMAGEM"
                  className="w-full h-full rounded-lg object-contain hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              <h2 className="text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-4">Básico</h2>
              
              <div className="text-center mb-6">
                <span className="text-4xl lg:text-[42px] font-bold text-red-400">GRATIS</span>
              </div>
              
              {/* Lista de funcionalidades */}
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="w-2 h-2 mr-3 ">✓</span>
                  <span className="text-gray-700 lg:text-[18px]">Instituições especializadas.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mr-3 ">✓</span>
                  <span className="text-gray-700 lg:text-[18px]">Profissionais especializados.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mr-3 ">✓</span>
                  <span className="text-gray-700 lg:text-[18px]">Anúncios.</span>
                </li>
              </ul>
              
              <button className="w-full bg-red-300 hover:bg-red-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300">
                Assinar plano
              </button>
            </div>
          </div>
          
          {/* Plano Médio - Mais vendido */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 border-2 border-yellow-500 relative w-full max-w-md xl:w-120 flex-shrink-0">
            {/* Badge "Mais vendido" */}
            <div className="bg-yellow-500 text-center py-2">
              <span className="text-white lg:text-2xl font-semibold">Mais vendido</span>
            </div>
            
            <div className="p-6 ">
              {/* Imagem do plano - SUBSTITUIR PELA SUA IMAGEM */}
              <div className="w-full h-40 rounded-xl mb-6 overflow-hidden">
                <img 
                  src={mediumPlanImg}
                  alt="Criança sorrindo - SUBSTITUIR ESTA IMAGEM"
                  className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              <h2 className="text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-4">Médio</h2>
              
              <div className="text-center mb-6">
                <span className="text-sm text-gray-600">R$</span>
                <span className="text-4xl font-bold lg:text-[42px] text-yellow-500">16,90</span>
              </div>
              
              {/* Lista de funcionalidades */}
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                <span className="w-2 h-2 mr-3 ">✓</span>
                  <span className="text-gray-700 lg:text-[18px]">Instituições especializadas.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mr-3 ">✓</span>
                  <span className="text-gray-700 lg:text-[18px]">Atividades interativas.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mr-3 ">✓</span>
                  <span className="text-gray-700 lg:text-[18px]">Sem anúncios.</span>
                </li>
              </ul>
              
              <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 lg:mt-[26px]">
                Assinar plano
              </button>
            </div>
          </div>

          {/* Plano Premium */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 w-full max-w-md xl:w-120 flex-shrink-0">
            <div className="p-6">
              {/* Imagem do plano - SUBSTITUIR PELA SUA IMAGEM */}
              <div className="w-full h-40 rounded-xl mb-6 overflow-hidden">
                <img 
                  src={plusPlanImg} 
                  alt="Menino brincando - SUBSTITUIR ESTA IMAGEM"
                  className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              <h2 className="text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-4">Premium</h2>
              
              <div className="text-center mb-6">
                <span className="text-sm text-gray-600">R$</span>
                <span className="text-4xl lg:text-[42px] font-bold text-green-500">39,90</span>
              </div>
              
              {/* Lista de funcionalidades */}
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="w-2 h-2 mr-3 ">✓</span>
                  <span className="text-gray-700 lg:text-[18px]">Instituições especializadas.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mr-3 ">✓</span>
                  <span className="text-gray-700 lg:text-[18px]">Profissionais especializados.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mr-3 ">✓</span>
                  <span className="text-gray-700 lg:text-[18px]">Jogos.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mr-3 ">✓</span>
                  <span className="text-gray-700 lg:text-[18px]">Consultoria.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mr-3 ">✓</span>
                  <span className="text-gray-700 lg:text-[18px]">Sem anúncios.</span>
                </li>
              </ul>
              
              <button className="w-full bg-green-400 hover:bg-green-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300">
                Assinar plano
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlanosPage