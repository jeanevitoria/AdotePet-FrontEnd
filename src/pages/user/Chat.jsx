import React, { useState, useEffect, useRef } from "react";
import { Box, Stack, TextField, Avatar } from "@mui/material";
import { getChats, sendMessage, getMessagesChat } from "../../services/chatService";
import ChatCard from "../../components/ChatCard";
import Typography from "@mui/material/Typography";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const Chat = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [message, setMessage] = useState('');
    const [chatsVisible, setChatsVisible] = useState(true);
    const chatContainerRef = useRef(null); // Cria a referência para o container das mensagens
    const [chatsData, setChartsData] = useState([]);
    const [mensagensChat, setMensagensChat] = useState([]);
    const socket = io.connect("https://adotepet-api.vercel.app/api/$1")

    const navigate = useNavigate();

    // Desativa o scroll do body quando o componente é montado
    useEffect(() => {
        if (window.innerWidth > 768){
            document.body.style.overflow = 'hidden';
        }

        // Limpa a configuração quando o componente é desmontado
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    useEffect(() => {
        const getData = async () => {
            const response = await getChats();
            console.log(response)
            // setMensagensChat(response[response.length - 1])
        }
        getData()
    }, [])

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMensagensChat((prev) => [...prev, data])
        })
    }, [socket])

    useEffect(() => {
        // Scroll automático para o final sempre que mensagens mudarem
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [mensagensChat]);

    const handleSendMessage = () => {
        if (message.trim()) {
            sendMessage(message)
            setMessage('');  // Limpa o campo de mensagem
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: 'calc(100vh - 50px)'
        }}>
            {/* Sidebar do chat */}
            <Stack spacing={2} sx={{
                width: {xs:'100%', sm:'30%'},
                display: {xs: chatsVisible ? 'flex' : 'none', sm:'flex'},
                backgroundColor: 'rgba(191, 169, 212, 0.15)',
                justifyContent: 'flex-start',
                alignItems: 'center',
                borderRight: '#c5c2c7 solid 1px',
                paddingTop: '1%',
                overflowY: 'auto',
                paddingBottom: '1%'
            }}>
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
                        onClick={() => {
                            setSelectedIndex(index)
                            setChatsVisible(prev => !prev)
                        }}
                    />
                ))}
            </Stack>
            <Box sx={{
                width: {xs:'100%', sm:'70%'},
                display: {xs: chatsVisible ? 'none' : 'flex', sm:'flex'},
                flexDirection: 'column',
                flexGrow: 1,
                overflowY: 'auto',
                paddingBottom: '1%'
            }}>
                {/* Container das mensagens do chat */}
                <Box ref={chatContainerRef} sx={{
                    width: '98%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    position: 'relative',
                    paddingX: '1%',
                    overflowY: 'auto',
                    paddingBottom: '1%'
                }}>
                    <Box sx={{ width: '100%', paddingY: '2%', position: 'fixed', zIndex: 1000, height: '40px', backgroundColor: '#ffffff', borderBottom: '#c5c2c7 solid 1px' }}>
                        <Stack direction="row" spacing={2}>
                            <Box sx={{ color: '#301F3E', alignItems: 'center', display: {xs:'flex', sm:'none'} }}>
                                <ArrowBackIosNewIcon onClick={() => setChatsVisible(prev => !prev)} sx={{ cursor: 'pointer', marginLeft: '5%' }} />
                            </Box>
                            <Avatar>
                                {chatsData.filter((_, index) => index == selectedIndex)[0].nome[0]}
                            </Avatar>
                            <Typography sx={{ fontSize:{xs:'22px', sm:'28px'}, whiteSpace: 'nowrap', alignContent:'center', overflowX: 'hidden', textOverflow: 'ellipsis', fontWeight: '600' }}>
                                {chatsData.filter((_, index) => index == selectedIndex)[0].nome}
                            </Typography>
                        </Stack>
                    </Box>
                    <Box sx={{ height: 'calc(100% - 40px)', width: '100%', display: 'flex', flexDirection: 'column', marginTop: {xs:'60px' , sm:'100px'} }}>
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
                    </Box>
                </Box>
                <Box sx={{
                    width: '97%',
                    height: 'auto',
                    margin: 'auto',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    position: 'static'
                }} >
                    <TextField
                        placeholder="Digite sua mensagem"
                        sx={{ width: {xs:'85%', sm:'95%', padding:'5px'} }}
                        value={message}
                        onChange={sendMessage}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault(); // Evita que o comportamento padrão do Enter ocorra (como uma nova linha)
                                handleSendMessage(); // Envia a mensagem
                            }
                        }} />
                    <SendIcon sx={{ width: {xs:'10%', sm:'5%'}, height: '60%', margin:'auto' }} onClick={handleSendMessage} />
                </Box>
            </Box>
        </Box >
    );
};

export default Chat;
