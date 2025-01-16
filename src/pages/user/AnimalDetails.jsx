import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { getResponsavelService } from "../../services/userService";
import Typography from '@mui/material/Typography';
import { compararUsers } from "../../services/userService";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ChatIcon from '@mui/icons-material/Chat';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useParams } from "react-router-dom";
import { Divider, Grid2, Paper } from "@mui/material";
import { definirAdocao, getAnimal } from "../../services/animalService";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from '@mui/material';
import AlertConfirmation from "../../components/AlertConfirmation";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ChatDialog from "../../components/ChatDialog";
import { useLocation } from "react-router-dom";

const AnimalDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const { loggedOut } = location.state || {};
    const [nome, setNome] = useState('')
    const [responsavel, setResponsavel] = useState(false);
    const [foto, setFoto] = useState('');
    const [endereco, setEndereco] = useState('')
    const [raca, setRaca] = useState('');
    const [sexo, setSexo] = useState('');
    const [vacinado, setVacinado] = useState('');
    const [peso, setPeso] = useState('');
    const [idade, setIdade] = useState('');
    const [adotado, setAdotado] = useState('');
    const [responsavelData, setResponsavelData] = useState([]);
    const [nomeResponsavel, setNomeResponsavel] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [idResponsavel, setIdResponsavel] = useState('');
    const [descricao, setDescricao] = useState('');
    const [alert, setAlert] = useState({ open: false, success: false, message: '' });
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);

    const handleAdocao = async () => {
        const response = await definirAdocao(id, !adotado);
        if (response.status == 200) {
            setAdotado(prev => !prev);
            setAlert({ open: true, success: true, message: 'Adoção atualizada com sucesso.' });
        } else {
            setAlert({ open: true, success: false, message: 'Falha na atualização do status de adoção.' })
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert({ open: false, success: false, message: '' });
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await getAnimal(id);
                const data = response.data;
                setNome(data.nome);
                setEndereco(data.localizacaoObject);
                setRaca(data.raca);
                setSexo(data.sexo);
                setVacinado(data.vacinado);
                setPeso(data.peso);
                setIdade(data.idade);
                setAdotado(data.adotado);
                setIdResponsavel(data.user_id)
                setDescricao(data.descricao);
                setFoto(data.foto.toString('base64'));
                console.log(data)
            } catch (err) {
                console.log(err)
            }
        }

        getData()
    }, [])

    useEffect(() => {
        if (!idResponsavel) return;

        const getResponsavel = async () => {
            const response = await getResponsavelService(idResponsavel);
            console.log(response)
            setResponsavelData(response.data[0]);
            setNomeResponsavel(response.data[0].nome)
            setEmail(response.data[0].email);
            setTelefone('(' + response.data[0].celular.slice(0, 2) + ')' + response.data[0].celular.slice(2, 7) + '-' + response.data[0].celular.slice(7));
        }


        const idsMatch = async () => {
            const response = await compararUsers(idResponsavel);
            const { idsMatch } = response.data
            setResponsavel(idsMatch);
        }

        getResponsavel()

        if (loggedOut) {
            return;
        }

        idsMatch();
    }, [idResponsavel])

    const handleChat = () => {
        if (loggedOut) {
            setAlertVisible(true)
        } else {
            navigate('/chat', { state: { responsavelData } })
        }
    }

    return (
        <Grid2 sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, height: 'screen', justifyContent: 'space-between' }}>
            {deleteDialog && (<Box sx={{ position: 'fixed', zIndex: 1000, justifySelf: 'center', marginTop: '50%', width: '100%', display: alert.type != 'none' ? 'flex' : 'none' }}>
                {< AlertConfirmation alertVisible={deleteDialog} setAlertVisible={setDeleteDialog} idAnimal={id} />}
            </Box>
            )}
            {alertVisible && (<Box sx={{ position: 'fixed', zIndex: 1000, justifySelf: 'center', marginTop: '50%', width: '100%', display: alert.type != 'none' ? 'flex' : 'none' }}>
                {< ChatDialog alertVisible={alertVisible} setAlertVisible={setAlertVisible} />}
            </Box>
            )}
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={alert.open} autoHideDuration={6000} onClose={handleClose} sx={{ display: 'flex', position: 'fixed' }}>
                <Alert severity={alert.success ? 'success' : 'error'} onClose={handleClose} sx={{ width: '100%' }} >
                    {alert.message}
                </Alert>
            </Snackbar>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: { xs: '80%', md: '60%' },
                    marginX: 'auto'
                }}>
                {loggedOut &&
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        width: { xs: '35%', sm: '10%' },
                        position: 'relative',
                        marginTop: '20px',
                        borderRadius: '150px',
                        alignItems: 'center',
                        backgroundColor: '#e8e5e5',
                        cursor: 'pointer'
                    }}
                        onClick={() => navigate('/')}
                    >
                        <ArrowBackIosNewIcon
                            sx={{ height: { xs: '15px', sm: '70%' }, color: '#170d1' }}
                        />
                        <Typography sx={{
                            textAlign: 'center',
                            flex: 1,
                        }}>Voltar</Typography>
                    </Box>}
                <Typography
                    sx={{
                        fontSize: { xs: '20px', md: '32px' },
                        fontWeight: '500', color: '#170D1F',
                        marginTop: { xs: '5%', md: 'auto' },
                    }}>
                    {nome}
                </Typography>
                <Divider orientation={"horizontal"} sx={{ marginY: { xs: '5%', md: '0%' } }} />
                <Box
                    sx={{
                        width: '100%',
                        aspectRatio: { xs: '2/1', md: '3/1' },
                        marginY: { xs: '5%', md: '2.5%' },
                        overflow: 'hidden',
                        boxShadow: 3,
                        '&:hover': {
                            boxShadow: 5,
                        },
                        borderRadius: '5px'
                    }}
                >
                    <Box
                        component={'img'}
                        src={`data:image/jpeg;base64,${foto}`}
                        sx={{
                            width: '100%',
                            height: '100%',
                            marginY: 'auto',
                            backgroundColor: '#f2f2f2',
                            objectFit: 'contain',
                        }}
                    />
                </Box>
                <Typography
                    sx={{
                        marginY: 'auto',
                        fontSize: { xs: '14px', md: '16px' }
                    }}>
                    {descricao}
                </Typography>
            </Box>
            <Divider variant="middle" orientation={{ xs: "horizontal", md: "vertical" }} sx={{ marginY: { xs: '5%', md: '0%' } }} />
            <Box sx={{ display: 'flex', backgroundColor: { xs: '#ffffff', md: '#eceaef' }, flexDirection: 'column', width: { xs: '100%', md: '25%' }, height: 'auto' }}>
                {!responsavel && <Paper
                    onClick={handleChat}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        '&:hover': {
                            backgroundColor: '#3a204f',
                            border: 'none',
                            color: '#ffffff',
                            boxShadow: 4,
                            '& .chat-icon': {
                                color: '#ffffff'
                            }
                        },
                        borderRadius: '40px',
                        boxShadow: 2,
                        justifyContent: 'center',
                        padding: '2%',
                        marginLeft: '5%',
                        marginRight: { xs: '5%', md: '10%' },
                        marginTop: '2.5%',
                        cursor: 'pointer'
                    }}
                >
                    <ChatIcon className="chat-icon" sx={{ marginRight: '8px', color: '#170D1F' }} />
                    Chat
                </Paper>}
                {responsavel && (
                    <Box>
                        <Paper
                            onClick={handleAdocao}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: '#3a204f',
                                    border: 'none',
                                    color: '#ffffff',
                                    boxShadow: 4,
                                    '& .check-outlined-icon': {
                                        color: '#ffffff'
                                    },
                                    '& .checked-outlined-icon': {
                                        color: '#ffffff'
                                    }
                                },
                                borderRadius: '40px',
                                boxShadow: 2,
                                justifyContent: 'center',
                                padding: '2%',
                                marginLeft: '5%',
                                marginRight: { xs: '5%', md: '10%' },
                                marginY: '2.5%',
                            }}
                        >
                            {adotado ? (<CheckCircleIcon className="checked-outlined-icon" sx={{ marginRight: '8px', color: '#170D1F' }} />)
                                : (<CheckCircleOutlineIcon className="check-outlined-icon" sx={{ marginRight: '8px', color: '#170D1F' }} />)}
                            {adotado ? 'Adotado' : 'Marcar como adotado'}
                        </Paper>
                        <Paper
                            onClick={() => setDeleteDialog(true)}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: '#3a204f',
                                    border: 'none',
                                    color: '#ffffff',
                                    boxShadow: 4,
                                    '& .check-outlined-icon': {
                                        color: '#ffffff'
                                    },
                                    '& .checked-outlined-icon': {
                                        color: '#ffffff'
                                    },
                                    '& .delete-icon': {
                                        color: '#ffffff'
                                    }
                                },
                                borderRadius: '40px',
                                boxShadow: 2,
                                justifyContent: 'center',
                                padding: '2%',
                                marginLeft: '5%',
                                marginRight: { xs: '5%', md: '10%' },
                                marginY: '2.5%',
                            }}
                        >
                            <DeleteOutlineIcon className="delete-icon" sx={{ marginRight: '8px', color: '#170D1F' }} />
                            Excluir publicação
                        </Paper>
                    </Box>)}
                <Card sx={{ padding: '5%', marginLeft: '5%', marginRight: { xs: '5%', md: '10%' }, marginY: '2.5%', '&: hover': { boxShadow: 4 } }}>
                    <Typography variant="h6">
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
                <Card sx={{ padding: '5%', marginLeft: '5%', marginRight: { xs: '5%', md: '10%' }, marginY: '2.5%', '&: hover': { boxShadow: 4 } }}>
                    <Typography variant="h6">
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
            </Box>
        </Grid2 >
    );


}

export default AnimalDetails;