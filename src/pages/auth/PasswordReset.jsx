import React, { useEffect, useState } from 'react';
import { Box, Container, Grid2, Button, Divider, Typography, Paper } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';

const PasswordReset = () => {
    const navigate = useNavigate();
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState(false);
    const [showPassword1, setShowPassword1] = React.useState(false);
    const [showPassword2, setShowPassword2] = React.useState(false);

    const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
    const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        setError(password1 != password2)
    }, [password2])

    return (
        <Grid2 container sx={{
            height: 'calc(100vh - 50px)',
            width: '100vw',
            overflowY:'hidden',
            backgroundColor: '#e2e2e2',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Box sx={{
                width: '5%',
                color: '#301F3E',
                justifyContent: 'flex-start',
                display: 'flex',
                padding: '2%'
            }}>
                <ArrowBackIosNewIcon  onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}/>
                </Box>
            <Box sx={{
                justifyContent: 'center',
                alignContent: 'center',
                margin:'auto',
                width: '95%',
                display: 'flex',
                height: 'auto', // Faz com que o Paper ocupe a altura necessária
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
                        <Typography noWrap={false} variant="body1" sx={{
                            fontSize: { xs:'20px', md: '25px', lg: '30px', xl: '60px' },
                            textAlign: 'center',
                            fontWeight: '900',
                            color: '#301F3E',
                            marginTop: '5%',
                            width: '100%',
                            fontFamily: 'Kumbh Sans, Roboto, sans-serif'
                        }}>
                            REDEFINIR SENHA
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
                        <FormControl size='small' sx={{ width: '60%', marginBottom:'2%' }} variant="outlined">
                            <InputLabel htmlFor="senha" >Senha</InputLabel>
                            <OutlinedInput
                                id="senha"
                                type={showPassword1 ? 'text' : 'password'}
                                onChange={(e) => setPassword1(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword1}
                                            onMouseDown={handleMouseDownPassword}
                                            onMouseUp={handleMouseUpPassword}
                                            edge="end"
                                        >
                                            {showPassword1 ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Senha"
                            />
                        </FormControl>
                        <FormControl size='small' sx={{ width: '60%', marginBottom: '2%' }} variant="outlined">
                            <InputLabel htmlFor="confirmar-senha" >Confimar senha</InputLabel>
                            <OutlinedInput
                                id="confirmar-senha"
                                error={error}
                                type={showPassword2 ? 'text' : 'password'}
                                onChange={(e) => { setPassword2(e.target.value) }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword2}
                                            onMouseDown={handleMouseDownPassword}
                                            onMouseUp={handleMouseUpPassword}
                                            edge="end"
                                        >
                                            {showPassword2 ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Confirmar senha"
                            />
                            {error && <FormHelperText sx={{ color: '#D32F2F', marginLeft: '0' }}>As senhas não coincidem</FormHelperText>}
                        </FormControl>
                    </Box>
                    <Button variant="contained" sx={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '60%',
                        backgroundColor: '#301F3E',
                        marginY: '2.5%',
                        marginX: 'auto'
                    }}>Redefinir senha</Button>
                </Paper>
            </Box>
        </Grid2>
    );
}

export default PasswordReset;
