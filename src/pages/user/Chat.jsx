import React, { useState, useEffect, useRef } from "react";
import { Box, Stack, TextField, Avatar } from "@mui/material";
import { getChats, saveMessage, getMessagesChat } from "../../services/chatService";
import ChatCard from "../../components/ChatCard";
import Typography from "@mui/material/Typography";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SendIcon from '@mui/icons-material/Send';
import { useLocation } from 'react-router-dom';
import { getUserService, getResponsavelService } from "../../services/userService";

const Chat = () => {
    const location = useLocation();
    let { responsavelData } = location.state || {}
    const [userLogged, setUserLogged] = useState({});
    const [responsavel, setResponsavel] = useState({});
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [message, setMessage] = useState('');
    const [chatsVisible, setChatsVisible] = useState(true);
    const [chatsEmpty, setChatsEmpty] = useState(true);
    const chatContainerRef = useRef(null);
    const [chatsData, setChatsData] = useState([]);
    const [mensagensChat, setMensagensChat] = useState([]);

    const ws = useRef(null);

    useEffect(() => {
        // Inicializa a conexão WebSocket
        ws.current = new WebSocket("wss://adotepet-backend.onrender.com/api/chat");

        ws.current.onopen = () => {
            // Envia o ID do usuário logado para registrar no WebSocket
            if (userLogged && userLogged._id) {
                ws.current.send(JSON.stringify({
                    action: "register_user",
                    idEmissor: userLogged._id
                }));
                console.log(`Usuário ${userLogged._id} registrado no WebSocket`);
            }
        };

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            let chatExists = false;

            console.log("Mensagem recebida:", data);

            setChatsData((prevChatsData) => {
                const updatedChatsData = prevChatsData.map((item) => {
                    if (item.emissor[0]._id === data.emissor) {
                        chatExists = true;
                        console.log("novas: ", [...item.messages, { emissor: data.emissor, text: data.text }])

                        return {
                            ...item,
                            messages: [...item.messages, { emissor: data.emissor, text: data.text }]
                        };
                    }
                    return item;
                });

                // Se o chat já existir, retorne os dados atualizados
                if (chatExists) {
                    return updatedChatsData;
                }

                // Caso contrário, adicione um novo chat
                console.log("novo");
                return [
                    ...prevChatsData,
                    { user_2: data.emissor, emissor: [data.emissorData], messages: [{ text: data.text, emissor: data.emissor }] }
                ];
            });
        };

        ws.current.onerror = (error) => {
            console.error("Erro no WebSocket:", error);
        };

        ws.current.onclose = () => {
            console.log("WebSocket desconectado");
        };

        return () => {
            if (ws.current) ws.current.close();
        };
    }, [userLogged]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getChats();
            const chats = response.data.response;
            const user = await getUserService();
            setUserLogged(user?.data[0] || []);
            setChatsData(chats);
            setMensagensChat(chats[selectedIndex]?.messages || [])

            if (responsavelData) {
                let chatExists = false;
                setChatsEmpty(false);
                setResponsavel(responsavelData);

                if (chats.length > 0) {
                    chats.forEach((value, index) => {
                        if (value.user_1 === responsavelData._id || value.user_2 === responsavelData._id) {
                            setSelectedIndex(index);
                            setMensagensChat(chats[index]?.messages || [])
                            chatExists = true;
                        }
                    });

                    if (!chatExists) {
                        setSelectedIndex(chats.length);
                        const user2 = await getResponsavelService(chats[selectedIndex].user_2);
                        console.log(user2)
                    }

                } else {
                    setResponsavel(responsavelData);
                    setSelectedIndex(0);
                    setChatsData((prevChats) => [
                        ...prevChats,
                        {
                            user_2: responsavelData._id,
                            emissor: [responsavelData],
                            messages: [{ text: '', emissor: userLogged._id }],
                        },
                    ]);
                    setMensagensChat([{ text: '', emissor: userLogged._id }])
                }
            } else {
                if (chats.length > 0) {
                    setChatsEmpty(false);
                    setSelectedIndex(chats.length - 1);
                    setResponsavel(chats[selectedIndex].emissor[0]);
                }
            }
        };
        fetchData();
    }, []);

    const handleSaveMessage = () => {
        if (message.trim()) {
            // Define o objeto data no início da função
            const data = {
                action: "send_message",
                idEmissor: userLogged._id,
                idReceptor: responsavel._id,
                emissor: userLogged,
                message
            };

            // Envia a mensagem pelo WebSocket
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                ws.current.send(JSON.stringify(data));
            }

            let chatExists = false;
            setChatsData((prevChatsData) => {
                const updatedChatsData = prevChatsData.map((item) => {
                    if (item.emissor[0]?._id === responsavel._id) {
                        chatExists = true;
                        return {
                            ...item,
                            messages: [...item.messages, { text: message, emissor: userLogged._id }]
                        };
                    }
                    return item;
                });
                console.log(chatExists)
                // Se o chat já existir, retorne os dados atualizados
                if (chatExists) {
                    return updatedChatsData;
                }

                // Caso contrário, adicione um novo chat
                return [
                    ...prevChatsData,
                    { user_2: userLogged._id, messages: [{ text: message, emissor: userLogged._id }] }
                ];
            });

            // Limpa o campo de entrada de mensagem
            setMessage('');

            // Salva a mensagem no banco de dados
            saveMessage(data)
                .catch((err) => console.error('Erro ao enviar mensagem:', err));
        }
    };



    useEffect(() => {
        // Scroll automático para o final sempre que mensagens mudarem
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
        console.log(mensagensChat)

    }, [mensagensChat]);

    useEffect(() => {
        const fetchResponsavel = async () => {
            if (chatsData && chatsData[selectedIndex]) {
                setMensagensChat(chatsData[selectedIndex].messages);
                console.log(chatsData);
                setResponsavel(chatsData[selectedIndex]?.emissor?.[0]);
            }
        };

        fetchResponsavel();
    }, [selectedIndex, chatsData]);


    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: 'calc(100vh - 50px)',
            margin: 0,
            overflow: 'hidden',
        }}>
            {/* Sidebar do chat */}
            <Stack spacing={2} sx={{
                width: { xs: '100%', sm: '30%' },
                display: { xs: chatsVisible ? 'flex' : 'none', sm: 'flex' },
                backgroundColor: 'rgba(191, 169, 212, 0.15)',
                justifyContent: 'flex-start',
                alignItems: 'center',
                borderRight: '#c5c2c7 solid 1px',
                paddingTop: '1%',
                overflowY: 'auto',
                overflowX: 'hidden',
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
                {chatsEmpty && (
                    <Typography>
                        Não há chats no momento.
                    </Typography>
                )}
                {!chatsEmpty && responsavel && mensagensChat && chatsData.map((item, index) => (
                    <ChatCard
                        key={index}
                        nome={item.emissor?.[0]?.nome || "Desconhecido"}
                        mensagem={item.messages[item.messages.length - 1].text}
                        selected={selectedIndex === index}
                        onClick={() => {
                            setSelectedIndex(index)
                            setChatsVisible(prev => !prev)
                        }}
                    />
                ))}
            </Stack>
            {!chatsEmpty && responsavel && (
                <Box sx={{
                    width: { xs: '100%', sm: '70%' },
                    display: { xs: chatsVisible ? 'none' : 'flex', sm: chatsEmpty ? 'none' : 'flex' },
                    flexDirection: 'column',
                    flexGrow: 1,
                    overflowX: 'hidden',
                    paddingBottom: '1%',

                }}>
                    {/* Container das mensagens do chat */}
                    <Box sx={{
                        width: '100%',
                        height: 'calc(100vh - 50px)', // Ocupa todo o espaço disponível
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
                        position: 'relative',
                        overflowY: 'auto', // Permite scroll apenas no eixo Y
                        paddingBottom: '1%',
                    }}>
                        {responsavel && responsavel.nome && (
                            <Box sx={{
                                width: '100%',
                                height: '40px',
                                position: 'fixed',
                                backgroundColor: '#ffffff',
                                borderBottom: '#c5c2c7 solid 1px',
                                paddingY: '2%',
                                paddingX: '2%',
                                alignContent: 'center'
                            }}>
                                <Stack direction="row" spacing={2} alignItems="center" // Alinha verticalmente ao centro
                                >
                                    <Avatar>{responsavel.nome[0]}</Avatar>
                                    <Typography
                                        sx={{
                                            fontSize: { xs: '16px', sm: '24px' },
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                            fontWeight: '600',
                                        }}
                                    >
                                        {responsavel.nome}
                                    </Typography>
                                </Stack>
                            </Box>
                        )}
                        {mensagensChat && (
                            <Box ref={chatContainerRef} sx={{
                                width: '100%',
                                display: 'flex',
                                height: '70%',
                                flexDirection: 'column',
                                marginTop: { xs: '60px', sm: '100px' },
                                overflowY: 'auto',
                            }}>
                                {mensagensChat.map((value, index) => {
                                    return (
                                        value.text != '' ? (<Box
                                            key={index}
                                            sx={{
                                                backgroundColor: (value.emissor === responsavel._id) ? '#ffffff' : '#6c5f76',
                                                border: (value.emissor === responsavel._id) ? '#c5c2c7 solid 1px' : 'none',
                                                color: (value.emissor === responsavel._id) ? '#000000' : '#ffffff',
                                                padding: '10px',
                                                borderRadius: '10px',
                                                maxWidth: '50%',
                                                marginX: '2%',
                                                marginBottom: '1%',
                                                alignSelf: (value.emissor === responsavel._id) ? 'flex-start' : 'flex-end',
                                            }}
                                        >
                                            {value.text}
                                        </Box>) : (<></>)
                                    );
                                })}
                            </Box>
                        )}
                    </Box>
                    <Box sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        position: 'fixed',
                        bottom: 0,
                        backgroundColor: '#ffffff',
                        padding: '10px',
                        borderTop: '1px solid #c5c2c7',
                    }}>
                        <TextField
                            placeholder="Digite sua mensagem"
                            sx={{ width: { xs: '85%', sm: '65%' }, padding: '5px' }}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleSaveMessage();
                                }
                            }}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <SendIcon
                                            sx={{
                                                cursor: 'pointer',
                                                width: { xs: '10%', sm: '3%' },
                                                height: '50%',
                                                margin: 'auto',
                                            }}
                                            onClick={handleSaveMessage}
                                        />
                                    ),
                                },
                            }}
                        />

                    </Box>
                </Box>
            )}
        </Box >
    );
};

export default Chat;
