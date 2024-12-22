import axios from 'axios';
import { Form } from 'react-router-dom';

// Requisições à API pública da Wikipedia para ter acesso às raças de cachorros e gatos

export const obterRacasCachorros = async () => {
    return axios.get('https://pt.wikipedia.org/w/api.php', {
        params: {
            action: 'query',
            list: 'categorymembers',
            cmtitle: 'Categoria:Raças_de_cães',
            cmlimit: 'max',
            format: 'json',
            origin: '*',
        },
    });
};

export const obterRacasGatos = async () => {
    const response = await axios.get('https://pt.wikipedia.org/w/api.php', {
        params: {
            action: 'parse',
            page: 'Lista_de_raças_de_gatos_domésticos',
            format: 'json',
            origin: '*',
        },
    });

    const html = response.data.parse.text['*'];
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const tabela = doc.querySelector('table');

    const racaGatos = [];
    const linhas = tabela.querySelectorAll('tr');

    linhas.forEach((linha, index) => {
        if (index > 0) {
            const colunas = linha.querySelectorAll('td');
            if (colunas.length > 0) {
                racaGatos.push({
                    nome: colunas[0].textContent.trim(),
                });
            }
        }
    });

    return racaGatos;
};

export const cadastrarAnimal = async (nome, sexo, tipo, raca, localizacao, descricao, file, peso, idade, vacinado) => {
    const formData = new FormData();

    formData.append('nome', nome);
    formData.append('sexo', sexo);
    formData.append('tipo', tipo);
    formData.append('raca', raca);
    // Convertendo o objeto localizacao para uma string JSON antes de enviá-lo
    formData.append('localizacao', JSON.stringify(localizacao));
    formData.append('descricao', descricao);
    formData.append('peso', peso);
    formData.append('idade', idade);
    formData.append('vacinado', vacinado);

    formData.append('foto', file);

    const token = localStorage.getItem('token');

    return axios.post('https://adotepet-api.vercel.app/api/animal/cadastrar', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then((result) => { return result })
        .catch((err) => { throw new Error(err.message) })
}


export const getAnimal = async (id_animal) => {
    const token = localStorage.getItem('token');
    return axios.get(`https://adotepet-api.vercel.app/api/animal/${id_animal}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then((result) => { return result })
        .catch((err) => { throw new Error(err.message) })
}

export const getAnimalFilter = async (filtro, tipo) => {
    const token = localStorage.getItem('token');
    console.log('token: ' + token)
    console.log(`https://adotepet-api.vercel.app/api/animal/filtrar?filtro=${filtro}&valor=${tipo}`)
    return axios.get(`https://adotepet-api.vercel.app/api/animal/filtrar?filtro=${filtro}&valor=${tipo}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then((result) => { return result })
        .catch((err) => { throw new Error(err.message) })
}

export const getPublicacoes = async (id_animal) => {
    const token = localStorage.getItem('token');
    return axios.get(`https://adotepet-api.vercel.app/api/animal/publicacoes`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then((result) => { return result })
        .catch((err) => { throw new Error(err.message) })
}

export const getAnimaisDisponiveis = async () => {
    const token = localStorage.getItem('token');
    return axios.get(`https://adotepet-api.vercel.app/api/animal/disponiveis`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then((result) => { return result })
        .catch((err) => { throw new Error(err.message) })
}

export const confirmarAdocao = async (id_animal) => {
    const token = localStorage.getItem('token');
    return axios.get(`https://adotepet-api.vercel.app/api/animal/confirmar-adocao`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then((result) => { return result })
        .catch((err) => { throw new Error(err.message) })
}