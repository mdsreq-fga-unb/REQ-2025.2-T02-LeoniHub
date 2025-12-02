---
title: "Estudos de Casos"
sidebar_label: "Product Backlog Building"
sidebar_position: 1
---

### PBB - CulturaViva

---

### Problemas e Expectativas

![Problemas e Expectativas](/img/pbb/problemas.jpg)

---

### Persona Mariana
![Mariana](/img/pbb/mariana/Mariana.jpg)
![Funcionalidades Mariana](/img/pbb/mariana/funcionalidades.png)
![PBI Mariana](/img/pbb/mariana/pbis.png)

---

### Persona Rafael
![Rafael](/img/pbb/rafael/Rafael.png)
![Funcionaliades Rafael](/img/pbb/rafael/funcionalidades.png)
![PBI Mariana](/img/pbb/rafael/pbis.png)

---

### Persona Lígia
![Rafael](/img/pbb/ligia/Ligia.png)
![Funcionaliades Rafael](/img/pbb/ligia/funcionalidades.png)
![PBI Mariana](/img/pbb/ligia/pbis.png)

---

### Persona Renata
![Rafael](/img/pbb/renata/Renata.png)
![Funcionaliades Lígia](/img/pbb/renata/funcionalidades.png)
![PBI Mariana](/img/pbb/renata/pbis.png)

---

### Persona Beatriz
![Rafael](/img/pbb/beatriz/Beatriz.png)
![Funcionaliades Beatriz](/img/pbb/beatriz/funcionalidades.png)
![PBI Mariana](/img/pbb/beatriz/pbis.png)

---

### Persona Carlos
![Rafael](/img/pbb/carlos/Carlos.png)
![Funcionaliades Carlos](/img/pbb/carlos/funcionalidades.png)
![PBI Mariana](/img/pbb/carlos/pbis.png)

---

## User Stories com Critérios de Aceitação e Cenários BDD

---

### 1. Cadastrar novo Evento
**História de Usuário:**  
Eu, como Gestora Municipal, quero cadastrar um novo evento, para que as informações sejam centralizadas.

#### Critérios de Aceitação
1. A gestora deve conseguir preencher todos os campos obrigatórios (nome, data, local, descrição).
2. Ao salvar, o evento é armazenado na base de dados e fica visível na lista de eventos.
3. Se algum campo obrigatório estiver vazio, o sistema deve exibir uma mensagem de erro.

#### Cenário BDD: Tenho um evento válido para cadastrar
- **Dado** que o evento é válido e tenha as informações a serem preenchidas definidas  
- **Quando** a Gestora preencher o formulário  
- **Então** o evento deve ser cadastrado corretamente no aplicativo  

---

### 2. Editar informações de um evento existente
**História de Usuário:**  
Eu, como Gestora Municipal, quero editar as informações do evento, para garantir que a comunicação interna esteja sempre integrada.

#### Critérios de Aceitação
- A gestora deve conseguir alterar campos como data, horário, local e descrição.
- As alterações devem ser salvas e refletidas imediatamente na visualização do evento.
- Caso o evento esteja publicado, o sistema deve solicitar confirmação antes de aplicar as mudanças.

#### Cenário BDD: Tenho um evento para editar
- **Dado** que existe um evento válido (não terminado) disponível  
- **Quando** a Gestora solicitar a edição do evento  
- **Então** deve redirecionar para a página de edição do evento escolhido  

---

### 3. Publicar eventos
**História de Usuário:**  
Eu, como Gestora Municipal, quero publicar eventos, para que a coordenação entre unidades seja eficiente.

#### Critérios de Aceitação
- A publicação só deve ser possível após o preenchimento completo e válido das informações obrigatórias do evento.
- O sistema deve atualizar o status do evento para “Publicado”.
- O evento deve aparecer na agenda pública do sistema após a publicação.
- O sistema deve exibir a mensagem: **“Evento publicado com sucesso.”**

#### Cenário BDD: A Gestora Municipal quer publicar um evento
- **Dado** que o evento já está cadastrado corretamente  
- **Quando** a Gestora aperta em “Publicar”  
- **Então** o evento deve mudar seu status para “Publicado” e o site deve mostrar ele publicamente  

---

### 4. Gerar relatório de frequência e participação
**História de Usuário:**  
Eu, como Gestora Municipal, quero gerar relatórios de frequência e participação de público, para ter relatórios automatizados e padronizados.

#### Critérios de Aceitação
- O relatório deve exibir dados como número de participantes e taxa de presença.
- A gestora pode selecionar período e evento antes da geração.
- O relatório deve poder ser exportado em formato PDF ou Excel.

#### Cenário BDD: A Gestora quer baixar relatórios sobre um evento
- **Dado** que o evento está em andamento ou já acabou  
- **Quando** a solicitação do relatório for registrada  
- **Então** o aplicativo deve fornecer o relatório para a Gestora  

---

### 5. Preencher formulário de submissão
**História de Usuário:**  
Eu, como Produtor Independente, quero preencher o formulário de submissão, para garantir uma inscrição digital padronizada.

#### Critérios de Aceitação
- O Produtor Independente deve conseguir preencher os dados do formulário.
- Todos os campos obrigatórios devem estar claramente identificados.
- O sistema deve validar o preenchimento antes de prosseguir.
- O progresso deve ser salvo automaticamente para evitar perda de dados.

#### Cenário BDD : O produtor quer submeter sua proposta de projeto
- **Dado** que o Produtor preencha todos os dados corretamente do formulário
- **Quando** o Produtor solicitar a submissão
- **Então** o sistema deve salvar e enviar sua submissão no aplicativo

---

## link para o PBB: https://miro.com/app/board/uXjVJvHQqB4=/