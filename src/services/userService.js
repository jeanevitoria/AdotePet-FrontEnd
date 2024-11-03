import axios from "axios";

export const cadastroService = async (data) => {
    return axios.post('https://adotepet-api.vercel.app/api/auth/cadastro', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then ((result) => { return result })
    .catch((err) => { throw new Error(err.response.data.message) })
}

export const loginService = async (data) => {
    return axios.post('https://adotepet-api.vercel.app/api/auth/login', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((result) => { return result })
    .catch((err) => { throw new Error(err.response.data.message) })
}