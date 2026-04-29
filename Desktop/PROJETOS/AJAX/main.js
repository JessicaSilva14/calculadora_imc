// Espera a página carregar para começar
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Criamos o 'mensageiro' (objeto de requisição)
    const xhttp = new XMLHttpRequest();
    
    // 2. Endereço da API do GitHub com o seu usuário
    const endpoint = 'https://api.github.com/users/jessicaSilva14';

    // 3. O que o mensageiro deve fazer quando voltar?
    xhttp.onreadystatechange = function() {
        // Se a entrega foi feita com sucesso (4) e o site respondeu OK (200)
        if (this.readyState == 4 && this.status == 200) {
            
            // Transformamos o texto que o GitHub mandou em um objeto JS
            const json = JSON.parse(this.responseText);

            // Agora 'colamos' cada dado no HTML usando os IDs
            document.querySelector('#name').innerText = json.name;
            document.querySelector('#avatar').src = json.avatar_url;
            document.querySelector('#repos').innerText = json.public_repos;
            document.querySelector('#followers').innerText = json.followers;
            document.querySelector('#following').innerText = json.following;
            document.querySelector('#link').href = json.html_url;
            document.querySelector('#username').innerText = `@${json.login}`;  // Esta linha é a que troca o "@carregando" pelo nome do GitHub
        }
    };

    // 4. Prepara a viagem (método GET para buscar dados)
    xhttp.open('GET', endpoint, true);

    // 5. Envia o mensageiro
    xhttp.send();
});