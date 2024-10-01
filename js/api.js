let paisesDataOriginal = []; // lista com os dados originais
let paisesFiltradosData = []; // lista com os dados filtrados
let paisesCarregados = 0; // controla quantos países foram carregados
const quantidadeParaCarregar = 20; // quantidade de países a carregar a cada scroll

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
    .then(data => { 
        paisesDataOriginal = data; // armazena a lista original
        paisesFiltradosData = [...data]; // inicializa com todos os países
        paisesCarregados = Math.min(quantidadeParaCarregar, paisesFiltradosData.length); // carrega a quantidade inicial
        mostrarPaises()}) 
}

// chama a função para carregar a api
carregarAPI()

// mostrar os países da api
const mostrarPaises = paises => {
    const paisesParaMostrar = paisesFiltradosData.slice(0, paisesCarregados); // carrega apenas os países que devem ser exibidos
    const paisesHTML = paisesParaMostrar.map(pais => getPais(pais)).join('');
    const container = document.getElementById('paises');
    container.innerHTML = paisesHTML || '<h2>Nenhum país encontrado.</h2>'; // mensagem se não houver países
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
    // redireciona para a página de detalhes com o nome do país na URL
    window.location.href = `detalhes.html?pais=${encodeURIComponent(paisNome)}`;
};

// função de busca
const buscarPaises = (termobusca) => {
    document.getElementById('ordenacao-ativa').textContent = 'Ordenar'; // reseta ordenação
    document.getElementById('filtro-ativo').textContent = 'Filtrar'; // reseta filtro
    paisesFiltradosData = paisesDataOriginal.filter(pais =>
        pais.name.common.toLowerCase().includes(termobusca.toLowerCase()) || 
        (pais.translations && pais.translations.por && pais.translations.por.common.toLowerCase().includes(termobusca.toLowerCase()))
    );
    paisesCarregados = Math.min(quantidadeParaCarregar, paisesFiltradosData.length); // atualiza a quantidade de países carregados
    mostrarPaises();
}

// evento de busca ao digitar no campo de texto
document.getElementById('busca').addEventListener('input', (e) => {
    const termobusca = e.target.value;
    buscarPaises(termobusca); // filtra os países conforme o termo digitado
});

// botão de limpar busca (que também reseta a ordenação e filtro)
document.getElementById('limpar').addEventListener('click', () => {
    window.scroll(0, 0); // sobe a página até o topo
    document.getElementById('busca').value = ''; // limpa o campo de busca
    paisesFiltradosData = [...paisesDataOriginal]; // reseta os países filtrados
    paisesCarregados = Math.min(quantidadeParaCarregar, paisesFiltradosData.length); // atualiza a quantidade
    mostrarPaises();

    // atualiza o texto exibido para filtros e ordenações
    document.getElementById('filtro-ativo').textContent = 'Filtrar';
    document.getElementById('ordenacao-ativa').textContent = 'Ordenar';
});

// funções de ordenação
const ordenarNomeAZ = () => {
    paisesFiltradosData.sort((a, b) => a.name.common.localeCompare(b.name.common)); // tipo de ordenação (neste caso, alfabetica)
    paisesCarregados = Math.min(quantidadeParaCarregar, paisesFiltradosData.length); // atualiza a quantidade
    mostrarPaises();
    document.getElementById('ordenacao-ativa').textContent = 'Nome (A-Z)'; // exibe qual ordenação está em vigor
}

const ordenarNomeZA = () => {
    paisesFiltradosData.sort((a, b) => b.name.common.localeCompare(a.name.common));
    paisesCarregados = Math.min(quantidadeParaCarregar, paisesFiltradosData.length);
    mostrarPaises();
    document.getElementById('ordenacao-ativa').textContent = 'Nome (Z-A)';
}

const ordenarPopulacaoCrescente = () => {
    paisesFiltradosData.sort((a, b) => a.population - b.population);
    paisesCarregados = Math.min(quantidadeParaCarregar, paisesFiltradosData.length);
    mostrarPaises();
    document.getElementById('ordenacao-ativa').textContent = 'População crescente';
}

const ordenarPopulacaoDecrescente = () => {
    paisesFiltradosData.sort((a, b) => b.population - a.population);
    paisesCarregados = Math.min(quantidadeParaCarregar, paisesFiltradosData.length);
    mostrarPaises();
    document.getElementById('ordenacao-ativa').textContent = 'População decrescente';
}

const ordenarAreaCrescente = () => {
    paisesFiltradosData.sort((a, b) => a.area - b.area);
    paisesCarregados = Math.min(quantidadeParaCarregar, paisesFiltradosData.length);
    mostrarPaises();
    document.getElementById('ordenacao-ativa').textContent = 'Área crescente';
}

const ordenarAreaDecrescente = () => {
    paisesFiltradosData.sort((a, b) => b.area - a.area);
    paisesCarregados = Math.min(quantidadeParaCarregar, paisesFiltradosData.length);
    mostrarPaises();
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
    const regiaoEmIngles = regiaoParaIngles[regiao] || regiao; // troca de idiomas
    paisesFiltradosData = paisesDataOriginal.filter(pais => pais.region.toLowerCase() === regiaoEmIngles.toLowerCase()); // tipo de filtro
    paisesCarregados = Math.min(quantidadeParaCarregar, paisesFiltradosData.length); // atualiza a quantidade
    mostrarPaises();
    document.getElementById('ordenacao-ativa').textContent = 'Ordenar'; // limpa ordenação, caso exista
}

const filtrarPorSubRegiao = (subRegiao) => {
    const subRegiaoEmIngles = subRegiaoParaIngles[subRegiao] || subRegiao;
    paisesFiltradosData = paisesDataOriginal.filter(pais => 
        pais.subregion && pais.subregion.toLowerCase() === subRegiaoEmIngles.toLowerCase()
    );
    paisesCarregados = Math.min(quantidadeParaCarregar, paisesFiltradosData.length);
    mostrarPaises();
    document.getElementById('ordenacao-ativa').textContent = 'Ordenar';
}

const filtrarPorPopulacao = (min, max) => {
    paisesFiltradosData = paisesDataOriginal.filter(pais => {
        if (max === undefined) {
            return pais.population >= min;
        }
        return pais.population >= min && pais.population < max;
    });
    paisesCarregados = Math.min(quantidadeParaCarregar, paisesFiltradosData.length);
    mostrarPaises();
    document.getElementById('ordenacao-ativa').textContent = 'Ordenar';
}

// eventos de clique para os filtros
document.querySelectorAll('[data-filter="regiao"]').forEach(button => {
    button.addEventListener('click', (e) => {
        const regiao = e.target.textContent;
        filtrarPorRegiao(regiao);
        document.getElementById('filtro-ativo').textContent = regiao; // exibe qual filtro está em vigor
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

// scroll infinito
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) { // 200px do final
        carregarMaisPaises();
    }
});

const carregarMaisPaises = () => {
    if (paisesCarregados < paisesFiltradosData.length) {
        paisesCarregados += quantidadeParaCarregar; // adiciona a quantidade a mais
        mostrarPaises();
    }
};
