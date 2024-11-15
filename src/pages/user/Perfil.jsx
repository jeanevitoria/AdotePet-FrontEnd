import React, { useEffect, useState } from 'react';
import { Box, Grid2, Button, Typography, Paper, InputLabel } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import CloseIcon from '@mui/icons-material/Close';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { getUserService } from '../../services/userService';
import { ActionAlerts } from '../../components/Alert';
import { atualizarPerfilService } from '../../services/userService'

const Perfil = () => {
    const navigate = useNavigate();

    // Definindo estados para cada campo
    const [editing, setEditing] = useState(false);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [celular, setCelular] = useState('');
    const [alert, setAlert] = useState({ type: 'none', message: '' })
    const [nascimento, setNascimento] = useState("__/__/____");
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState(false);
    const [showPassword1, setShowPassword1] = React.useState(false);
    const [showPassword2, setShowPassword2] = React.useState(false);
    const [array, setArray] = useState(['(', '_', '_', ')', ' ', '9', '_', '_', '_', '_', '-', '_', '_', '_', '_'])

    const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
    const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
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

    const initializeData = () => {
        getUserService()
            .then((result) => {
                const data = result.data[0];
                console.log(data)
                setEmail(data.email)
                let numCelular = data.celular;
                numCelular = '(' + numCelular.slice(0, 2) + ') ' + numCelular.slice(2, 7) + '-' + numCelular.slice(7)
                setCelular(numCelular)
                setNome(data.nome)
                setNascimento(data.nascimento.replace(/-/g, '/'))
                setPassword1('')
                setPassword2('')
            })
            .catch((err) => { console.error(err.message) })
    }

    useEffect(() => {
        if (editing == false) {
            initializeData()
        }
    }, [editing])

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

    const handleSubmit = async () => {
        console.log(nome, email, password1, celular, nascimento)
        const numCelular = (celular.replace(/\D/g, ''))
        if (!nome || !email || !celular || !nascimento || password1 != password2 || numCelular.length < 11) {
            setAlert({ type: 'warning', message: 'Há campos vazios ou inválidos.' })
            setTimeout(() => setAlert({ type: 'none' }), 5000)
        } else {
            const data = {
                nome: nome,
                email: email,
                ...(password1 && { senha: password1 }),

                celular: (celular.replace(/\D/g, '')),
                nascimento: nascimento.replace(/\//g, '-')
            }

            atualizarPerfilService(data)
                .then((result) => {
                    if (result.status == 200) {
                        setAlert({ type: 'success', message: 'Dados atualizados com sucesso.' })
                    } else {
                        setAlert({ type: 'error', message: 'A atualização de dados falhou.' })
                    }
                    setTimeout(() => { setAlert({ type: 'none', message: '' }) }, 5000)
                })
                .catch((error) => { setAlert({ type: 'error', message: error.message }) })
        }
    }

    return (

        <Grid2 container sx={{
            width: { xs: '100vw', md: '100vw' },
            height: {xs: 'screen',sm:'calc(100vh - 50px)'},
            display: 'flex',
            flexDirection: 'column',
            justifyContent: { sm: 'center' },
            alignContent: 'center',
            alignItems: 'center',
            margin: 'auto'
        }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', position: 'fixed', height: '100%', alignContent: 'center', marginTop: { xs: '2%', sm: '5%' } }}><ActionAlerts alert={alert} setAlert={setAlert} /></Box>
            <Paper elevation={5} sx={{
                width: { xs: '100%', sm: '100%', md: '70%', lg: '50%' }, height: { xs: '100%', md: 'auto' }, justifyContent: 'center',
                alignItems: 'center', display: 'flex', flexDirection: 'column', paddingY: '16px', gap: '30px'
            }}>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body1" sx={{
                        fontSize: { xs: '24px', md: '25px', lg: '30px', xl: '60px' },
                        textAlign: 'center',
                        fontWeight: '900',
                        borderColor:'#301F3E',
                        borderRadius:'10px',
                        color: '#301F3E',
                        fontFamily: 'Kumbh Sans, Roboto, sans-serif'
                    }}>
                        PERFIL
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box sx={{ justifyContent: 'flex-end', display:'flex', flexDirection:'column', marginLeft:'auto' }}>
                        <Button size='small' variant='outlined' sx={{ display:'flex', marginLeft:'auto' }} onClick={() => setEditing((prev) => !prev)}>
                            <Typography sx={{ marginRight: '5px' }}>
                                Editar
                            </Typography>
                            {editing ? <CloseIcon />
                                : <EditIcon />}
                        </Button>
                        <Typography variant='subtitle1' sx={{
                            textAlign: 'center',
                            color: '#301F3E',
                            fontFamily: 'Kumbh Sans, Roboto, sans-serif'
                        }}>
                            Altere apenas os campos desejados.
                        </Typography>
                    </Box>
                    <FormControl size='small' sx={{ width: '100%' }} variant="outlined">
                        <FormLabel id="nome-animal">Nome completo</FormLabel>
                        <OutlinedInput
                            id="nome-animal"
                            type={'text'}
                            disabled={editing ? false : true}
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
                            disabled={editing ? false : true}
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
                                disabled={editing ? false : true}
                                placeholder='Digite o seu número de celular'
                                value={celular}
                                onKeyDown={handleCelular}
                                sx={{ background: '#ebebeb', "& fieldset": { border: 'none' } }}
                            />
                        </FormControl>
                        <FormControl size='small' sx={{ width: { xs: '100%', md: '45%' } }} variant="standard">
                            <FormLabel id="raca">Data de nascimento</FormLabel>
                            <OutlinedInput
                                placeholder='dd/mm/aaaa'
                                disabled={editing ? false : true}
                                value={nascimento}
                                onChange={handlenascimentoChange}
                                sx={{ background: '#ebebeb', "& fieldset": { border: 'none' } }}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        width: '100%'
                    }}>
                        <FormControl size='small' sx={{ width: { xs: '100%', md: '45%' }, marginRight: 'auto' }} variant="standard">
                            <FormLabel htmlFor="senha" >Nova senha</FormLabel>
                            <OutlinedInput
                                id="senha"
                                type={showPassword1 ? 'text' : 'password'}
                                value={password1}
                                onChange={(e) => setPassword1(e.target.value)}
                                disabled={editing ? false : true}
                                placeholder='Digite a nova senha'
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
                                value={password2}
                                type={showPassword2 ? 'text' : 'password'}
                                disabled={editing ? false : true}
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
                    <Button variant="contained" disabled={editing ? false : true} onClick={handleSubmit} sx={{ marginTop: '16px', width: '100%', background: '#301F3E', color: '#ffffff' }}>
                        ATUALIZAR DADOS
                    </Button>
                </Box>
            </Paper>
        </Grid2>
    );
};

export default Perfil;
