import axios from 'axios';

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
