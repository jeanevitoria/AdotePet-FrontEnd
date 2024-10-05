import React from 'react';
import { Grid2 } from '@mui/material';
import Box from '@mui/material/Box';
import logo from '../../assets/logo.png';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = ({ siderDisabled }) => {
    const navigate = useNavigate();
    const currentUrl = window.location.pathname;

    const onClick = () => {
        siderDisabled(prev => !prev)
    }

    const Items = [
        <Button variant="outlined" sx={{
            minWidth: 'auto', whiteSpace: 'nowrap', color: "#ffffff", borderColor: "#ffffff",
            fontWeight: '600', fontFamily: 'Kumbh Sans', height: '70%', fontSize: { xs: '10px', md: '14px' },
        }} onClick={() => navigate('/cadastro')}>Login</Button>,
        <Button variant="contained" sx={{
            whiteSpace:  { xs:'wrap', md: 'nowrap' }, backgroundColor: "#ffffff", color: "#170D1F", fontWeight: '600',
            fontFamily: 'Kumbh Sans', height: '70%', fontSize: { xs: '10px', md: '14px' },
            ":hover": {
                backgroundColor: "#170D1F",
                color: "#ffffff",
                border: '1px solid #0d99ff',
            },
        }} onClick={() => navigate('/login')}>Cadastre-se</Button>,
    ]
    return (
        <Grid2>
            <Box sx={{
                height: '50px',
                backgroundColor: '#170D1F',
                display: 'flex',
                alignItems: 'center',
                position: 'relative'
            }}>
                {(currentUrl != '/') && <Box sx={{
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
                <Box sx={{
                    position: 'absolute',
                    left: {xs:'0%', md:'50%'},
                    transform: {md:'translateX(-50%)'},
                    height: '100px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <img src={logo} alt="Logo do AdotePet"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain'
                        }} />
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    paddingX: '10px',
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
                </Box>
            </Box>
        </Grid2>
    );
}

export default Header;
