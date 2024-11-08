import React, { useEffect, useState } from 'react';
import { Box, Grid2, Button, Typography, Paper, InputLabel } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import { getUserService } from '../../services/userService';

const Perfil = () => {
    const navigate = useNavigate();

    // Definindo estados para cada campo
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [celular, setCelular] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [nascimento, setNascimento] = useState("__/__/____");
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
        const initializeData = () => {
            getUserService()
                .then((result) => {
                    const data = result.data[0];
                    setEmail(data.email)
                    setCelular(data.celular)
                    setNome(data.nome)
                    let dataNascimento = data.nascimento.split('T')[0]
                    dataNascimento = dataNascimento.slice(5, 7) + '/' + dataNascimento.slice(8, 10) + '/' + dataNascimento.slice(0, 4)
                    setNascimento(dataNascimento)
                })
                .catch((err) => {console.error(err.message)})
            }
        initializeData()
    }, [])

    useEffect(() => {
        setError(password1 != password2)
    }, [password2])

    const handlenascimentoChange = (e) => {
        // Captura apenas valores numéricos
        let input = e.target.value.replace(/\D/g, ''); 

        // Insere as barras (/) na posição correta
        if (input.length > 2) input = input.slice(0, 2) + '/' + input.slice(2);
        if (input.length > 5) input = input.slice(0, 5) + '/' + input.slice(5);
        
        setNascimento(input.slice(0, 10));
    };

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
            width: { xs: '100vw', md: '100vw' },
            height: 'calc(100vh - 50px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: { sm: 'center' },
            alignItems: 'center',
            margin: 'auto'
        }}>
            <Paper elevation={3} sx={{
                width: { xs: '100%', sm: '100%', md: '70%', lg: '50%' }, height: { xs: '100%', md: 'auto' }, justifyContent: 'center',
                alignItems: 'center', display: 'flex', flexDirection: 'column', paddingY: '16px'
            }}>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body1" sx={{
                        fontSize: { xs: '22px', md: '22px', lg: '30px', xl: '60px' },
                        textAlign: 'center',
                        fontWeight: '900',
                        color: '#301F3E',
                        fontFamily: 'Kumbh Sans, Roboto, sans-serif'
                    }}>
                        PERFIL
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <FormControl size='small' sx={{ width: '100%' }} variant="outlined">
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
                    <FormControl size='small' sx={{ width: '100%' }} variant="outlined">
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
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, width: '100%' }}>
                        <FormControl variant="standard" size='small' sx={{ width: { xs: '100%', md: '45%' }, marginRight: 'auto' }}>
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
                                placeholder='dd/mm/aaaa'
                                value={nascimento}
                                onChange={handlenascimentoChange}
                                sx={{ background: '#ebebeb', "& fieldset": { border: 'none' } }}
                            />                        </FormControl>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        width: '100%'
                    }}>
                        <FormControl size='small' sx={{ width: { xs: '100%', md: '45%' }, marginRight: 'auto' }} variant="standard">
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
                    <Button variant="contained" onClick={handleSubmit} sx={{ marginTop: '16px', width: '100%', background: '#301F3E', color: '#ffffff' }}>
                        ATUALIZAR DADOS
                    </Button>
                </Box>
            </Paper>
        </Grid2>
    );
};

export default Perfil;
