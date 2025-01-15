import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignUp from './src/pages/auth/SignUp.jsx';
import Login from './src/pages/auth/Login.jsx';
import PasswordRecovery from './src/pages/auth/PasswordRecovery.jsx';
import PasswordReset from './src/pages/auth/PasswordReset.jsx';
import LandingPage from './src/pages/dashboard/LandingPage.jsx';
import Header from './src/components/layout/Header.jsx';
import Sider from './src/components/layout/Sider.jsx';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Layout from './src/components/layout/Layout.jsx';
import Chat from './src/pages/user/Chat.jsx';
import CadastrarAnimal from './src/pages/user/CadastrarAnimal.jsx';
import Home from './src/pages/user/Home.jsx';
import Perfil from './src/pages/user/Perfil.jsx';
import AnimalDetails from './src/pages/user/AnimalDetails.jsx';

function AppRoutes() {

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/cadastro' element={<SignUp />} />
          <Route path='/auth/recuperar-senha' element={<PasswordRecovery />} />
          <Route path='/auth/redefinir-senha:token' element={<PasswordReset />} />
          <Route path='/cadastrar-animal' element={<CadastrarAnimal />} />
          <Route path='/animal/:id' element={<AnimalDetails/>} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/home' element={<Home />} />
          <Route path='/perfil' element={<Perfil />} />
        </Routes>
      </Layout>
    </Router >
  )
}
export default AppRoutes;