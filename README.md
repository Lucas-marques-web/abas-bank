# App de cadastro de contas bancárias pessoais

## Tecnologias

+ React
+ Bootstrap

## Funcionalidades

- **Tela Inicial:** A tela inicial deverá listar todas as contas bancárias cadastradas na aplicação.
    - No topo da tela inicial deverá possuir um botão para cadastrar uma nova conta bancária. Ao clicar neste botão o usuário deverá ser direcionado para __Tela de Listagem __
    - As contas cadastradas deverão ser exibidas abaixo do botão de cadastrar nova conta e ficarão armazenadas no local storage do dispositivo. O cadastro das contas serão realizadas conforme as funcionalidades descritas abaixo.
    - Se não existir conta cadastrada deverá exibir uma mensagem de que não existe conta cadastrada logo abaixo ao botão de cadastro de nova conta do topo da tela.
- **Tela de Listagem:** Apresentar um tela de listagem de todos os bancos para que seja selecionado um banco para o cadastro.
    - Para listagem de todos os bancos deverá ser utilizada a api pública: https://brasilapi.com.br/api/banks/v1
    - No topo da tela de listagem, deverá existir um campo com um botão para consulta do banco pelo código do banco. Este campo receberá o código do banco e ao clicar no botão irá apresentar apenas o banco consultado na tela de listagem. Para consultar o banco através do código deverá ser utilizada a api pública: [https://brasilapi.com.br/api/banks/v1/{code}](https://brasilapi.com.br/api/banks/v1/%7Bcode%7D)
    - Ao clicar em um banco da tela de listagem o usuário deverá ser redirecionado para a para __Tela de Cadastro __
- **Tela de Cadastro:** Cadastro da conta
    - Nesta tela deverá exibir todas as informações do banco retornadas pela api.
    - Abaixo das informações do banco deverá existir dois campos para o usuário informar a agencia e conta de cadastro.
    - Abaixo dos campos deverá possuir um botão para cadastrar a conta.
    - O cadastro da conta deverá ser armazenado no local storage do dispositivo - Armazenar (Codigo do Banco, Agencia e Conta).
