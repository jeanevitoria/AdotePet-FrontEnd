import React, { useEffect, useState } from 'react';
import { Box, Grid2, Button, Typography, Paper, InputLabel } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';

const Perfil = () => {
    const navigate = useNavigate();

    // Definindo estados para cada campo
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [celular, setCelular] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
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

    const handleDate = () => {

    }

    const handleSubmit = () => {
        console.log({
            nome,
            email,
            celular,
            nascimento,
            senha,
        });
    };

    return (
        <Grid2 container sx={{
            width: '100vw',
            height: 'screen',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
        }}>
            <Box sx={{  color: '#301F3E', marginTop: '2%', justifyContent: 'flex-start', display: 'flex' }}>
                <ArrowBackIosNewIcon onClick={() => navigate('/')} sx={{ cursor: 'pointer' }} />
            </Box>
            <Box sx={{
                width: '100%',
                justifyContent: 'center',
                height:'auto',
                display: 'flex',
            }}>
                <Paper elevation={3} sx={{ width: { sx: '100%', sm: '100%', md: '70%', lg: '50%' }, marginY: '0%', display: 'flex', flexDirection: 'column', padding: '16px' }}>
                    <Box sx={{ textAlign: 'center', marginBottom: '16px' }}>
                        <Typography variant="body1" sx={{
                            fontSize: { md: '20px', lg: '30px', xl: '60px' },
                            textAlign: 'center',
                            fontWeight: '900',
                            color: '#301F3E',
                            fontFamily: 'Kumbh Sans, Roboto, sans-serif'
                        }}>
                            PERFIL
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <FormControl size='small' sx={{ width: '90%', marginBottom: '16px' }} variant="outlined">
                            <FormLabel id="nome-animal">Nome completo</FormLabel>
                            <OutlinedInput
                                id="nome-animal"
                                type={'text'}
                                placeholder='Digite o seu nome completo'
                                value={nome} // Controlando o valor pelo estado
                                onChange={(e) => setNome(e.target.value)} // Atualizando o estado
                                sx={{ background: '#ebebeb', "& fieldset": { border: 'none' } }}
                            />
                        </FormControl>
                        <FormControl size='small' sx={{ width: '90%', marginBottom: '16px' }} variant="outlined">
                            <FormLabel id="nome-animal">E-mail</FormLabel>
                            <OutlinedInput
                                id="nome-animal"
                                type={'text'}
                                placeholder='Digite o seu e-mail'
                                value={email} // Controlando o valor pelo estado
                                onChange={(e) => setEmail(e.target.value)} // Atualizando o estado
                                sx={{ background: '#ebebeb', "& fieldset": { border: 'none' } }}
                            />
                        </FormControl>
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, width: '90%', marginBottom: '16px' }}>
                            <FormControl variant="standard" size='small' sx={{ width: { xs: '100%', md: '45%' }, marginRight: '10%' }}>
                                <FormLabel id="tipo-animal">Celular</FormLabel>
                                <OutlinedInput
                                    id="nome-animal"
                                    type={'number'}
                                    placeholder='Digite o seu número de celular'
                                    value={celular}
                                    onChange={(e) => setCelular(e.target.value)}
                                    sx={{ background: '#ebebeb', "& fieldset": { border: 'none' } }}
                                />
                            </FormControl>
                            <FormControl size='small' sx={{ width: { xs: '100%', md: '45%' } }} variant="standard">
                                <FormLabel id="raca">Data de nascimento</FormLabel>
                                <OutlinedInput
                                    id="nascimento"
                                    type={'number'}
                                    placeholder='Digite o seu número de celular'
                                    value={nascimento}
                                    onChange={handleDate}
                                    sx={{ background: '#ebebeb', "& fieldset": { border: 'none' } }}
                                />
                            </FormControl>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            width: '90%'
                        }}>
                            <FormControl size='small' sx={{ width: { xs: '100%', md: '45%' }, marginRight: '10%' }} variant="standard">
                                <FormLabel htmlFor="senha" >Senha</FormLabel>
                                <OutlinedInput
                                    id="senha"
                                    type={showPassword1 ? 'text' : 'password'}
                                    onChange={(e) => setPassword1(e.target.value)}
                                    placeholder='Digite a sua senha'
                                    sx={{ background: '#ebebeb', "& fieldset": { border: 'none' } }}
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
                                />
                            </FormControl>
                            <FormControl size='small' sx={{ width: { xs: '100%', md: '45%' } }} variant="standard">
                                <FormLabel htmlFor="confirmar-senha" >Confimar senha</FormLabel>
                                <OutlinedInput
                                    id="confirmar-senha"
                                    error={error}
                                    type={showPassword2 ? 'text' : 'password'}
                                    onChange={(e) => { setPassword2(e.target.value) }}
                                    placeholder='Confirme a nova senha'
                                    sx={{ background: '#ebebeb', "& fieldset": { border: 'none' } }}
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
                                />
                                {error && <FormHelperText sx={{ color: '#D32F2F', marginLeft: '0' }}>As senhas não coincidem</FormHelperText>}
                            </FormControl>
                        </Box>
                        <Button variant="contained" onClick={handleSubmit} sx={{ marginTop: '16px', width: '90%', background: '#301F3E', color: '#ffffff' }}>
                            ATUALIZAR DADOS
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Grid2>
    );
};

export default Perfil;
