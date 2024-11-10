import React, { useEffect, useState } from 'react';
import { Box, Container, Grid2, Button, Divider, Typography, Paper } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { cadastroService } from '../../services/userService';

const SignUp = () => {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [celular, setCelular] = useState('')
    const [celularInput, setCelularInput] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState(false);
    const [showPassword1, setShowPassword1] = React.useState(false);
    const [showPassword2, setShowPassword2] = React.useState(false);
    const [nascimento, setNascimento] = useState("__/__/____");
    const [array, setArray] = useState(['(', '_', '_', ')', ' ', '9', '_', '_', '_', '_', '-', '_', '_', '_', '_'])
    const [alert, setAlert] = useState({ type: 'none', message: '' });
    const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
    const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

    function ActionAlerts(alert, message) {
        return (
            <Stack sx={{ width: { xs: '80%', md: '60%', lg: '40%' }, margin: 'auto' }} spacing={2}>
                {alert.type == 'warning' &&
                    <Alert severity="warning" onClose={() => { setAlert({ type: 'none' }) }}>
                        Todos os campos precisam ser preenchidos.
                    </Alert>}
                {alert.type == 'success' &&
                    <Alert severity="success" >
                        Cadastro realizado com sucesso.
                    </Alert>}
                {alert.type == 'error' &&
                    <Alert severity='error' onClose={() => { }}>
                        {message}
                    </Alert>}
            </Stack>
        );
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const handleSignUp = async () => {
        console.log(nome, email, password1, celular, nascimento)
        if (!nome || !email || !password1 || !celular || !nascimento) {
            setAlert({ type: 'warning' })
            setTimeout(() => setAlert({ type: 'none' }), 5000)
        } else {
            const data = {
                nome: nome,
                email: email,
                senha: password1,
                celular: (celular.replace(/\D/g, '')),
                nascimento: nascimento.replace(/\//g, '-')
            }

            cadastroService(data)
                .then((result) => {
                    if (result.status == 200) {
                        setAlert({ type: 'success' })
                        setTimeout(() => navigate('/auth/login'), 5000)
                    } else {
                        setAlert({ typ: 'error', message: 'Cadastro não realizado.' })
                        setTimeout(() => setAlert({ type: 'none' }), 5000)
                    }
                })
                .catch((error) => { setAlert({ type: 'error', message: error.message }) })
        }
    }

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

    const handleCelular = (e) => {
        // Separa os valores numéricos
        let valores = e.key.replace(/\D/g, ''); // remove caracteres não numéricos
        let index = 0;

        while (index < valores.length) {
            if (index == 3) {
                index++;
            }
            let nextIndex = array.findIndex((element) => element === '_');
            array[nextIndex] = valores[index];
            setArray(array)
            index++;
        }

        // Atualiza o estado com o array formatado como string
        const celularFormatado = array.join('');
        setCelular(celularFormatado);
    };

    const handleBackspace = () => {
        setCelular((prev) => {
            let arrayAux = prev.split('');
            let indexFixo = [0, 3, 4, 5, 10]

            let indexSub = 0;
            let firstAvailable = arrayAux.findIndex((value) => value == '_');

            if (firstAvailable == -1) {
                // Adicona um '_' ao último elemento da array
                arrayAux[arrayAux.length - 1] = '_';
            } else if (firstAvailable == 0) {
                arrayAux[0] = '_';
            }
            else {
                // Encontra a posição anterior à última posição disponível
                while (indexFixo.includes((firstAvailable - 1) - indexSub)) {
                    indexSub++;
                }
                // Adicona um '_' ao index anterior ao último espaço disponível
                arrayAux[firstAvailable - 1 - indexSub] = '_'
            }
            setArray(arrayAux)
            return arrayAux.join('');
        });
    };

    return (
        <Grid2 container sx={{
            height: 'calc(100vh - 50px)',
            width: '100vw',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            position: 'relative',
        }}>
            <Box sx={{ position: 'relative', left: 0, top: 0, marginY: '5px', display: 'flex', flexDirection: { xs: 'row', sm: 'column' }, width: '100%' }}>
                <Box sx={{ position: 'absolute', marginLeft: '2%', color: '#301F3E', marginTop: '2%', justifyContent: 'flex-start', display: 'flex', height: 'auto' }}>
                    <ArrowBackIosNewIcon onClick={() => navigate('/')} sx={{ cursor: 'pointer' }} />
                </Box>
                <Box sx={{ margin: 'auto', width: '100%', display: alert.type != 'none' ? 'flex' : 'none' }}>{ActionAlerts(alert)}</Box>
            </Box>
            <Box sx={{
                width: '100%',
                marginY: '5px',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Paper elevation={2} sx={{ margin: 'auto', width: { sx: '100%', sm: '80%', md: '70%', lg: '40%' }, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ textAlign: 'center', margin: '5%' }}>
                        <Typography variant="body1" sx={{
                            fontSize: { xs: '23px', md: '30px', lg: '30px', xl: '60px' },
                            textAlign: 'center',
                            fontWeight: '900',
                            color: '#301F3E',
                            width: '100%',
                            fontFamily: 'Kumbh Sans, Roboto, sans-serif'
                        }}>
                            CADASTRO
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginY: '1%', width: '100%', marginX: 'auto' }}>
                        <TextField size='small' onChange={(e) => setEmail(e.target.value)} required id="email" label="E-mail" sx={{ width: '70%', background: '#ebebeb', "& fieldset": { border: 'none' }, borderRadius: '5px' }} />
                        <TextField size='small' onChange={(e) => setNome(e.target.value)} required id="nome" label="Nome completo" sx={{ width: '70%', background: '#ebebeb', "& fieldset": { border: 'none' }, borderRadius: '5px' }} />
                        <Stack sx={{ marginBottom: { xs: '20px', sm: '0px' }, width: '70%', height: '17%', display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between' }}>
                            <TextField
                                size="small"
                                required
                                id="celular"
                                value={celular}
                                label="Celular"
                                onKeyDown={(e) => {
                                    if (e.key === 'Backspace') {
                                        e.preventDefault();
                                        handleBackspace(e);
                                    } else {
                                        e.preventDefault();
                                        handleCelular(e);
                                    }
                                }}
                                placeholder="(__) 9____-____"
                                sx={{ marginBottom: { xs: '20px', sm: '0px' }, width: { xs: '100%', md: '45%' }, background: '#ebebeb', "& fieldset": { border: 'none' }, borderRadius: '5px' }}
                            />
                            <TextField
                                required
                                size="small"
                                placeholder='dd/mm/aaaa'
                                label='Data de nascimento'
                                value={nascimento}
                                onChange={handlenascimentoChange}
                                sx={{ width: { xs: '100%', md: '50%' }, background: '#ebebeb', "& fieldset": { border: 'none' }, borderRadius: '5px' }}
                            />
                        </Stack>
                        <FormControl size='small' sx={{ width: '70%' }} variant="outlined">
                            <InputLabel htmlFor="senha" >Senha</InputLabel>
                            <OutlinedInput
                                id="senha"
                                type={showPassword1 ? 'text' : 'password'}
                                sx={{ background: '#ebebeb', "& fieldset": { border: 'none' }, borderRadius: '5px' }}
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
                        <FormControl size='small' sx={{ width: '70%', marginBottom: '2%' }} variant="outlined">
                            <InputLabel htmlFor="confirmar-senha" >Confimar senha</InputLabel>
                            <OutlinedInput
                                id="confirmar-senha"
                                error={error}
                                type={showPassword2 ? 'text' : 'password'}
                                sx={{ background: '#ebebeb', "& fieldset": { border: 'none' }, borderRadius: '5px' }}
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
                        <Button onClick={handleSignUp} variant="contained" sx={{ alignItems: 'center', justifyContent: 'center', width: '70%', marginBottom: '10px', backgroundColor: '#301F3E' }}>Cadastrar</Button>
                    </Box>
                </Paper>
            </Box>
        </Grid2>
    );
}

export default SignUp;
