import React, { useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import { getUserService } from "../../services/userService";
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { useParams } from "react-router-dom";
import { Divider, Grid2, Paper } from "@mui/material";
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
    const [idResponsavel, setIdResponsavel] = useState('');
    const [descricao, setDescricao] = useState('');

    useEffect(() => {
        const getData = async () => {
            console.log(id)
            try {
                const response = await getAnimal(id);
                const data = response.data;
                setNome(data.nome);
                setEndereco(data.localizacao);
                setRaca(data.raca);
                setSexo(data.sexo);
                setVacinado(data.vacinado);
                setPeso(data.peso);
                setIdade(data.idade);
                setAdotado(data.adotado);
                setIdResponsavel(data.user_id)
                setEmail(data.email);
                setTelefone(data.telefone);
                setDescricao(data.descricao);
            } catch (err) {
                console.log(err)
            }
        }
        const getResponsavel = async () => {
            const response = await getUserService(idResponsavel);
            setNomeResponsavel(response.data.nome)
        }
        getResponsavel()
        getData()
    }, [])

    return (
        <Grid2 sx={{display: 'flex', flexDirection: 'column'}}>
            <Box sx={{display:'flex', flexDirection: 'row'}}>
                <Card>

                </Card>
                <Typography>
                    { descricao }
                </Typography>
            </Box>
        </Grid2>
    );


}

export default AnimalDetails;