import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomeIntroducao from '../src/pages/Home-introducao/HomeIntroducao';
import CadastroEscolhas from '../src/pages/Cadastro-escolha/CadastroEscolha';
import CadastroProfissionais from '../src/pages/Cadastro-profissional/CadastroProfissional';
import CadastroMae from '../src/pages/Cadastro-mae/CadastroMae';
import CadastroFornecedores from '../src/pages/Cadastro-fornecedores/CadastroFornecedores';
import Carrinho from '../src/pages/carrinho/carrinho';
import Cuidadores from '../src/pages/cuidadores/HomeSaude';
import Dados from '../src/pages/dados/dados';
import Educadores from '../src/pages/Educadores/HomeEducacao';
import HomePage from '../src/pages/Home-page/HomePage';
import HomeLoja from '../src/pages/homeloja/loja';
import Instituicoes from '../src/pages/Instituicoes/Instituicoes';
import Jogos from '../src/pages/Jogos/Jogos';
import Login from '../src/pages/Login/Login';
import Planos from '../src/pages/planos/planos';
import Produtos from '../src/pages/produto/produto';
import LayoutHeader from '../src/layout/LayoutHeader';
import LayoutChat from '../src/layout/LayoutChatbot';
import DashboardPage from '../src/pages/Dashboard/Dashboard';
import RedeSocial from '../src/pages/Rede-Social/SocialAppLayout';
import LayoutHeaderPublica from './layout/LayoutHeaderPublica';
import HomeFornecedores from '../src/pages/Home-fornecedores/HomeFornecedores';
import HomeProfissional from '../src/pages/Home-Profissional/HomeProfissional';
import DashboardFornecedores from '../src/pages/Dashboard-Fornecedores/DashFornecedor'
import ProfilePage from '../src/pages/ProfilePerfil/ProfilePage'
import Memozoo from './pages/Memozoo/Memozoo';
import Magikids from './pages/Magikids/Magikids'
import QuemSouEu from './pages/QuemSouEu/QuemSouEu'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutHeaderPublica />}>
            <Route path="/" element={<HomeIntroducao />} />
            <Route path="/CadastroEscolhas" element={<CadastroEscolhas />} />
            <Route path="/CadastroProfissionais" element={<CadastroProfissionais />} />
            <Route path="/CadastroMae" element={<CadastroMae />} />
            <Route path="/CadastroFornecedores" element={<CadastroFornecedores />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/HomeProfissional" element={<HomeProfissional />} />
            <Route path="/HomeFornecedores" element={<HomeFornecedores />} />
          </Route>

          <Route element={<LayoutHeader />}>
            <Route element={<LayoutChat />}>
              <Route path="/HomePage" element={<HomePage />} />
              <Route path="/Instituicoes" element={<Instituicoes />} />
              <Route path="/Cuidadores" element={<Cuidadores />} />
              <Route path="/Educadores" element={<Educadores />} />
              <Route path="/HomeLoja" element={<HomeLoja />} />
              <Route path="/Jogos" element={<Jogos />} />
            </Route>
          </Route>


          <Route path="/DashboardFornecedores" element={<DashboardFornecedores />} />
          <Route path="/RedeSocial" element={<RedeSocial />} />
          <Route path="/DashboardPage" element={<DashboardPage />} />
          <Route path="/Carrinho" element={<Carrinho />} />
          <Route path="/Dados" element={<Dados />} />
          <Route path="/Planos" element={<Planos />} />
          <Route path="/Produtos" element={<Produtos />} />
          <Route path='/Perfil' element={<ProfilePage/>}/>
          <Route path='/Memozoo' element={<Memozoo/>}/>
          <Route path='/Magikids' element={<Magikids/>}/>
          <Route path='/QuemSouEu' element={<QuemSouEu/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
