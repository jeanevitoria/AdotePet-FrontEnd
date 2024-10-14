import axios from 'axios';

export const obterEstados = async () => {
    return axios.get('https://brasilapi.com.br/api/ibge/uf/v1', {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const obterMunicipios = async (estado) => {
    return axios.get(`https://brasilapi.com.br/api/ibge/municipios/v1/${estado}?providers=dados-abertos-br,gov,wikipedia`, {
        headers: {
            'Content-type': 'application/json',
        },
    });
};