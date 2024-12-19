import React, { useEffect, useState } from 'react';
import { Box, Grid2, Button, Typography, Paper, InputLabel, Stack } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { cadastrarAnimal, obterRacasCachorros, obterRacasGatos } from '../../services/animalService';
import { obterMunicipios, obterEstados } from '../../services/estadosService';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ActionAlerts } from '../../components/Alert';
import AlertDialog from '../../components/AlertDialog';

const CadastrarAnimal = () => {
    const navigate = useNavigate();

    // Definindo estados para cada campo
    const [picture, setPicture] = useState('')
    const [nomeAnimal, setNomeAnimal] = useState('');
    const [raca, setRaca] = useState('');
    const [peso, setPeso] = useState('');
    const [sexo, setSexo] = useState('');
    const [tipoAnimal, setTipoAnimal] = useState('');
    const [cidade, setCidade] = useState('');
    const [vacinado, setVacinado] = useState('');
    const [idade, setIdade] = useState('');
    const [descricao, setDescricao] = useState('');
    const [racasCachorros, setRacasCachorros] = useState([]);
    const [racasGatos, setRacasGatos] = useState([]);
    const [estados, setEstados] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [estado, setEstado] = useState('');
    const [alert, setAlert] = useState({ type: 'none', message: '' });
    const [alertVisible, setAlertVisible] = useState(false);
    const [erro, setErro] = useState('');
    const [file, setFile] = useState([])


    const sendData = () => {
        if (!nomeAnimal, !sexo, !tipoAnimal, !raca, !cidade, !estado, !descricao, !picture, !peso, !idade, !vacinado) {
            setAlert({ type: 'warning', message: 'Há campos vazios ou inválidos.' })
            setTimeout(() => { setAlert({ type: 'none', message: '' }) }, 3000)
            return;
        }
        console.log(file);
        console.log(picture) 

        const reader = new FileReader();
        reader.onloadend = () => {
            setPicture(reader.result);
        }
        reader.readAsDataURL(file[0])

        cadastrarAnimal(nomeAnimal, sexo, tipoAnimal, raca, { cidade, estado }, descricao, picture[0], peso, idade, vacinado)
            .then(() => {
                setAlertVisible(true)
                setNomeAnimal('');
                setSexo('');
                setTipoAnimal('');
                setRaca('');
                setCidade('');
                setEstado('');
                setDescricao('');
                setPicture([]);
                setPeso('');
                setIdade('');
                setVacinado('');
            })
            .catch((err) => {
                setAlert({ type: 'error', message: err.message })
                setTimeout(() => { setAlert({ type: 'none', message: '' }) }, 3000)
            })
    }

    const obterRacas = async () => {
        setErro('');

        try {
            const responseCachorros = await obterRacasCachorros();
            const racasGatos = await obterRacasGatos();

            racasGatos.unshift({ nome: 'Vira-lata' });
            responseCachorros.data.query.categorymembers.unshift({ title: 'Vira-lata' });

            setRacasGatos(racasGatos);
            setRacasCachorros(responseCachorros.data.query.categorymembers);
        } catch (error) {
            console.error('Erro ao buscar raças:', error);
            setErro('Erro ao buscar raças');
        }
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    useEffect(() => {
        obterRacas();
    }, []);

    useEffect(() => {
        const getEstados = async () => {
            try {
                const response = await obterEstados();
                setEstados(response.data);
            } catch (erro) {
                console.log(erro);
            }
        };
        getEstados();
    }, []);

    useEffect(() => {
        if (estado) {
            const getCidades = async () => {
                try {
                    const response = await obterMunicipios(estado);
                    setCidades(response.data);
                } catch (erro) {
                    console.log(erro);
                }
            };
            getCidades();
        }
    }, [estado]);

    return (
        <Grid2 container sx={{
            width: '100vw',
            height: 'auto',
            display: 'flex',
            position: 'relative',
            flexDirection: 'column',
            justifyContent: { sm: 'center' },
            alignContent: 'center',
            alignItems: 'center',
            marginY: { xs: '0%', md: '1%' },
        }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', position: 'fixed', top:0, alignContent: 'center', marginTop: { xs: '2%', sm: '5%' } }}><ActionAlerts alert={alert} setAlert={setAlert} /></Box>
            {alertVisible && (<Box sx={{ position: 'fixed', zIndex: 1000, justifySelf: 'center', marginTop: '50%', width: '100%', display: alert.type != 'none' ? 'flex' : 'none' }}>
                {< AlertDialog alertVisible={alertVisible} setAlertVisible={setAlertVisible} />}
            </Box>
            )}
            <Paper elevation={3} sx={{ width: { xs: '100%', sm: '80%', md: '70%', lg: '50%' }, display: 'flex', flexDirection: 'column', padding: '16px' }}>
                <Box sx={{
                    textAlign: 'center', marginBottom: '16px', marginX: 'auto'
                }}>
                    <Typography variant="body1" sx={{
                        fontSize: { xs: '21px', md: '19px', lg: '30px', xl: '60px' },
                        textAlign: 'center',
                        fontWeight: '900',
                        color: '#301F3E',
                        fontFamily: 'Kumbh Sans, Roboto, sans-serif'
                    }}>
                        CADASTRAR ANIMAL
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <FormControl size='small' sx={{ width: '90%', marginBottom: '16px' }} variant="outlined">
                        <FormLabel id="nome-animal">Nome do animal</FormLabel>
                        <OutlinedInput
                            id="nome-animal"
                            type={'text'}
                            placeholder='Digite o nome do animal'
                            value={nomeAnimal} // Controlando o valor pelo estado
                            onChange={(e) => setNomeAnimal(e.target.value)} // Atualizando o estado
                            sx={{ background: '#ebebeb', "& fieldset": { border: 'none' } }}
                        />
                    </FormControl>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, marginY: 'auto', width: '90%', marginBottom: '16px' }}>
                        <FormControl variant="standard" sx={{ width: { xs: '100%', md: '30%' }, marginRight: '5%' }}>
                            <FormLabel id="tipo-animal">Tipo de animal</FormLabel>
                            <Select
                                labelId="tipo"
                                id="tipo"
                                value={tipoAnimal} // Controlando o valor pelo estado
                                onChange={(e) => setTipoAnimal(e.target.value)} // Atualizando o estado
                                label="Tipo"
                            >
                                <MenuItem value={'gato'}>Gato</MenuItem>
                                <MenuItem value={'cachorro'}>Cachorro</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl size='small' sx={{ width: { xs: '100%', md: '65%' }, marginY: 'auto' }} variant="standard">
                            <FormLabel id="raca">Raça</FormLabel>
                            <Select
                                disabled={!tipoAnimal}
                                labelId="raca"
                                id="raca"
                                value={raca}
                                onChange={(e) => setRaca(e.target.value)}
                            >
                                {tipoAnimal == 'gato' ? (
                                    racasGatos.map((value) => {
                                        return (<MenuItem key={value.title} value={value.nome}>{value.nome}</MenuItem>)
                                    })
                                ) : (
                                    racasCachorros.map((value, index) => {
                                        if (index == 0 || (index > 5 && index < 128)) {
                                            return (<MenuItem key={value.title} value={value.title}>{value.title}</MenuItem>)
                                        }
                                    })
                                )}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', width: '90%', marginBottom: '16px' }}>
                        <FormControl sx={{ width: { xs: '100%', md: '65%' }, marginRight: '5%' }}>
                            <FormLabel id="sexo">Sexo</FormLabel>
                            <RadioGroup row name="sexo" value={sexo} onChange={(e) => setSexo(e.target.value)}> {/* Controlando o valor pelo estado */}
                                <FormControlLabel value="Fêmea" control={<Radio />} label="Fêmea" />
                                <FormControlLabel value="Macho" control={<Radio />} label="Macho" />
                            </RadioGroup>
                        </FormControl>
                        <FormControl size='small' sx={{ width: '30%' }} variant="outlined">
                            <FormLabel id="peso">Peso (kg)</FormLabel>
                            <OutlinedInput
                                error={true}
                                id="peso"
                                type={'number'}
                                placeholder={'0'}
                                value={peso} // Controlando o valor pelo estado
                                onChange={(e) => setPeso(e.target.value)} // Atualizando o estado
                                sx={{ background: '#ebebeb', "& fieldset": { border: 'none' } }}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, width: '90%', marginBottom: '16px' }}>
                        <FormControl size='small' variant="standard" sx={{ width: { xs: '100%', md: '30%' }, marginRight: '5%' }}>
                            <FormLabel id="estado">Estado</FormLabel>
                            <Select
                                labelId="estado"
                                id="estado"
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                            >
                                {estados.map((value) => {
                                    return (<MenuItem value={value.sigla}>{value.nome} ({value.sigla})</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                        <FormControl size='small' variant="standard" sx={{ width: { xs: '100%', md: '65%' } }}>
                            <FormLabel id="cidade">Cidade</FormLabel>
                            <Select
                                disabled={!estado}
                                labelId="cidade"
                                id="cidade"
                                value={cidade}
                                onChange={(e) => setCidade(e.target.value)}
                            >
                                {cidades.map((value) => {
                                    return (<MenuItem value={value.nome}>{value.nome}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, width: '90%', marginBottom: '16px' }}>
                        <FormControl sx={{ width: { xs: '100%', md: '65%' }, marginRight: '5%' }}>
                            <FormLabel id="vacinado">Vacinado</FormLabel>
                            <RadioGroup row name="vacinado" value={vacinado} onChange={(e) => setVacinado(e.target.value)}> {/* Controlando o valor pelo estado */}
                                <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                                <FormControlLabel value="nao" control={<Radio />} label="Não" />
                            </RadioGroup>
                        </FormControl>
                        <FormControl variant="standard" sx={{ width: { xs: '100%', md: '30%' } }}>
                            <FormLabel id="idade">Idade</FormLabel>
                            <Select
                                labelId="idade"
                                id="idade"
                                value={idade} // Controlando o valor pelo estado
                                onChange={(e) => setIdade(e.target.value)} // Atualizando o estado
                                label="Idade"
                            >
                                <MenuItem value={'0-3 meses'}>0-3 meses</MenuItem>
                                <MenuItem value={'4-6 meses'}>4-6 meses</MenuItem>
                                <MenuItem value={'7-9 meses'}>7-9 meses</MenuItem>
                                <MenuItem value={'10-11 meses'}>10-11 meses</MenuItem>
                                {Array.from({ length: 10 }).map((_, index) => {
                                    return (
                                        <MenuItem value={index + 1}>{index + 1} ano{index == 0 ? '' : 's'}</MenuItem>
                                    )
                                })}
                                <MenuItem value={'mais de 10'}>Mais de 10 anos</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <FormControl size='small' sx={{ width: '90%', marginBottom: '16px' }} variant="outlined">
                        <FormLabel id="descricao">Descrição</FormLabel>
                        <OutlinedInput
                            id="descricao"
                            multiline
                            rows={4}
                            type={'text'}
                            placeholder='Descrição'
                            value={descricao} // Controlando o valor pelo estado
                            onChange={(e) => setDescricao(e.target.value)} // Atualizando o estado
                            sx={{ background: '#ebebeb', "& fieldset": { border: 'none' }, resize: 'vertical' }}
                        />
                    </FormControl>
                    <FormControl sx={{ width: '90%', marginBottom: '16px', gap: '10px' }}>
                        <FormLabel id="foto">Foto do animal</FormLabel>
                        <Button
                            size='small'
                            component="label"
                            role={undefined}
                            sx={{ maxWidth: { xs: '60%', sm: '30%' } }}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            Enviar foto
                            <VisuallyHiddenInput
                                type="file"
                                onChange={(event) => {                                    
                                    const filesArray = Array.from(event.target.files);
                                    setFile(filesArray);
                                    console.log(filesArray)
                                    console.log('foto:' + file)
                                }}
                            />
                        </Button>
                        {Array.isArray(file) && file.map((file) => {
                            return (
                                <Stack direction={"row"} sx={{ borderRadius: '20px', fontSize: { xs: '13px', sm: '15px' }, justifyContent: 'space-between', paddingX: '5px' }} alignItems={'center'}>
                                    <AttachFileIcon />
                                    <Box sx={{ color: '#4a91e8' }}>
                                        {file.name}
                                    </Box>
                                    <DeleteIcon onClick={() => setPicture([])} sx={{ cursor: 'pointer' }} />
                                </Stack>
                            )
                        })}
                    </FormControl>
                    <Button variant="contained" onClick={sendData} sx={{ marginTop: '16px', width: '90%', background: '#301F3E', color: '#ffffff' }}>
                        Cadastrar
                    </Button>
                </Box>
            </Paper>
        </Grid2 >
    );
};

export default CadastrarAnimal;
