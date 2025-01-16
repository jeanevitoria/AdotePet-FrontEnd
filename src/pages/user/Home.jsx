import * as React from 'react';
import AnimalCard from '../../components/AnimalCard';
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useWindowSize from '../../hooks/useWindowSize';
import { getAnimaisDisponiveis, getPublicacoes } from '../../services/animalService';

const Home = () => {
    const { sm, md, lg } = useWindowSize();
    const [nextElement, setNextElement] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(lg ? 3 : md ? 2 : sm ? 1 : 4);
    const [publicacoes, setPublicacoes] = useState([]);
    const [dataPublicacoes, setDataPublicacoes] = useState([]);
    const navigate = useNavigate();
    const [dataAnimais, setDataAnimais] = useState([])

    useEffect(() => {
        const getDataAnimais = async () => {
            const publicacoes = await getPublicacoes();
            const data = await getAnimaisDisponiveis()
            setDataAnimais(data.data);
            setDataPublicacoes(publicacoes.data)
            const newItemsPerPage = lg ? 3 : md ? 2 : sm ? 1 : 4;
            setPublicacoes(publicacoes.data.slice(0, newItemsPerPage));
        }
        getDataAnimais();
    }, [])

    const handlePrev = () => {
        const newNextElement = Math.max(nextElement - itemsPerPage, 0);
        setNextElement(newNextElement);
        setPublicacoes(dataPublicacoes.slice(newNextElement, newNextElement + itemsPerPage));
    };

    const handleNext = () => {
        if(publicacoes.length <= itemsPerPage) {
            return;
        }
        const newNextElement = Math.min(nextElement + itemsPerPage, dataAnimais.length - itemsPerPage);
        setNextElement(newNextElement);
        setPublicacoes(dataPublicacoes.slice(newNextElement, newNextElement + itemsPerPage));
    };

    useEffect(() => {
        const newItemsPerPage = lg ? 3 : md ? 2 : sm ? 1 : 4;
        setItemsPerPage(newItemsPerPage);
        setNextElement(0);
        setPublicacoes(dataPublicacoes.slice(0, newItemsPerPage));
    }, [sm, md, lg]);

    let theme = createTheme({
        typography: {
            h1: {
                color: '#301F3E',
                fontSize: '2em',
                fontWeight: '900',
                letterSpacing: -1,
            },
            h2: {
                color: '#301F3E',
                fontSize: '1.2em',
            },
        },
    });

    theme = responsiveFontSizes(theme);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                flexGrow: 1, p: 2, marginX: 'auto'
            }}>
                {publicacoes.length > 0 && (
                    <>
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: { xs: '1em', md: '1.5em' },
                                width: { sx: '100vw', sm: 'calc(100vw-50px)', md: '85%' },
                                marginX: 'auto',
                                fontFamily: 'Kumbh Sans, Roboto, sans-serif',
                                textWrap: 'nowrap',
                            }}>
                            SUAS PUBLICAÇÕES
                        </Typography>
                        <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginY: '20px', width: { sx: '100%', md: '85%', lg: '85%' }, marginX: 'auto' }}>
                            {/* Seta para voltar */}
                            <ArrowBackIosNewIcon
                                onClick={handlePrev}
                                sx={{ height: '100%', color: '#170d1f', cursor: 'pointer', backgroundColor: '#efefef', borderRadius: '200px', padding: '5px' }}
                            />
                            {/* Publicações do usuário */}
                            {publicacoes.map((value, index) => (
                                <Box item sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }} width="250px" key={index}>
                                    <AnimalCard descricao={value} onClick={() => navigate(`/animal/${value._id}`, { state: { loggedOut: false } })} />
                                </Box>
                            ))}
                            {/* Seta para avançar */}
                            <ArrowForwardIosIcon
                                onClick={handleNext}
                                sx={{ height: '100%', color: '#170d1f', cursor: 'pointer', backgroundColor: '#efefef', borderRadius: '200px', padding: '5px' }}
                            />
                        </Box>
                    </>)}
                <Box sx={{ display: 'flex', maxWidth: { xs: '100%', md: '85%' }, marginX: 'auto', marginY: '30px' }}>
                    <Stack spacing={2} sx={{
                        width: '100%', margin: 'auto'
                    }}>
                        <Autocomplete
                            id="free-solo-demo"
                            freeSolo
                            options={[...new Set([...dataAnimais.map((descricao) => descricao.nome), ...dataAnimais.map((descricao) => descricao.raca), ...dataAnimais.map((descricao) => descricao.local)])]}
                            renderInput={(params) => (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: sm ? 'column' : 'row',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                    }}
                                >
                                    <Typography
                                        variant="h1"
                                        sx={{
                                            fontSize: { xs: '1em', md: '1.5em' },
                                            fontFamily: 'Kumbh Sans, Roboto, sans-serif',
                                            textWrap: 'nowrap',
                                            marginBottom: '10px',
                                            width: '50%'
                                        }}>
                                        ANIMAIS DISPONÍVEIS PARA ADOÇÃO
                                    </Typography>
                                </Box>
                            )}
                        />
                    </Stack>
                </Box>
                <Grid2 container spacing={3} justifyContent={sm ? 'center' : "space-between"} alignItems="center" sx={{ width: { xs: '100%', md: '85%' }, marginX: 'auto' }}>
                    {dataAnimais.map((value, index) => {
                        return (
                            <Box sx={{ width: { sx: '100%', sm: '40%', md: '250px', lg: '20%' }, justifyContent: 'center' }} key={index}>
                                <AnimalCard descricao={value} onClick={() => navigate(`/animal/${value._id}`, { state: { loggedOut: false } })} width="100%" />
                            </Box>
                        )
                    })}
                </Grid2>
            </Box>
        </ThemeProvider >
    );
}

export default Home;
