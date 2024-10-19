import React from 'react';
import { Grid2, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import logoAdote from '../../assets/logoAdote.png';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = ({ siderDisabled, buttons }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Definir rotas que não devem exibir o Sider
    const hideSiderRoutes = ['/', '/auth/login', '/auth/cadastro', '/auth/recuperar-senha', '/auth/redefinir-senha'];

    // Verifica se a rota atual está na lista de rotas que escondem o Sider
    const shouldShowSider = !hideSiderRoutes.includes(location.pathname);

    const onClick = () => {
        siderDisabled(prev => !prev)
    }

    const Items = [
        <Button variant="outlined" sx={{
            minWidth: 'auto', whiteSpace: 'nowrap', color: "#ffffff", borderColor: "#ffffff",
            fontWeight: '600', height: '70%', fontSize: { xs: '8px', md: '12px' }, fontFamily: 'Kumbh Sans, Roboto, sans-serif'
        }} onClick={() => navigate('/auth/login')}>Login</Button>,
        <Button variant="contained" sx={{
            whiteSpace: { xs: 'wrap', md: 'nowrap' }, backgroundColor: "#ffffff", color: "#170D1F", fontWeight: '600'
            , height: '70%', fontSize: { xs: '8px', md: '12px' },
            ":hover": {
                backgroundColor: "#170D1F",
                color: "#ffffff",
                border: '1px solid #0d99ff',
            }, fontFamily: 'Kumbh Sans, Roboto, sans-serif'
        }} onClick={() => navigate('/auth/cadastro')}>Cadastre-se</Button>,
    ]

    return (
        <Grid2 container sx={{
            width: '100vw',

        }}>

            <Box sx={{
                height: '50px',
                width: '100%',
                backgroundColor: '#170D1F',
                display: 'flex',
                alignItems: 'center',
                zIndex:'1000'
            }}>
                {shouldShowSider && <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    paddingX: '10px', flexGrow: 1,
                    position: 'relative'
                }}>
                    {siderDisabled ?
                        <MenuIcon style={{ color: '#ffffff' }} onClick={onClick} />
                        :
                        <MenuOpenIcon style={{ color: '#ffffff' }} onClick={onClick} />}
                </Box>}
                <Box
                    sx={{
                        position: 'absolute',
                        left: { xs: location.pathname == '/' ? '0%' : '50%', md: '50%' },
                        transform: { xs: location.pathname == '/' ? 'translateX(0%)' : 'translateX(-50%)', md: 'translateX(-50%)' },
                        height: '100px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <img src={logoAdote} alt="Logo do AdotePet"
                        style={{
                            maxWidth: '25%',
                            maxHeight: '100%',
                            objectFit: 'contain'
                        }} />
                    <Typography sx={{ color: '#ffffff', fontWeight: '300', display: 'inline', fontFamily: 'Kumbh Sans, Roboto, sans-serif', fontSize: { xs: '14px' } }}>ADOTE</Typography>
                    <Typography sx={{ color: '#ffffff', fontWeight: '300', display: 'inline', fontFamily: 'Kumbh Sans, Roboto, sans-serif', fontSize: { xs: '14px' } }}>PET</Typography>
                </Box>
                {location.pathname == '/' && <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    paddingRight: {xs:'10px', md:'20px'},
                    flexGrow: 1,
                    position: 'relative'
                }}>
                    {Items.map((item, index) => {
                        return (
                            <Box key={index} sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                paddingRight: '5px',
                                alignItems: 'center'
                            }}>
                                {item}
                            </Box>
                        );
                    })}
                </Box>}
            </Box>
        </Grid2>
    );
}

export default Header;
