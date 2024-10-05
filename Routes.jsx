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

function AppRoutes() {

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/cadastro' element={<SignUp />} />
          <Route path='/auth/recuperar-senha' element={<PasswordRecovery />} />
          <Route path='/auth/redefinir-senha' element={<PasswordReset />} />
        </Routes>
      </Layout>
    </Router >
  )
}
export default AppRoutes;