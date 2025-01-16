import * as React from 'react';
import AnimalCard from '../../components/AnimalCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Loading from '../../components/Loading';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAnimaisDisponiveis } from '../../services/animalService';

const LandingPage = () => {
    const [dataAnimais, setDataAnimais] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const data = () => {
            getAnimaisDisponiveis()
                .then((res) => setDataAnimais(res.data))
                .catch((err) => console.log(err))
        }

        data()
    }, [])

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
            <Box sx={{ flexGrow: 1, p: 2, marginX: { xs: 0, md: 5 }, width: '85%', justifySelf: 'center', overflow: 'hidden' }}>
                {dataAnimais.length ?
                    (<Box spacing={2} justifyContent="center" alignItems="center" textAlign="center"
                        sx={{ marginY: '20px' }}
                    >
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
                    </Box>)
                    :
                    (<Loading />)
                }
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    {dataAnimais.map((value, index) => (
                        <Grid item xs={12} sm={3} md={3} width="250px" key={index}>
                            <AnimalCard descricao={value} onClick={() => navigate(`/animal/${value._id}`, { state: { loggedOut: true } })} width="100%" />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </ThemeProvider>
    );
}

export default LandingPage;
