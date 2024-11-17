import axios from 'axios';

export const sendMessage = (data) => {
    const token = localStorage.getItem('token')
    axios.post('https://adotepet-api.vercel.app/api/chat/send-message', data, {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    })
        .then((res) => { return res })
        .catch((err) => { throw new Error(err) })
}

export const getChats = () => {
    const token = localStorage.getItem('token')
    axios.get('https://adotepet-api.vercel.app/api/chat/channels', {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    })
        .then((res) => { return res })
        .catch((err) => { throw new Error(err) })
}

export const getMessagesChat = (data) => {
    const token = localStorage.getItem('token')
    axios.get('https://adotepet-api.vercel.app/api/chat/channel/data', data, {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    })
        .then((res) => { return res })
        .catch((err) => { throw new Error(err) })
}