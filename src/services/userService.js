import api from './api.js'

export const cadastroService = async (data) => {
  return api.post('/auth/cadastro', data, {
    headers: { 'Content-Type': 'application/json' }
  })
  .then(result => result)
  .catch(err => { throw new Error(err.response.data) });
}

export const loginService = async (data) => {
  return api.post('/auth/login', data, {
    headers: { 'Content-Type': 'application/json' }
  })
  .then(result => {
    console.log(result);
    return result;
  })
  .catch(err => { throw new Error(err.response.data) });
}

export const getResponsavelService = async (id) => {
  return api.get(`/user/responsavel/${id}`, {
    headers: { 'Content-Type': 'application/json' }
  })
  .then(result => result)
  .catch(err => { throw new Error(err.response.data) });
}

export const getUserService = async () => {
  return api.get('/user/perfil', {
    headers: { 'Content-Type': 'application/json' }
  })
  .then(result => result)
  .catch(err => { throw new Error(err.response.data) });
}

export const compararUsers = async (id) => {
  return api.post('/user/comparar', { id }, {
    headers: { 'Content-Type': 'application/json' }
  })
  .then(result => result)
  .catch(err => { throw new Error(err.response.data) });
}

export const deletarPublicacao = async (idAnimal) => {
  return api.delete('/user/deletar-publicacao', {
    headers: { 'Content-Type': 'application/json' },
    data: { idAnimal }
  })
  .then(result => result)
  .catch(err => { throw new Error(err.response.data) });
}

export const atualizarPerfilService = async (data) => {
  return api.put('/user/alterar-perfil', data, {
    headers: { 'Content-Type': 'application/json' }
  })
  .then(result => result)
  .catch(err => { throw new Error(err.response.data) });
}

export const recuperarSenha = async (email) => {
  return api.post('/auth/recuperar-senha', { email }, {
    headers: { 'Content-Type': 'application/json' }
  })
  .then(result => result)
  .catch(err => { throw new Error(err.response.data) });
}

export const redefinirSenha = async (token, senha) => {
  return api.post('/auth/redefinir-senha', { token, senha }, {
    headers: { 'Content-Type': 'application/json' }
  })
  .then(result => result)
  .catch(err => { throw new Error(err.response.data) });
}