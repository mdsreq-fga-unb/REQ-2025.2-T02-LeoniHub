document.addEventListener("DOMContentLoaded", function() {
    // Função para carregar um componente HTML em um container
    const loadComponent = (url, containerId) => {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(containerId).innerHTML = data;
            })
            .catch(error => console.error(`Erro ao carregar ${url}:`, error));
    };

    // Carrega a sidebar e o header
    loadComponent('layout/sidebar.html', 'sidebar-container');
    loadComponent('layout/header.html', 'header-container');

    // Bônus: Atualiza o título do header dinamicamente
    // Aguarda um pouco para o header ser carregado antes de tentar modificá-lo
    setTimeout(() => {
        const pageTitle = document.querySelector('.header-title-main h2'); // Pega o título da página
        const headerTitlePlaceholder = document.getElementById('header-title-placeholder');
        if (pageTitle && headerTitlePlaceholder) {
            headerTitlePlaceholder.textContent = pageTitle.textContent;
        } else {
             const fallbackTitle = document.querySelector('.page-header h1');
             if(fallbackTitle && headerTitlePlaceholder) headerTitlePlaceholder.textContent = fallbackTitle.textContent;
        }
    }, 100); // 100ms de espera
});