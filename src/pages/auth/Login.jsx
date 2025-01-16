import React, { useEffect, useState } from 'react';
import { Box, Container, Grid2, Button, Divider, Typography, Paper } from '@mui/material';
import logoComNome from '../../assets/logoComNome.png';
import { ActionAlerts } from '../../components/Alert';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import TextField from '@mui/material/TextField';
import loginbackground from '../../assets/loginbackground.jpg'
import { useNavigate } from 'react-router-dom';
import logoAdote from '../../assets/logoAdote.png';
import { loginService } from '../../services/userService';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({ type: 'none', message: '' });

    const sendData = () => {
        if (!email || !password) {
            setAlert({ type: 'warning', message: 'Informe o e-mail e senha.' })
            setTimeout(() => { setAlert({ type: 'none', message: '' }) }, 3000)
            return;
        }
        const data = { email: email, senha: password }

        loginService(data)
            .then((result) => {
                localStorage.setItem('token', result.data.token)
                navigate('/home')
            })
            .catch((error) => {
                setAlert({ type: 'error', message: error.message });
                setTimeout(() => {
                    setAlert({ type: 'none', message: '' })
                }, 3000);
            })
    }

    return (
        <Grid2 container sx={{
            height: '100vh',
            width: '100vw',
            overflow: 'hidden'
        }}>
            <Grid2
                item
                xs={12}
                md={6}
                sx={{
                    height: 'auto',
                    overflow: 'hidden',
                    width: '40vw',
                    background: '#7E579D30',
                    display: { xs: 'none', sm: 'flex' },
                    position: 'relative', // Garante o contexto para o absolute
                }}
            >
                {/* Fundo */}
                <Box
                    component="img"
                    src={loginbackground}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover', // Garante que o fundo cobre todo o espaço
                        position: 'absolute',
                        zIndex: -1, // Coloca atrás do conteúdo
                        top: 0,
                        left: 0,
                    }}
                />

                {/* Conteúdo */}
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative', // Garante que o conteúdo fique acima do fundo
                        paddingY: '5%',
                    }}
                >
                    {/* Logo */}
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <img
                            src={logoComNome}
                            style={{
                                maxWidth: '20%',
                                maxHeight: '100%',
                                objectFit: 'contain',
                            }}
                        />
                    </Box>

                    {/* Caixa de texto */}
                    <Box
                        sx={{
                            width: '55%',
                            height: '95%',
                            marginY: '5%',
                            borderTopLeftRadius: {
                                xs: '20px',
                                sm: '30px',
                                md: '30px',
                                lg: '60px',
                                xl: '100px',
                            },
                            borderTopRightRadius: {
                                xs: '20px',
                                sm: '30px',
                                md: '30px',
                                lg: '60px',
                                xl: '100px',
                            },
                            maxWidth: {
                                xs: '250px',
                                sm: '350px',
                                md: '450px',
                                lg: '500px',
                                xl: '600px',
                            },
                            maxHeight: {
                                xs: '200px',
                                sm: '300px',
                                md: '350px',
                                lg: '600px',
                                xl: '1000px',
                            },
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            flexDirection: 'column',
                            position: 'relative', // Garante que fique acima do fundo
                        }}
                    >
                        <Container sx={{ paddingTop: '0%', display: 'flex', flexDirection: 'column' }}>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: { md: '20px', lg: '30px', xl: '60px' },
                                    fontWeight: '900',
                                    color: '#ffffff',
                                    fontFamily: 'Kumbh Sans, Roboto, sans-serif',
                                }}
                            >
                                AMOR QUE
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: { md: '20px', lg: '30px', xl: '60px' },
                                    fontWeight: '900',
                                    color: '#301F3E',
                                    textAlign: 'center',
                                    fontFamily: 'Kumbh Sans, Roboto, sans-serif',
                                    backgroundColor: '#ffffff',
                                    marginX: '25%'
                                }}
                            >
                                NÃO
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: { md: '20px', lg: '30px', xl: '60px' },
                                    fontWeight: '900',
                                    color: '#ffffff',
                                    textAlign: 'right',
                                    width: '100%',
                                    fontFamily: 'Kumbh Sans, Roboto, sans-serif',
                                }}
                            >
                                TEM PREÇO
                            </Typography>
                        </Container>
                    </Box>
                </Box>
            </Grid2>

            <Grid2 item xs={12} md={6} sx={{ height: 'auto', width: { xs: '100vw', sm: '60vw', md: '60vw' }, backgroundColor: { xs: '#dfd5ea', md: '#7E579D100' } }}>
                <Box sx={{ position: 'relative', left: 0, top: 0, marginY: '5px', display: 'flex', width: '100%' }}>
                    <Box sx={{ position: 'absolute', width: '100%', marginLeft: '2%', color: '#301F3E', marginTop: '2%', justifyContent: 'flex-start', display: 'flex', height: 'auto' }}>
                        <ArrowBackIosNewIcon onClick={() => navigate('/')}
                            sx={{ height: '100%', color: '#170d1f', cursor: 'pointer', backgroundColor: '#efefef', borderRadius: '200px', padding: '3px' }}
                        />
                    </Box>
                </Box>
                <Box sx={{
                    height: '100vh',
                    width: '100%',
                    display: 'flex',
                    justifyContent: { sm: 'center' },
                    alignContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', position: 'fixed', height: '100%', alignContent: 'center', marginTop: { xs: '2%', sm: '5%' } }}><ActionAlerts alert={alert} setAlert={setAlert} /></Box>
                    <Paper elevation={3} sx={{ height: 'auto', width: { xs: '90%', md: '50%' }, margin: 'auto', padding: '0' }}>
                        {/* Logo */}
                        <Box sx={{
                            width: '100%',
                            display: { xs: 'flex', md: 'none' },
                            maxWidth: { xs: '20%', lg: '15%' },
                            marginX: 'auto',
                            marginY: '5%',
                            justifyContent: 'center',
                        }}>
                            <img src={logoAdote} style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain'
                            }} />
                        </Box>
                        <Box sx={{ paddingTop: { xs: '0%', md: '7.5%' }, textAlign: 'center' }}>
                            <Typography variant="body1" sx={{
                                fontSize: { xs: '20px', md: '20px', lg: '30px', xl: '60px' },
                                textAlign: 'center',
                                fontWeight: '900',
                                color: '#301F3E',
                                marginBottom: '2.5%',
                                width: '100%',
                                fontFamily: 'Kumbh Sans, Roboto, sans-serif'
                            }}>
                                LOGIN
                            </Typography>
                            <Box sx={{
                                width: '100%', marginY: '2%', display: { sx: 'none', md: 'flex' }, justifyContent: 'center'
                            }}>
                                <Typography variant="subtitle2" sx={{ display: 'inline-block', marginRight: '2px' }}>
                                    Não possui uma conta?
                                </Typography>
                                <Typography variant="subtitle2" sx={{ display: 'inline-block', color: '#13AAFF', cursor: 'pointer' }} onClick={() => navigate('/auth/cadastro')}>
                                    Cadastre-se aqui
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', marginX: 'auto', marginY: '5%' }}>
                            <TextField size='small' id="email" label="E-mail" onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                    sendData()
                                }
                            }} onChange={(e) => setEmail(e.target.value)} required sx={{ width: '70%', marginBottom: '2%' }} />
                            <TextField size='small' id="senha" label="Senha" onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                    sendData()
                                }
                            }} onChange={(e) => setPassword(e.target.value)} type="password" sx={{ width: '70%' }} />
                            <Typography variant="subtitle2" sx={{ display: 'inline-block', color: '#13AAFF', letterSpacing: -1, textAlign: 'end', width: '70%', cursor: 'pointer' }} onClick={() => navigate('/auth/recuperar-senha')}>Esqueceu sua senha?</Typography>
                            <Button variant="contained" onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                    sendData()
                                }
                            }} onClick={sendData} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '30px', width: '70%', marginX: 'auto', marginY: '2%', backgroundColor: '#301F3E' }}>Entrar</Button>
                        </Box>
                    </Paper>
                </Box>
            </Grid2>

        </Grid2 >
    );
}

export default Login;
