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

const Home = () => {
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
    const publicacoes = data.slice(0 + nextElement, 4 + nextElement);
    const [showSearch, setShowSearch] = useState(false);
    const [alignment, setAlignment] = React.useState('sem filtro');
    const navigate = useNavigate();

    const showLoginModal = () => {
        return (<LoginModal />)
    }

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

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
    useEffect(() => {
        console.log(showSearch)
    }, [showSearch])
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1, p: 2, marginX: { xs: 0, md: 5 }, maxWidth: '100%', overflow: 'hidden' }}>
                <Grid2 container spacing={2} paddingX={10} paddingY={2}>
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: '1em', md: '1.5em' },
                            fontFamily: 'Kumbh Sans, Roboto, sans-serif',
                            textWrap: 'nowrap',
                            marginRight: '3%'
                        }}>
                        SUAS PUBLICAÇÕES
                    </Typography>
                </Grid2>
                <Grid2 container paddingX={4} paddingY={2} spacing={0} justifyContent="space-between" alignItems="center" overflow={'inherit'}>
                    {publicacoes && (
                        <ArrowBackIosNewIcon onClick={() => setNextElement(prevs => (prevs - 1 < 0) ? prevs : prevs - 1)} sx={{ height: '100%', color: '#170d1f', width: '5%' }} />
                    )}
                    {
                        data.slice(0 + nextElement, 3 + nextElement).map((value, index) => {
                            return (
                                <Box item sx={{ display: 'flex', flexDirection: 'row' }} width="250px" key={index}>
                                    <AnimalCard descricao={value} onClick={showLoginModal} />
                                </Box>
                            )
                        })
                    }
                    {publicacoes && (
                        <ArrowForwardIosIcon onClick={() => setNextElement(prevs => (prevs + 1 >= data.length - 3) ? prevs : prevs + 1)} sx={{ height: '100%', color: '#170d1f', width: '5%' }} />
                    )}
                </Grid2>
                <Grid2 item xs={12} display="flex" justifyContent="flex-end" paddingX={10} paddingY={6}>
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
                                        flexDirection: { xs: showSearch ? 'column' : 'row', sm: showSearch ? 'column' : 'row', md: 'row' },
                                        width: '100%',
                                    }}
                                >
                                    <Typography
                                        variant="h1"
                                        sx={{
                                            fontSize: { xs: '1em', md: '1.5em' },
                                            fontFamily: 'Kumbh Sans, Roboto, sans-serif',
                                            textWrap: 'nowrap',
                                            marginRight: '3%'
                                        }}>
                                        ANIMAIS DISPONÍVEIS PARA ADOÇÃO
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'flex-end',
                                            justifyContent: 'flex-end',
                                            width: '100%',
                                            marginRight: 1
                                        }}
                                    >
                                        <SearchIcon
                                            onClick={() => setShowSearch(!showSearch)}
                                            sx={{ marginRight: 1 }}
                                            fontSize="large"
                                        />
                                        <TextField
                                            {...params}
                                            placeholder="Raça, nome ou localidade"
                                            sx={{
                                                display: showSearch ? 'block' : 'none',
                                                '& .MuiInputBase-root': {
                                                    height: { xs: '25px', sm: '20px', md: '35px' },
                                                    marginRight: '1px'
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
                            )}
                        />
                    </Stack>
                </Grid2>
                <Grid2 container spacing={2} justifyContent="center" alignItems="center">
                    {data.map((value, index) => {
                        return (
                            <Grid2 item xs={12} sm={3} md={3} width="250px" key={index}>
                                <AnimalCard descricao={value} onClick={showLoginModal} width="100%" />
                            </Grid2>
                        )
                    })}
                </Grid2>
            </Box>
        </ThemeProvider >
    );
}

export default Home;
