import React, { useState } from 'react';
import { Box, Container, Grid2, Button, Divider, Typography, Paper } from '@mui/material';
import logoAdote from '../../assets/logoAdote.png';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { recuperarSenha } from '../../services/userService';
import Alert from '@mui/material/Alert';

const PasswordRecovery = () => {
    const [email, setEmail] = useState('');
    const [alert, setAlert] = useState({ type: 'none', message: '' })
    const navigate = useNavigate();

    const handleSend = () => {
        recuperarSenha(email)
            .then((res) => {
                setAlert({ type: 'success', message: 'Link de redefinição enviado com sucesso. Verifique o seu e-mail!' })
            })
            .catch((err) => {
                setAlert({ type: 'error', message: `Falha ao enviar link de redefinição: ${err}` })
                setTimeout(() => setAlert({ type: 'none', message: '' }), 5000)
            })
    }

    return (
        <Grid2 container sx={{
            height: '100%',
            width: '100vw',
            backgroundColor: '#e2e2e2',
            display: 'flex',
            position: 'relative',
            overflow: 'hidden',
            flexDirection: 'column',
        }}>
            <Box sx={{
                width: '5%',
                position: 'absolute',
                color: '#301F3E',
                justifyContent: 'flex-start',
                display: 'flex',
                padding: '2%'
            }}
            >
                <ArrowBackIosNewIcon onClick={() => navigate('/')} sx={{ cursor: 'pointer' }} />
            </Box>
            {alert.type != 'none' && (
                <Box sx={{
                    width: { xs: '80%', sm: '40%' },
                    textWrap: 'wrap',
                    marginX: 'auto',
                    marginTop: '10px'
                }}>
                    <Alert severity={alert.type}
                        onClose={() => {}}
                    > {alert.message} </Alert>
                </Box>
            )}
            <Box sx={{
                justifyContent: 'center',
                alignContent: 'center',
                width: '95%',
                display: 'flex',
                margin: 'auto',
                height: 'auto'
            }}>
                <Paper elevation={5} sx={{
                    width: { sx: '85%', md: '60%', lg: '40%' },
                    paddingY: '2.5%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Box sx={{ textAlign: 'center', marginBottom: '1%' }}>
                        <Typography variant="body1" sx={{
                            fontSize: { md: '18px', lg: '28px', xl: '58px' },
                            textAlign: 'center',
                            fontWeight: '900',
                            color: '#301F3E',
                            marginTop: '5%',
                            width: '100%',
                            fontFamily: 'Kumbh Sans, Roboto, sans-serif'
                        }}>
                            RECUPERAR SENHA
                        </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center', marginBottom: '1%', width: '100%' }}>
                        <Typography variant="subtitle2" sx={{
                            textAlign: 'center',
                            color: '#5b5b5b',
                            margin: 'auto',
                            width: '60%',
                        }}>
                            Digite o seu e-mail cadastrado e nós te
                            enviaremos um link de redefinição de senha.
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '7.5%',
                        width: '100%'
                    }}>
                        <TextField size='small' type='email' required id="email" label="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ width: '60%' }} />
                    </Box>
                    <Button variant="contained" sx={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '60%',
                        backgroundColor: '#301F3E',
                        marginY: '2.5%',
                        marginX: 'auto'
                    }} onClick={handleSend}>Enviar</Button>
                </Paper>
            </Box>
        </Grid2>
    );
}

export default PasswordRecovery;
