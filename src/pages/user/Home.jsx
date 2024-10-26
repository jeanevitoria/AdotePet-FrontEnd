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

const Home = () => {
    const { sm, md, lg } = useWindowSize();

    const data = [
        { nome: 'Noel', raca: 'Vira-lata', sexo: 'Fêmea', local: 'Recife, Pernambuco' },
        { nome: 'Rex', raca: 'Labrador', sexo: 'Macho', local: 'São Paulo, São Paulo' },
        { nome: 'Luna', raca: 'Golden Retriever', sexo: 'Fêmea', local: 'Curitiba, Paraná' },
        { nome: 'Thor', raca: 'Pastor Alemão', sexo: 'Macho', local: 'Porto Alegre, Rio Grande do Sul' },
        { nome: 'Mia', raca: 'Poodle', sexo: 'Fêmea', local: 'Salvador, Bahia' },
        { nome: 'Bolt', raca: 'Husky Siberiano', sexo: 'Macho', local: 'Rio de Janeiro, Rio de Janeiro' },
        { nome: 'Bella', raca: 'Beagle', sexo: 'Fêmea', local: 'Belo Horizonte, Minas Gerais' },
        { nome: 'Max', raca: 'Dachshund', sexo: 'Macho', local: 'Fortaleza, Ceará' },
        { nome: 'Zara', raca: 'Bulldog', sexo: 'Fêmea', local: 'Manaus, Amazonas' },
        { nome: 'Simba', raca: 'Chow Chow', sexo: 'Macho', local: 'Florianópolis, Santa Catarina' },
        { nome: 'Nina', raca: 'Shih Tzu', sexo: 'Fêmea', local: 'Vitória, Espírito Santo' },
        { nome: 'Apollo', raca: 'Pit Bull', sexo: 'Macho', local: 'Brasília, Distrito Federal' },
        { nome: 'Lola', raca: 'Basset Hound', sexo: 'Fêmea', local: 'Natal, Rio Grande do Norte' },
        { nome: 'Zeus', raca: 'Rottweiler', sexo: 'Macho', local: 'Goiânia, Goiás' },
        { nome: 'Daisy', raca: 'Cocker Spaniel', sexo: 'Fêmea', local: 'Campinas, São Paulo' },
        { nome: 'Lucky', raca: 'Border Collie', sexo: 'Macho', local: 'Maceió, Alagoas' },
        { nome: 'Chanel', raca: 'Yorkshire Terrier', sexo: 'Fêmea', local: 'Belém, Pará' },
        { nome: 'Oscar', raca: 'Boxer', sexo: 'Macho', local: 'João Pessoa, Paraíba' },
        { nome: 'Maggie', raca: 'Maltês', sexo: 'Fêmea', local: 'São Luís, Maranhão' },
        { nome: 'Toby', raca: 'Jack Russell', sexo: 'Macho', local: 'Campo Grande, Mato Grosso do Sul' },
        { nome: 'Lulu', raca: 'Spitz Alemão', sexo: 'Fêmea', local: 'Teresina, Piauí' },
        { nome: 'Charlie', raca: 'Cavalier King Charles', sexo: 'Macho', local: 'Aracaju, Sergipe' },
        { nome: 'Kira', raca: 'Bulldog Francês', sexo: 'Fêmea', local: 'Palmas, Tocantins' },
        { nome: 'Rocky', raca: 'Doberman', sexo: 'Macho', local: 'Cuiabá, Mato Grosso' },
        { nome: 'Bobby', raca: 'Akita', sexo: 'Macho', local: 'Macapá, Amapá' }
    ];

    const [nextElement, setNextElement] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(lg ? 3 : md ? 2 : sm ? 1 : 4);
    const [publicacoes, setPublicacoes] = useState(data.slice(0, itemsPerPage));
    const [alignment, setAlignment] = useState('sem filtro');
    const navigate = useNavigate();

    const showLoginModal = () => {
        return (<LoginModal />)
    }

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const handlePrev = () => {
        const newNextElement = Math.max(nextElement - itemsPerPage, 0);
        setNextElement(newNextElement);
        setPublicacoes(data.slice(newNextElement, newNextElement + itemsPerPage));
    };

    const handleNext = () => {
        const newNextElement = Math.min(nextElement + itemsPerPage, data.length - itemsPerPage);
        setNextElement(newNextElement);
        setPublicacoes(data.slice(newNextElement, newNextElement + itemsPerPage));
    };

    useEffect(() => {
        const newItemsPerPage = lg ? 3 : md ? 2 : sm ? 1 : 4;
        setItemsPerPage(newItemsPerPage);
        setNextElement(0);
        setPublicacoes(data.slice(0, newItemsPerPage));
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
            <Box sx={{ flexGrow: 1, p: 2, marginX: 'auto', maxWidth: '100%' }}>
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: { xs: '1em', md: '1.5em' },
                        maxWidth: '85%',
                        marginX: 'auto',
                        fontFamily: 'Kumbh Sans, Roboto, sans-serif',
                        textWrap: 'nowrap',
                    }}>
                    SUAS PUBLICAÇÕES
                </Typography>
                <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginY: '20px', width: { sx: '100%', md: '85%' }, marginX: 'auto' }}>
                    {/* Seta para voltar */}
                    <ArrowBackIosNewIcon
                        onClick={handlePrev}
                        sx={{ height: '100%', color: '#170d1', cursor: 'pointer' }}
                    />
                    {/* Publicações do usuário */}
                    {publicacoes.map((value, index) => (
                        <Box item sx={{ display: 'flex', flexDirection: 'row' }} width="250px" key={index}>
                            <AnimalCard descricao={value} onClick={showLoginModal} />
                        </Box>
                    ))}
                    {/* Seta para avançar */}
                    <ArrowForwardIosIcon
                        onClick={handleNext}
                        sx={{ height: '100%', color: '#170d1f', cursor: 'pointer' }}
                    />
                </Box>
                <Box sx={{ display: 'flex', maxWidth: { xs: '100%', md: '85%' }, marginX: 'auto', marginY: '30px' }}>
                    <Stack spacing={2} sx={{
                        width: '100%', margin: 'auto'
                    }}>
                        <Autocomplete
                            id="free-solo-demo"
                            freeSolo
                            options={[...new Set([...data.map((descricao) => descricao.nome), ...data.map((descricao) => descricao.raca), ...data.map((descricao) => descricao.local)])]}
                            renderInput={(params) => (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: sm ? 'column' : 'row',
                                        justifyContent:'space-between',
                                        width: '100%',
                                    }}
                                >
                                    <Typography
                                        variant="h1"
                                        sx={{
                                            fontSize: { xs: '1em', md: '1.5em' },
                                            fontFamily: 'Kumbh Sans, Roboto, sans-serif',
                                            textWrap: 'nowrap',
                                            marginBottom:'10px',
                                            width: '50%'
                                        }}>
                                        ANIMAIS DISPONÍVEIS PARA ADOÇÃO
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'flex-end',
                                            gap:{xs:'5px', md:'10px'},
                                            justifyContent: 'flex-end',
                                            width: {xs:'100%', md:'30%'},
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', flexDirection: 'row', width: "100%" }}>
                                            <SearchIcon
                                                sx={{ marginRight: 1 }}
                                                fontSize='medium'
                                                />
                                            <TextField
                                                {...params}
                                                placeholder="Raça, nome ou localidade"
                                                sx={{
                                                    display: 'block',
                                                    '& .MuiInputBase-root': {
                                                        height: { xs: '25px', sm: '20px', md: '35px' },
                                                        marginRight: '1px',
                                                    },
                                                    '& input::placeholder': {
                                                        fontSize: { xs: '0.7rem', sm: '0.85rem', md: '1rem' }, // Define o tamanho do placeholder para xs, sm, e md
                                                        marginBottom: '20px',
                                                    }
                                                }}
                                            />
                                        </Box>
                                        <ToggleButtonGroup
                                            color="primary"
                                            value={alignment}
                                            exclusive
                                            onChange={handleChange}
                                            size="small"
                                            aria-label="Small sizes"
                                        >
                                            <ToggleButton sx={{ fontSize: { xs: '0.55rem', sm: '0.7rem', md: '0.75rem' } }} value="gatos">Gatos</ToggleButton>
                                            <ToggleButton sx={{ fontSize: { xs: '0.55rem', sm: '0.7rem', md: '0.75rem' } }} value="cachorros">Cachorros</ToggleButton>
                                        </ToggleButtonGroup>
                                    </Box>
                                </Box>
                            )}
                        />
                    </Stack>
                </Box>
                <Grid2 container spacing={3} justifyContent={sm ? 'center' : "space-between"} alignItems="center" sx={{ width: { sx: '100%', md: '85%' }, marginX: 'auto' }}>
                    {data.map((value, index) => {
                        return (
                            <Box sx={{ width: { sm: '100%', md: '250px' } }} key={index}>
                                <AnimalCard descricao={value} onClick={showLoginModal} width="100%" />
                            </Box>
                        )
                    })}
                </Grid2>
            </Box>
        </ThemeProvider >
    );
}

export default Home;
