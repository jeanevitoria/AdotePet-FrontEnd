import React, { useEffect, useState } from 'react';
import { Box, Grid2, Button, Typography, Paper, InputLabel } from '@mui/material';
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
import { obterRacasCachorros, obterRacasGatos } from '../../services/animalService';
import { obterMunicipios, obterEstados } from '../../services/estadosService';

const CadastrarAnimal = () => {
    const navigate = useNavigate();

    // Definindo estados para cada campo
    const [nomeAnimal, setNomeAnimal] = useState('');
    const [raca, setRaca] = useState('');
    const [peso, setPeso] = useState('');
    const [genero, setGenero] = useState('');
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
    const [erro, setErro] = useState('');

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

    useEffect(() => {
        obterRacas();
    }, []);

    useEffect(() => {
        console.log(racasCachorros);
        console.log(racasGatos);
    }, [racasCachorros, racasGatos]);

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

    const handleSubmit = () => {
        console.log({
            nomeAnimal,
            raca,
            peso,
            genero,
            tipoAnimal,
            cidade,
            estado,
            vacinado,
            idade,
            descricao
        });
    };

    return (
        <Grid2 container sx={{
            width: '100vw',
            height: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            marginY: {xs:'0%', md:'1%'},
        }}>
            <Paper elevation={3} sx={{ width: { xs: '100%', sm: '80%', md: '70%', lg: '50%' }, display: 'flex', flexDirection: 'column', padding:'16px' }}>
                <Box sx={{
                    textAlign: 'center', marginBottom: '16px', marginX: 'auto'
                }}>
                    <Typography variant="body1" sx={{
                        fontSize: { xs:'21px', md: '19px', lg: '30px', xl: '60px' },
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
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, width: '90%', marginBottom: '16px' }}>
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
                        <FormControl size='small' sx={{ width: { xs: '100%', md: '65%' } }} variant="standard">
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
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, width: '90%', marginBottom: '16px' }}>
                        <FormControl sx={{ width: { xs: '100%', md: '65%' }, marginRight: '5%' }}>
                            <FormLabel id="genero">Gênero</FormLabel>
                            <RadioGroup row name="genero" value={genero} onChange={(e) => setGenero(e.target.value)}> {/* Controlando o valor pelo estado */}
                                <FormControlLabel value="femea" control={<Radio />} label="Fêmea" />
                                <FormControlLabel value="macho" control={<Radio />} label="Macho" />
                            </RadioGroup>
                        </FormControl>
                        <FormControl size='small' sx={{ width: { xs: '100%', md: '30%' } }} variant="outlined">
                            <FormLabel id="peso">Peso</FormLabel>
                            <OutlinedInput
                                error={true}
                                id="peso"
                                type={'number'}
                                placeholder='Digite o peso do animal'
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
                    <Button variant="contained" onClick={handleSubmit} sx={{ marginTop: '16px', width: '90%', background: '#301F3E', color: '#ffffff' }}>
                        Cadastrar
                    </Button>
                </Box>
            </Paper>
        </Grid2 >
    );
};

export default CadastrarAnimal;
