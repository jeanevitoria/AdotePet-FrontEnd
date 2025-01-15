import axios from 'axios';

export const saveMessage = async (data) => {
    const token = localStorage.getItem('token')
    return axios.post('https://adotepet-backend.onrender.com/api/chat/salvar-mensagem', data, {
        headers:  {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then((res) => { return res })
        .catch((err) => { throw new Error(err) })
}

export const getChats = async () => {
    const token = localStorage.getItem('token')
    return axios.get('https://adotepet-backend.onrender.com/api/chat/canais', {
        headers:  {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then((res) => { return res })
        .catch((err) => { throw new Error(err) })
}

export const getMessagesChat = async (data) => {
    const token = localStorage.getItem('token')
    return axios.get('https://adotepet-backend.onrender.com/api/chat/canal/mensagens', {
        headers:  {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data: data
    })
        .then((res) => { return res })
    .catch((err) => { throw new Error(err) })
}