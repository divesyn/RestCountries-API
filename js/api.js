let paisesDataOriginal = [];
let paisesFiltradosData = [];

// mudança de idiomas das regiões e subregiões para as opções de filtro e ordenação funcionarem sem precisar deixar o HTML em inglês
const regiaoParaIngles = {
    'África': 'Africa',
    'Américas': 'Americas',
    'Ásia': 'Asia',
    'Europa': 'Europe'
};

const subRegiaoParaIngles = {
    'África Central': 'Middle Africa',
    'África Ocidental': 'Western Africa',
    'África Oriental': 'Eastern Africa',
    'África Setentrional': 'Northern Africa',
    'África Austral': 'Southern Africa',
    'América do Norte': 'North America',
    'América Central': 'Central America',
    'América do Sul': 'South America',
    'Caribe': 'Caribbean',
    'Ásia Central': 'Central Asia',
    'Ásia Oriental': 'Eastern Asia',
    'Sudeste Asiático': 'South-Eastern Asia',
    'Sul da Ásia': 'Southern Asia',
    'Oeste da Ásia': 'Western Asia',
    'Europa Setentrional': 'Northern Europe',
    'Europa Ocidental': 'Western Europe',
    'Europa Meridional': 'Southern Europe',
    'Europa Oriental': 'Eastern Europe',
    'Austrália e N. Zelândia': 'Australia and New Zealand',
    'Melanésia': 'Melanesia',
    'Micronésia': 'Micronesia',
    'Polinésia': 'Polynesia'
};

// carregar a api
const carregarAPI = () => {
    fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(data => {paisesDataOriginal = data; mostrarPaises(data)}) // armazena a lista de paises numa variavel global e mostra ela
}

// chama a função para carregar a api
carregarAPI()

// mostrar os países da api
const mostrarPaises = paises => {
    if (!paises || paises.length === 0) {
        document.getElementById('paises').innerHTML = '<p>Nenhum país encontrado.</p>';
        return;
    }

    const paisesHTML = paises.map(pais => getPais(pais));
    const container = document.getElementById('paises');
    container.innerHTML = paisesHTML.join('');
}

// pegar os dados e jogar no html
const getPais = (pais) => {
    return `
        <div class="caixa-pais" onclick="abrirPaginaDetalhes('${pais.name.common}')">
        <img src="${pais.flags.png}">
        <h2>${pais.name.common}</h2>
        <h3>CAPITAL: ${pais.capital}</h3>
        <h3>REGIÃO: ${pais.region}</h3>
        <p><b>Clique para mais informações</b></p>
        </div>
    `
}

// abrir página do país
const abrirPaginaDetalhes = (paisNome) => {
    // Redireciona para a página de detalhes com o nome do país na URL
    window.location.href = `detalhes.html?pais=${encodeURIComponent(paisNome)}`;
};

// função de busca
const filtrarPaises = (termobusca) => {
    paisesFiltradosData = paisesDataOriginal; // reseta a lista filtrada
    document.getElementById('ordenacao-ativa').textContent = 'Ordenar'; // reseta ordenação
    document.getElementById('filtro-ativo').textContent = 'Filtrar'; // reseta filtro
    const paisesParaFiltrar = paisesFiltradosData.length > 0 ? paisesFiltradosData : paisesDataOriginal;
    paisesFiltradosData = paisesParaFiltrar.filter(pais =>
        pais.name.common.toLowerCase().includes(termobusca.toLowerCase()) || 
        pais.translations.por.common.toLowerCase().includes(termobusca.toLowerCase())
    );
    mostrarPaises(paisesFiltradosData);
}

// evento de busca ao digitar no campo de texto
document.getElementById('busca').addEventListener('input', (e) => {
    const termobusca = e.target.value;
    filtrarPaises(termobusca); // filtra os países conforme o termo digitado
});

// botão de limpar busca (que também reseta a ordenação e filtro)
document.getElementById('limpar').addEventListener('click', () => {
    document.getElementById('busca').value = ''; // limpa o campo de busca
    mostrarPaises(paisesDataOriginal); // mostra todos os países novamente
    paisesFiltradosData = []; // reseta os países filtrados

    // atualiza o texto exibido para filtros e ordenações
    document.getElementById('filtro-ativo').textContent = 'Filtrar';
    document.getElementById('ordenacao-ativa').textContent = 'Ordenar';
});

// funções de ordenação
const ordenarNomeAZ = () => {
    const paisesOrdenados = [...(paisesFiltradosData.length ? paisesFiltradosData : paisesDataOriginal)].sort((a, b) => a.name.common.localeCompare(b.name.common));
    mostrarPaises(paisesOrdenados);
    document.getElementById('ordenacao-ativa').textContent = 'Nome (A-Z)';
}

const ordenarNomeZA = () => {
    const paisesOrdenados = [...(paisesFiltradosData.length ? paisesFiltradosData : paisesDataOriginal)].sort((a, b) => b.name.common.localeCompare(a.name.common));
    mostrarPaises(paisesOrdenados);
    document.getElementById('ordenacao-ativa').textContent = 'Nome (Z-A)';
}

const ordenarPopulacaoCrescente = () => {
    const paisesOrdenados = [...(paisesFiltradosData.length ? paisesFiltradosData : paisesDataOriginal)].sort((a, b) => a.population - b.population);
    mostrarPaises(paisesOrdenados);
    document.getElementById('ordenacao-ativa').textContent = 'População crescente';
}

const ordenarPopulacaoDecrescente = () => {
    const paisesOrdenados = [...(paisesFiltradosData.length ? paisesFiltradosData : paisesDataOriginal)].sort((a, b) => b.population - a.population);
    mostrarPaises(paisesOrdenados);
    document.getElementById('ordenacao-ativa').textContent = 'População decrescente';
}

const ordenarAreaCrescente = () => {
    const paisesOrdenados = [...(paisesFiltradosData.length ? paisesFiltradosData : paisesDataOriginal)].sort((a, b) => a.area - b.area);
    mostrarPaises(paisesOrdenados);
    document.getElementById('ordenacao-ativa').textContent = 'Área crescente';
}

const ordenarAreaDecrescente = () => {
    const paisesOrdenados = [...(paisesFiltradosData.length ? paisesFiltradosData : paisesDataOriginal)].sort((a, b) => b.area - a.area);
    mostrarPaises(paisesOrdenados);
    document.getElementById('ordenacao-ativa').textContent = 'Área decrescente';
}

// eventos de clique para ordenação
document.getElementById('ordenar-nome-az').addEventListener('click', ordenarNomeAZ);
document.getElementById('ordenar-nome-za').addEventListener('click', ordenarNomeZA);
document.getElementById('ordenar-pop-crescente').addEventListener('click', ordenarPopulacaoCrescente);
document.getElementById('ordenar-pop-decrescente').addEventListener('click', ordenarPopulacaoDecrescente);
document.getElementById('ordenar-area-crescente').addEventListener('click', ordenarAreaCrescente);
document.getElementById('ordenar-area-decrescente').addEventListener('click', ordenarAreaDecrescente);



// funções de filtro
const filtrarPorRegiao = (regiao) => {
    paisesFiltradosData = paisesDataOriginal; // limpa a lista com a original antes de filtrar
    document.getElementById('ordenacao-ativa').textContent = 'Ordenar'; // limpa ordenação, caso exista
    const regiaoEmIngles = regiaoParaIngles[regiao] || regiao; // troca de idiomas
    const paisesParaFiltrar = paisesFiltradosData.length > 0 ? paisesFiltradosData : paisesDataOriginal;

    paisesFiltradosData = paisesParaFiltrar.filter(pais => 
        pais.region.toLowerCase() === regiaoEmIngles.toLowerCase()
    );

    mostrarPaises(paisesFiltradosData);
}

const filtrarPorSubRegiao = (subRegiao) => {
    paisesFiltradosData = paisesDataOriginal;
    document.getElementById('ordenacao-ativa').textContent = 'Ordenar';
    const subRegiaoEmIngles = subRegiaoParaIngles[subRegiao] || subRegiao;
    const paisesParaFiltrar = paisesFiltradosData.length > 0 ? paisesFiltradosData : paisesDataOriginal;

    paisesFiltradosData = paisesParaFiltrar.filter(pais => 
        pais.subregion && pais.subregion.toLowerCase() === subRegiaoEmIngles.toLowerCase()
    );

    mostrarPaises(paisesFiltradosData);
}
const filtrarPorPopulacao = (min, max) => {
    paisesFiltradosData = paisesDataOriginal;
    document.getElementById('ordenacao-ativa').textContent = 'Ordenar';
    const paisesParaFiltrar = paisesFiltradosData.length > 0 ? paisesFiltradosData : paisesDataOriginal;

    paisesFiltradosData = paisesParaFiltrar.filter(pais => {
        if (max === undefined) {
            return pais.population >= min;
        }
        return pais.population >= min && pais.population < max;
    });

    mostrarPaises(paisesFiltradosData);
}

// eventos de clique para os filtros
document.querySelectorAll('[data-filter="regiao"]').forEach(button => {
    button.addEventListener('click', (e) => {
        const regiao = e.target.textContent;
        filtrarPorRegiao(regiao);
        document.getElementById('filtro-ativo').textContent = regiao;
    });
});

document.querySelectorAll('[data-filter="sub-regiao"]').forEach(button => {
    button.addEventListener('click', (e) => {
        const subRegiao = e.target.textContent;
        filtrarPorSubRegiao(subRegiao);
        document.getElementById('filtro-ativo').textContent = subRegiao;
    });
});

document.querySelectorAll('[data-filter="populacao"]').forEach(button => {
    button.addEventListener('click', (e) => {
        const range = e.target.getAttribute('data-range').split('-');
        const min = parseInt(range[0]);
        const max = range[1] ? parseInt(range[1]) : undefined;
        filtrarPorPopulacao(min, max);
        document.getElementById('filtro-ativo').textContent = e.target.textContent;
    });
});
