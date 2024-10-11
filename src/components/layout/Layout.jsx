// src/components/layout/Layout.jsx
import React, { useState } from 'react';
import Header from './Header';
import Sider from './Sider';
import { Box, Grid2 } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Layout = ({children}) => {
    const [siderDisabled, setSiderDisabled] = useState(true);
    const location = useLocation();

    // Definir rotas que não devem exibir o Sider
    const hideRoutes = ['/auth/cadastro', '/', '/auth/login', '/auth/recuperar-senha', '/auth/redefinir-senha'];

    // Verifica se a rota atual está na lista de rotas que escondem o Sider
    const shouldShowSider = !hideRoutes.includes(location.pathname);

    // Esconde a header na página de login
    const shouldShowHeader = location.pathname != '/auth/login';
    
    return (
        <Grid2 container spacing={0} sx={{ margin: 0, padding: 0 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                {shouldShowHeader && <Header siderDisabled={setSiderDisabled} />}
                <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                    {shouldShowSider && <Sider disabled={siderDisabled} />}
                    <Box sx={{ display: { xs: siderDisabled ? 'flex' : 'none', md: 'flex' } }}>
                        {children}
                    </Box>
                </Box>
            </Box>
        </Grid2>
    );
};

export default Layout;
