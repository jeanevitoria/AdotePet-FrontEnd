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
import AnimalCard from '../../components/AnimalCard';
import { getAnimalFilter } from "../../services/animalService";
import { useNavigate } from "react-router-dom";

const AnimalDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nome, setNome] = useState('')
    const [foto, setFoto] = useState('');
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
    const [similares, setSimilares] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await getAnimal(id);
                const data = response.data;
                console.log(data)
                setNome(data.nome);
                setEndereco(data.localizacao);
                setRaca(data.raca);
                setSexo(data.sexo);
                setVacinado(data.vacinado);
                setPeso(data.peso);
                setIdade(data.idade);
                setAdotado(data.adotado);
                setIdResponsavel(data.user_id)
                setDescricao(data.descricao);
                setFoto(data.foto.toString('base64'));
            } catch (err) {
                console.log(err)
            }
        }
        const getResponsavel = async () => {
            const response = await getUserService(idResponsavel);
            console.log(response)
            setNomeResponsavel(response.data[0].nome)
            setEmail(response.data[0].email);
            setTelefone('(' + response.data[0].celular.slice(0, 2) + ')' + response.data[0].celular.slice(2, 7) + '-' + response.data[0].celular.slice(7));
        }
        const getSimilares = async () => {
            const response = await getAnimalFilter('raca', raca);
            console.log("raça: " + raca)
            console.log(response);
            setSimilares(response.data)
        }

        getResponsavel()
        getData()
        getSimilares();
    }, [])

    return (
        <Grid2 sx={{ display: 'flex', flexDirection: 'row', height: '100%', justifyContent: 'space-around' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', height: '100%', margin: 'auto' }}>
                <Card elevation={5} sx={{ height: '25%' }}>
                    <img src={`data:image/jpeg;base64,${foto}`} />
                </Card>
                <Typography>
                    {descricao}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '20%', height: '40%', marginBottom: 'auto', marginRight: 'auto', justifyContent: 'space-evenly' }}>
                <Card sx={{ padding: '5%' }}>
                    <Typography>
                        Informações do animal
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography>
                            Raça: {raca}
                        </Typography>
                        <Typography>
                            Sexo: {sexo}
                        </Typography>
                        <Typography>
                            Local: {`${endereco.cidade}, ${endereco.estado}`}
                        </Typography>
                        <Typography>
                            Peso: {peso}
                        </Typography>
                        <Typography>
                            Idade: {idade}
                        </Typography>
                        <Typography>
                            Vacinado: {vacinado}
                        </Typography>
                        <Typography>
                            Adotado: {adotado ? 'sim' : 'não'}
                        </Typography>
                    </Box>
                </Card>
                <Card sx={{ padding: '5%' }}>
                    <Typography>
                        Informações do responsável
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography>
                            Nome: {nomeResponsavel}
                        </Typography>
                        <Typography>
                            E-mail: {email}
                        </Typography>
                        <Typography>
                            Telefone: {telefone}
                        </Typography>
                    </Box>
                </Card>
                <Card>
                    {similares && similares.map((value, index) => {
                        return (
                            <Box sx={{ width: { sx: '0%', sm: '40%', md: '250px', lg: '20%' }, justifyContent: 'center' }} key={index}>
                                <AnimalCard descricao={value} onClick={() => navigate(`/animal/${value._id}`)} width="100%" />
                            </Box>
                        )
                    })}
                </Card>
            </Box>
        </Grid2>
    );


}

export default AnimalDetails;