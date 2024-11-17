import React, { useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { useParams } from "react-router-dom";
import { Divider } from "@mui/material";
import { getAnimal } from "../../services/animalService";

const AnimalDetails = () => {
    const { id } = useParams();
    const [nome, setNome] = useState('')
    const [endereco, setEndereco] = useState('')
    const [raca, setRaca] = useState('');
    const [sexo, setSexo] = useState('');
    const [vacinado, setVacinado] = useState('');
    const [peso, setPeso] = useState('');
    const [idade, setIdade] = useState('');
    const [adotado, setAdotado] = useState('');
    const [nomeResponsavel, setNomeResponsavel] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');

    useEffect(() => {
        const getData = async () => {
            const response = await getAnimal(id);
            console.log(response);
        }
        getData()
    }, [id])
    
    return (
        <Card sx={{ display: 'flex', width: '100wv' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                    variant="h4"
                    component="div"
                    sx={{ color: 'text.secondary' }}
                >
                    {nome}
                </Typography>
                <CardMedia
                    component="img"
                    sx={{ width: '30%' }}
                    image="/static/images/cards/live-from-space.jpg"
                    alt="Live from space album cover"
                />
                <CardContent ent sx={{ flex: '1 0 auto' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box>
                            <Typography
                                variant="h4"
                                component="div"
                                sx={{ color: 'text.secondary' }}
                            >
                                Informações do animal
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component="div"
                                sx={{ color: 'text.secondary' }}
                            >
                                Raça: {raca}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component="div"
                                sx={{ color: 'text.secondary' }}
                            >
                                Sexo: {sexo}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component="div"
                                sx={{ color: 'text.secondary' }}
                            >
                                Local: {endereco.cidade}, {endereco.estado}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component="div"
                                sx={{ color: 'text.secondary' }}
                            >
                                Peso: {peso}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component="div"
                                sx={{ color: 'text.secondary' }}
                            >
                                Idade: {idade}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component="div"
                                sx={{ color: 'text.secondary' }}
                            >
                                Vacinado: {vacinado}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component="div"
                                sx={{ color: 'text.secondary' }}
                            >
                                Adotado: {adotado}
                            </Typography>
                        </Box>
                        <Divider />
                        <Box>
                            <Typography
                                variant="h4"
                                component="div"
                                sx={{ color: 'text.secondary' }}
                            >
                                Informações do responsável
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component="div"
                                sx={{ color: 'text.secondary' }}
                            >
                                Nome do responsável: {nomeResponsavel}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component="div"
                                sx={{ color: 'text.secondary' }}
                            >
                                Telefone: {telefone}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                component="div"
                                sx={{ color: 'text.secondary' }}
                            >
                                E-mail: {email}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Box>
        </Card>
    );


}

export default AnimalDetails;