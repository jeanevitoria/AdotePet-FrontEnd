import axios from "axios";

export const cadastroService = async (data) => {
    return axios.post('https://adotepet-api.vercel.app/api/auth/cadastro', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((result) => { return result })
        .catch((err) => { throw new Error(err.message) })
}

export const loginService = async (data) => {
    return axios.post('https://adotepet-api.vercel.app/api/auth/login', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((result) => {
            console.log(result)
            return result
        })
        .catch((err) => { throw new Error(err.message) })
}

export const getUserService = async () => {
    const token = localStorage.getItem('token')
    return axios.get(`https://adotepet-api.vercel.app/api/user/perfil`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then((result) => {return result})
        .catch((err) => { throw new Error(err.message) })
}