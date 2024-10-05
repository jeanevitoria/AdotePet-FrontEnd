// src/components/layout/Layout.jsx
import React, { useState } from 'react';
import Header from './Header';
import Sider from './Sider';
import { Box, Grid2 } from '@mui/material';

const Layout = ({ children }) => {
    const [siderDisabled, setSiderDisabled] = useState(true);
    const currentUrl = window.location.pathname;
    
    return (
        <Grid2 container spacing={0} sx={{ margin: 0, padding: 0 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1  }}>
                <Header siderDisabled={setSiderDisabled} />
                <Box sx={{ display: 'flex', flexDirection: 'row', padding: '1px'}}>
                { (currentUrl != '/') && <Sider disabled={siderDisabled} />}
                    <Box sx={{ display: { xs: siderDisabled ? 'flex' : 'none', md: 'flex' }}}>
                        {children}
                    </Box>
                </Box>
            </Box>
        </Grid2>
    );
};

export default Layout;
