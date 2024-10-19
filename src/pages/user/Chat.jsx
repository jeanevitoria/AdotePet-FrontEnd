import React, { useState, useEffect } from "react";
import { Box, Stack, TextField, Avatar } from "@mui/material";
import ChatCard from "../../components/ChatCard";
import Typography from "@mui/material/Typography";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [message, setMessage] = useState('');
    const chatsData = [
        { nome: "Alice", mensagem: "Oi, tudo bem?" },
        { nome: "Bob", mensagem: "Você viu o que aconteceu ontem?" },
        { nome: "Carol", mensagem: "Vamos nos encontrar mais tarde?" },
        { nome: "David", mensagem: "Estou com saudades!" },
        { nome: "Eva", mensagem: "Como está o projeto?" },
        { nome: "Frank", mensagem: "Podemos conversar sobre a reunião?" },
        { nome: "Grace", mensagem: "Você assistiu o último episódio da série?" },
        { nome: "Hannah", mensagem: "Quero saber mais sobre o evento." },
        { nome: "Ian", mensagem: "Estou disponível para discutir isso." },
        { nome: "Julia", mensagem: "Posso ajudar com suas tarefas." },
        { nome: "Kevin", mensagem: "Tem novidades sobre o trabalho?" },
        { nome: "Laura", mensagem: "Vamos almoçar juntos?" },
        { nome: "Mike", mensagem: "Você recebeu meu e-mail?" },
        { nome: "Nina", mensagem: "Que dia cansativo, né?" },
        { nome: "Oliver", mensagem: "Ainda está trabalhando no relatório?" },
        { nome: "Paula", mensagem: "Como foi seu fim de semana?" },
        { nome: "Quentin", mensagem: "Vamos planejar a viagem?" },
        { nome: "Rachel", mensagem: "Estou organizando o evento." },
        { nome: "Steve", mensagem: "A reunião foi cancelada." },
        { nome: "Tina", mensagem: "Acho que precisamos nos reunir." },
        { nome: "Ursula", mensagem: "Você viu o novo aplicativo?" },
        { nome: "Victor", mensagem: "Estou estudando para a prova." },
        { nome: "Wendy", mensagem: "Qual é o seu próximo projeto?" },
        { nome: "Xander", mensagem: "Vamos jogar algo mais tarde?" },
        { nome: "Yara", mensagem: "Como está sua família?" },
        { nome: "Zach", mensagem: "Preciso de sua ajuda com um trabalho." },
    ];
    const [mensagensChat, setMensagensChat] = useState([
        { recebido: true, message: 'Tudo bem?' },
        { recebido: false, message: 'Sim, tudo. E você, como está indo o seu dia?' },
        { recebido: true, message: 'Estou bem, só um pouco cansado do trabalho.' },
        { recebido: false, message: 'Entendo, o dia foi puxado aqui também. Muitas reuniões e prazos.' },
        { recebido: true, message: 'Espero que amanhã seja mais tranquilo. Conseguiu finalizar aquele relatório que você mencionou semana passada?' },
        { recebido: false, message: 'Ah sim, finalmente consegui! Foi um desafio, mas deu tudo certo no final. Obrigado por perguntar!' },
        { recebido: true, message: 'Que bom! Fico feliz em saber.' },
        { recebido: true, message: 'Aliás, você viu o jogo ontem? Foi incrível!' },
        { recebido: false, message: 'Vi sim! Não esperava aquela virada no final. Achei que estava tudo perdido.' },
        { recebido: true, message: 'Eu também! O último gol foi espetacular, parecia impossível.' },
        { recebido: false, message: 'Sim! Agora é torcer para manterem esse ritmo nas próximas partidas.' },
        { recebido: true, message: 'Com certeza! Vai ser emocionante acompanhar.' },
        { recebido: true, message: 'Por falar nisso, você vai no evento de sexta-feira?' },
        { recebido: false, message: 'Vou sim, estou animado! Parece que vai ser bem interessante.' },
        { recebido: true, message: 'Também estou! Vamos nos encontrar lá, então.' },
        { recebido: false, message: 'Combinado!' },
        { recebido: false, message: 'Se precisar de alguma coisa antes do evento, me avise.' },
        { recebido: true, message: 'Pode deixar! Obrigado. Nos falamos mais tarde!' },
        { recebido: false, message: 'De nada! Até logo!' }
    ]);
    const navigate = useNavigate();

    // Desativa o scroll do body quando o componente é montado
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        // Limpa a configuração quando o componente é desmontado
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleSendMessage = () => {
        mensagensChat.push({ recebido: false, message: message })
        setMessage('');
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: 'calc(100vh - 50px)'
        }}>
            {/* Sidebar do chat */}
            <Stack spacing={2} sx={{
                width: '30%',
                backgroundColor: 'rgba(191, 169, 212, 0.15)',
                justifyContent: 'flex-start',
                alignItems: 'center',
                borderRight: '#c5c2c7 solid 1px',
                paddingTop: '1%',
                overflowY: 'auto',
                paddingBottom: '1%'
            }}>
                <Box sx={{ color: '#301F3E', justifyContent: 'flex-start', width: '100%', display: 'flex' }}>
                    <ArrowBackIosNewIcon onClick={() => navigate('/')} sx={{ cursor: 'pointer', marginLeft: '5%' }} />
                </Box>
                <Typography variant="body1" sx={{
                    fontSize: { xs: '20px', md: '20px', lg: '30px', xl: '60px' },
                    fontWeight: '900',
                    color: '#301F3E',
                    marginBottom: '2.5%',
                    width: '88%',
                    fontFamily: 'Kumbh Sans, Roboto, sans-serif'
                }}>
                    CHAT
                </Typography>
                {chatsData.map((item, index) => (
                    <ChatCard
                        key={index}
                        nome={item.nome}
                        mensagem={item.mensagem}
                        selected={selectedIndex === index}
                        onClick={() => setSelectedIndex(index)}
                    />
                ))}
            </Stack>

            {/* Container das mensagens do chat */}
            <Box sx={{
                width: '70%',
                display: 'flex',
                flexDirection: 'column',
                padding: '2%',
                flexGrow: 1,
                overflowY: 'auto',
                paddingBottom: '1%'
            }}>
                <Box sx={{ width: '100%', paddingY: '1%', marginBottom: '2%', borderBottom: '#c5c2c7 solid 1px' }}>
                    <Stack direction="row" spacing={2}>
                        <Avatar>
                            {chatsData.filter((_, index) => index == selectedIndex)[0].nome[0]}
                        </Avatar>
                        <Typography variant="h4" sx={{ whiteSpace: 'nowrap', overflowX: 'hidden', textOverflow: 'ellipsis', fontWeight: '600' }}>
                            {chatsData.filter((_, index) => index == selectedIndex)[0].nome}
                        </Typography>
                    </Stack>
                </Box>
                {mensagensChat.map((text, index) => (
                    <Box
                        key={index}
                        sx={{
                            backgroundColor: text.recebido ? '#ffffff' : '#6c5f76',
                            border: text.recebido ? '#c5c2c7 solid 1px' : 'none',
                            color: text.recebido ? '#000000' : '#ffffff',
                            padding: '10px',
                            borderRadius: '10px',
                            maxWidth: '50%',
                            marginBottom: '1%',
                            alignSelf: text.recebido ? 'flex-start' : 'flex-end',
                        }}
                    >
                        {text.message}
                    </Box>
                ))}
                <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }} >
                    <TextField placeholder="Digite sua mensagem" sx={{ width: '95%' }} value={message} onChange={(e) => setMessage(e.target.value)} />
                    <SendIcon sx={{ width: '5%', height: '60%' }} onClick={handleSendMessage} />
                </Box>
            </Box>
        </Box>
    );
};

export default Chat;
