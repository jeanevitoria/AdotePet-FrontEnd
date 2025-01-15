import React, { useState } from 'react';
import Header from './Header';
import Sider from './Sider';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import useWindowSize from '../../hooks/useWindowSize';

const Layout = ({ children }) => {
    const { sm } = useWindowSize();
    const [siderDisabled, setSiderDisabled] = useState(true);
    const location = useLocation();
    const { loggedOut } = location.state || {}

    // Rotas que escondem o Sider ou Header
    const hideRoutes = ['/auth/cadastro', '/', '/auth/login', '/auth/recuperar-senha', '/auth/redefinir-senha'];
    const shouldShowSider = !(
        hideRoutes.includes(location.pathname) ||
        location.pathname.startsWith('/auth/redefinir-senha/')
    );
    const shouldShowHeader = !(location.pathname === '/auth/login');

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh' }}>
            {/* Header */}
            {shouldShowHeader && (
                <Box sx={{ position: 'fixed', marginRight: siderDisabled ? '3vw' : '10vw', top: 0, left: 0, width: '100%', zIndex: 1000 }}>
                    <Header siderDisabled={setSiderDisabled} />
                </Box>
            )}

            {/* Conteúdo principal */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100vw',
                    height: '100%',
                    marginTop: shouldShowHeader ? '50px' : '0px',
                }}
            >
                {/* Sider */}
                {shouldShowSider && !loggedOut && (
                    <Box
                        sx={{
                            display: { xs: siderDisabled ? 'none' : 'block', sm: 'block' },
                            width: siderDisabled ? '50px' : '200px',
                            transition: 'width 0.3s ease',
                        }}
                    >
                        <Sider disabled={siderDisabled} setDisabled={setSiderDisabled} />
                    </Box>
                )}

                <Box
                    sx={{
                        flex: 1,
                        height: shouldShowHeader ? 'calc(100vh - 50px)' : '100vh',
                        overflowY: 'auto',
                        width: shouldShowSider
                            ? siderDisabled
                                ? sm
                                    ? 'calc(100vw - 50px)'
                                    : 'calc(100vw - 50px)'
                                : 'calc(100vw - 200px)'
                            : '100vw',
                        margin: 'auto',
                        opacity: { xs: !siderDisabled ? 0.5 : 1, sm: 1 },
                        transition: 'all 0.3s ease',
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;
