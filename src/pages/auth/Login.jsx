import React from 'react';
import { Box, Container, Grid2, Button, Divider, Typography, Paper } from '@mui/material';
import logo from '../../assets/logo.png';
import imgLogin2 from '../../assets/imgLogin2.png';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import TextField from '@mui/material/TextField';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import XIcon from '@mui/icons-material/X';
import { useNavigate } from 'react-router-dom';
import logoAdote from '../../assets/logoAdote.png';

const Login = () => {
    const navigate = useNavigate();

    const providers = [
        { id: 'github', name: 'GitHub' },
        { id: 'google', name: 'Google' },
        { id: 'facebook', name: 'Facebook' },
        { id: 'twitter', name: 'Twitter' },
        { id: 'linkedin', name: 'LinkedIn' },
    ];

    return (
        <Grid2 container sx={{
            height: '100vh',
            width: '100vw',
        }}>
            <Grid2 item xs={12} md={6} sx={{ height: '100vh', width: '40vw', background: '#7E579D', display: { xs: 'none', sm: 'flex' } }}>
                <Box sx={{
                    height: '95%',
                    width: '100%',
                    display: 'flex',
                    marginY: '5%',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    {/* Logo */}
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                        <img src={logo} style={{
                            maxWidth: '20%',
                            maxHeight: '100%',
                            objectFit: 'contain'
                        }} />
                    </Box>
                    <Box
                        sx={{
                            width: '55%',
                            height: '95%',
                            marginY: '5%',
                            borderTopLeftRadius: {
                                xs: '20px', // Para telas extra pequenas
                                sm: '30px', // Para telas pequenas
                                md: '30px', // Para telas médias
                                lg: '60px', // Para telas grandes
                                xl: '100px', // Para telas extra grandes
                            },
                            borderTopRightRadius: {
                                xs: '20px', // Para telas extra pequenas
                                sm: '30px', // Para telas pequenas
                                md: '30px', // Para telas médias
                                lg: '60px', // Para telas grandes
                                xl: '100px', // Para telas extra grandes
                            },
                            maxWidth: {
                                xs: '250px',  // Tamanhos menores para telas pequenas (celulares)
                                sm: '350px',  // Tamanhos intermediários (tablets)
                                md: '450px',  // Tamanhos médios (notebooks)
                                lg: '500px',  // Tamanhos grandes (desktops)
                                xl: '600px',  // Tamanhos extras (telas maiores que lg)
                            },
                            maxHeight: {
                                xs: '200px',  // Altura menor para celulares
                                sm: '300px',  // Altura para tablets
                                md: '350px',  // Altura para notebooks
                                lg: '600px',  // Altura para desktops
                                xl: '1000px',  // Altura extra para telas maiores que lg
                            },
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'flex-start', // Alinha ao topo
                            flexDirection: 'column',
                            background: 'linear-gradient(to bottom, #bfa9d4 55%, #7E579D 55%)',
                        }}
                    >
                        <Container sx={{ paddingTop: '0%', display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="body1" sx={{ fontSize: { md: '20px', lg: '30px', xl: '60px' }, fontWeight: '900', color: '#ffffff', fontFamily: 'Kumbh Sans, Roboto, sans-serif' }}>AMOR QUE</Typography>
                            <Typography variant="body1" sx={{ fontSize: { md: '20px', lg: '30px', xl: '60px' }, fontWeight: '900', color: '#301F3E', textAlign: 'center', fontFamily: 'Kumbh Sans, Roboto, sans-serif' }}>NÃO</Typography>
                            <Typography variant="body1" sx={{ fontSize: { md: '20px', lg: '30px', xl: '60px' }, fontWeight: '900', color: '#ffffff', textAlign: 'right', width: '100%', fontFamily: 'Kumbh Sans, Roboto, sans-serif' }}>TEM PREÇO</Typography>
                        </Container>
                        <Box
                            component="img"
                            src={imgLogin2}
                            sx={{
                                width: '100%',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain',
                                zIndex: 1, // Mantém a imagem acima do background
                            }}
                        />
                    </Box>
                </Box>
            </Grid2>

            <Grid2 item xs={12} md={6} sx={{ height: '100%', width: { xs: '100vw', md: '60vw' }, backgroundColor: { xs: '#dfd5ea', md: '#ffffff' } }}>
                <Box sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Box sx={{ margin: '2.5%', justifyContent: 'flex-start', display: 'flex', color: '#301F3E', cursor: 'pointer' }} onClick={() => navigate('/')}>
                        <ArrowBackIosNewIcon />
                    </Box>

                    <Paper elevation={3} sx={{ height: '100%', width: { xs: '90vw', md: '30vw' }, margin: '5% auto', padding: '0' }}>
                        {/* Logo */}
                        <Box sx={{
                            width: '100%',
                            display: {xs:'flex', md:'none'},
                            maxWidth: { xs: '20%', lg: '15%' },
                            marginX:'auto',
                            marginY:'5%',
                            justifyContent: 'center',
                        }}>
                            <img src={logoAdote} style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain'
                            }} />
                        </Box>
                        <Box sx={{ height: {xs:'10%', md:'25%'}, paddingTop:{xs:'0%', md:'7.5%'}, textAlign: 'center' }}>
                            <Typography variant="body1" sx={{
                                fontSize: { xs: '20px', md: '20px', lg: '30px', xl: '60px' },
                                textAlign: 'center',
                                fontWeight: '900',
                                color: '#301F3E',
                                height: '60%',
                                marginBottom:'2.5%',
                                width: '100%', 
                                fontFamily: 'Kumbh Sans, Roboto, sans-serif'
                            }}>
                                LOGIN
                            </Typography>
                            <Box sx={{
                                width: '100%', height: '40%', display:{sx:'none', md:'flex'}, justifyContent:'center'
                            }}>
                                <Typography variant="subtitle2" sx={{ display: 'inline-block', marginRight: '2px' }}>
                                    Não possui uma conta?
                                </Typography>
                                <Typography variant="subtitle2" sx={{ display: 'inline-block', color: '#13AAFF', cursor: 'pointer' }} onClick={() => navigate('/auth/cadastro')}>
                                    Cadastre-se aqui
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '40%', width: '100%', margin: 'auto' }}>
                            <TextField size='small' id="email" label="E-mail" required sx={{ width: '80%', marginBottom: '2%' }} />
                            <TextField size='small' id="senha" label="Senha" type="password" sx={{ width: '80%' }} />
                            <Typography variant="subtitle2" sx={{ display: 'inline-block', color: '#13AAFF', letterSpacing: -1, textAlign: 'end', width: '80%', cursor: 'pointer' }} onClick={() => navigate('/auth/recuperar-senha')}>Esqueceu sua senha?</Typography>
                        </Box>
                        <Button variant="contained" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '30px', width: '80%', margin: 'auto', backgroundColor: '#301F3E' }}>Entrar</Button>
                        <Divider sx={{ color: '#8e8e8e', marginY: '2%' }}>ou</Divider>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} >
                            <FacebookIcon sx={{ color: '#3C5A9A', border: '1px solid #cccac9', fontSize: 40, borderRadius: '10%' }} />
                            <GoogleIcon sx={{ color: '#EA4335', border: '1px solid #cccac9', marginX: '10%', fontSize: 40, borderRadius: '10%' }} />
                            <XIcon sx={{ border: '1px solid #cccac9', fontSize: 40, borderRadius: '10%' }} />
                        </Box>
                    </Paper>
                </Box>
            </Grid2>

        </Grid2>
    );
}

export default Login;
