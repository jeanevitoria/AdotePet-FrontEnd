import axios from "axios";

export const cadastroService = async (data) => {
    return axios.post('https://adotepet-backend.onrender.com/api/auth/cadastro', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((result) => { return result })
        .catch((err) => { throw new Error(err.response.data) })
}

export const loginService = async (data) => {
    return axios.post('https://adotepet-backend.onrender.com/api/auth/login', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((result) => {
            console.log(result)
            return result
        })
        .catch((err) => { 
            throw new Error(err.response.data) })
}

export const getResponsavelService = async (data) => {
    const token = localStorage.getItem('token');
    return axios.get(`https://adotepet-backend.onrender.com/api/user/responsavel/${data}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            throw new Error(err.response.data);
        });
}

export const getUserService = async () => {
    const token = localStorage.getItem('token');

    return axios.get(`https://adotepet-backend.onrender.com/api/user/perfil`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            throw new Error(err.response.data);
        });
}

export const compararUsers = async (id) => {
    const token = localStorage.getItem('token');
    const data = { id: id }
    return axios.post('https://adotepet-backend.onrender.com/api/user/comparar', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then((result) => { return result })
        .catch((err) => { throw new Error(err.response.data) })
}

export const deletarPublicacao = async (idAnimal) => {
    const token = localStorage.getItem('token');
    return axios.delete(`https://adotepet-backend.onrender.com/api/user/deletar-publicacao`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data: { idAnimal }
    })
        .then((result) => { return result })
        .catch((err) => { throw new Error(err.response.data) })
}

export const atualizarPerfilService = async (data) => {
    const token = localStorage.getItem('token')
    return axios.put(`https://adotepet-backend.onrender.com/api/user/alterar-perfil`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then((result) => { return result })
        .catch((err) => { throw new Error(err.response.data) })
}

export const recuperarSenha = async (email) => {
    return axios.post(`https://adotepet-backend.onrender.com/api/auth/recuperar-senha`, { email }, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then((result) => { return result })
        .catch((err) => { throw new Error(err.response.data) })
}

export const redefinirSenha = async (token, senha) => {
    return axios.post('https://adotepet-backend.onrender.com/api/auth/redefinir-senha', { token, senha }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((result) => { return result })
        .catch((err) => { throw new Error(err.response.data) })
}  