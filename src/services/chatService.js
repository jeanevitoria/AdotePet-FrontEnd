import api from './api.js'

export const saveMessage = async (data) => {
    try {
        const res = await api.post('/chat/salvar-mensagem', data);
        return res;
    } catch (err) {
        throw new Error(err.message);
    }
};

export const getChats = async () => {
    try {
        const res = await api.get('/chat/canais');
        return res;
    } catch (err) {
        throw new Error(err.message);
    }
};

export const getMessagesChat = async (data) => {
    try {
        const res = await api.post('/chat/canal/mensagens', data);
        return res;
    } catch (err) {
        throw new Error(err.message);
    }
};
