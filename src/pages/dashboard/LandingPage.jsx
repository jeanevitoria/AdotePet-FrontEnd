import * as React from 'react';
import AnimalCard from '../../components/AnimalCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useWindowSize from '../../hooks/useWindowSize';

const LandingPage = () => {
    const descricao = { nome: 'Noel', raca: 'Vira-lata', sexo: 'Fêmea', local: 'Recife, Pernambuco' };
    const data = Array(12).fill(descricao); // Apenas uma maneira de criar o array de dados
    const [showSearch, setShowSearch] = useState(false);
    const [alignment, setAlignment] = React.useState('sem filtro');
    const { sm, md, lg } = useWindowSize();

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
            <Box sx={{ flexGrow: 1, p: 2, marginX: { xs: 0, md: 5 }, width:'85%', justifySelf:'center', overflow: 'hidden' }}>
                <Grid container spacing={2} justifyContent="center" alignItems="center" textAlign="center">
                    <Grid item xs={12}>
                        <Typography gutterBottom variant="h1" component="div" sx={{ fontFamily: 'Kumbh Sans, Roboto, sans-serif' }}>
                            ANIMAIS DISPONÍVEIS PARA ADOÇÃO
                        </Typography>
                    </Grid>
                    <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                        <Box sx={{ width: { xs: '90%', sm: '80%', md: '70%', lg: '60%' } }}>
                            <Typography variant="h2" sx={{ fontSize: { xs: '1em', md: '1.2em' }, fontFamily: 'Kumbh Sans, Roboto, sans-serif' }}>
                                Cada animal que espera por você carrega uma história. Venha escrever um novo capítulo juntos e experimente a felicidade de um amor incondicional.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="flex-end" paddingY={6}>
                    <Stack spacing={2} sx={{
                        width: { xs: '100%', sm: '50%' }
                    }}>
                        <Autocomplete
                            id="free-solo-demo"
                            freeSolo
                            options={[...new Set([...data.map((descricao) => descricao.nome), ...data.map((descricao) => descricao.raca), ...data.map((descricao) => descricao.local)])]}
                            renderInput={(params) => (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-end',
                                        gap: { xs: '5px', md: '10px' },
                                        justifySelf: 'flex-end',
                                        width: { xs: '100%', md: '80%' },
                                        margin:'auto'
                                    }}
                                >
                                    <Box sx={{ display: 'flex', flexDirection: 'row', width: sm ? '100%' : '60%'}}>
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
                                        size='small'
                                        aria-label="Small sizes"
                                    >
                                        <ToggleButton sx={{ fontSize: { xs: '0.55rem', sm: '0.7rem', md: '0.75rem' } }} value="gatos">Gatos</ToggleButton>
                                        <ToggleButton sx={{ fontSize: { xs: '0.55rem', sm: '0.7rem', md: '0.75rem' } }} value="cachorros">Cachorros</ToggleButton>
                                    </ToggleButtonGroup>
                                </Box>
                            )}
                        />
                    </Stack>
                </Grid>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    {data.map((value, index) => (
                        <Grid item xs={12} sm={3} md={3} width="250px" key={index}>
                            <AnimalCard descricao={value} onClick={showLoginModal} width="100%" />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </ThemeProvider>
    );
}

export default LandingPage;
