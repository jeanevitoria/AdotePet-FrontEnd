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

export const getUserService = async (data) => {
    const token = localStorage.getItem('token');
    const id = data ? data : null;
    
    // Se houver um ID, ele será incluído na URL como parâmetro de consulta
    const url = id ? `https://adotepet-api.vercel.app/api/user/perfil/${id}` : `https://adotepet-api.vercel.app/api/user/perfil`;

    return axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
    .then((result) => {
        return result;
    })
    .catch((err) => {
        throw new Error(err.message);
    });
}


export const atualizarPerfilService = async (data) => {
    const token = localStorage.getItem('token')
    return axios.put(`https://adotepet-api.vercel.app/api/user/alterar-perfil`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then((result) => { return result })
        .catch((err) => { throw new Error(err.message) })
}