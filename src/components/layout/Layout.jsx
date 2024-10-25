import React, { useState } from 'react';
import Header from './Header';
import Sider from './Sider';
import { Box, Grid2 } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
    const [siderDisabled, setSiderDisabled] = useState(true);
    const location = useLocation();

    // Definir rotas que não devem exibir o Sider
    const hideRoutes = ['/auth/cadastro', '/', '/auth/login', '/auth/recuperar-senha', '/auth/redefinir-senha'];

    // Verifica se a rota atual está na lista de rotas que escondem o Sider
    const shouldShowSider = !hideRoutes.includes(location.pathname);

    // Esconde a header na página de login
    const shouldShowHeader = location.pathname !== '/auth/login';

    return (
        <Grid2 container spacing={0} sx={{ margin: 0, padding: 0, width: '100%', overflow: 'hidden' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                {shouldShowHeader &&
                    <Box sx={{ display: 'flex', width: '100%', position: 'fixed', zIndex: '1000' }}>
                        <Header siderDisabled={setSiderDisabled} />
                    </Box>
                }
                <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: shouldShowHeader ? '50px' : '0px' }}>
                    {shouldShowSider &&
                        (<>
                            <Box sx={{ display: { xs: siderDisabled ? 'none' : 'flex', md: 'flex' }, width: siderDisabled ? '50px' : '200px' }}>
                                <Sider disabled={siderDisabled} />
                            </Box>
                            <Box sx={{ display: { xs: siderDisabled ? 'flex' : 'none', md: 'flex' }, height: shouldShowHeader ? 'calc(100vh - 50px)': '100vh', width: siderDisabled ? 'calc(100vw - 50px)' : 'calc(100vw - 200px)' }}>
                                {children}
                            </Box>
                        </>)
                    }
                    {!shouldShowSider &&
                        (<Box sx={{ width: '100%' }}>
                            {children}
                        </Box>)
                    }
                </Box>
            </Box>
        </Grid2>
    );
};

export default Layout;
