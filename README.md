# API de Gerenciamento de Pedidos

## 1. Sobre o projeto

Este projeto consiste em uma API REST para gerenciamento de pedidos, desenvolvida como atividade acadêmica.

A API permite cadastrar pedidos, listar todos os pedidos, consultar um pedido específico e atualizar o status de um pedido.

## 2. Tecnologias utilizadas

- Node.js
- JavaScript
- Express
- Jest
- Supertest
- Postman
- Visual Studio Code

## 3. Como instalar e executar

É necessário ter o Node.js instalado no computador.

**Passo 1:** Abra o terminal na pasta principal do projeto.

**Passo 2:** Instale as dependências:

```bash
npm install
```

**Passo 3:** Inicie o servidor:

```bash
npm start
```

O servidor será iniciado na porta 3000.

Para verificar se a API está funcionando, acesse:

`http://localhost:3000`

A mensagem esperada é:

```json
{
  "mensagem": "API de Gerenciamento de Pedidos funcionando!"
}
```

## 4. Rotas da API

| Método | Rota | Descrição |
|---|---|---|
| POST | `/pedidos` | Criar um pedido |
| GET | `/pedidos` | Listar todos os pedidos |
| GET | `/pedidos/:id` | Consultar um pedido pelo ID |
| PATCH | `/pedidos/:id/status` | Atualizar o status de um pedido |

## 5. Exemplo de criação de pedido

Para criar um pedido, envie uma requisição POST para:

`http://localhost:3000/pedidos`

Exemplo de corpo da requisição:

```json
{
  "cliente": "Carlos Silva",
  "tipo": "entrega",
  "valor": 350,
  "prioridade": "normal"
}
```

O pedido será criado com o status inicial `recebido`.

Os tipos aceitos são `entrega` e `retirada`.

As prioridades aceitas são `normal` e `alta`.

## 6. Status dos pedidos

Os status aceitos pela API são:

- `recebido`
- `em_preparacao`
- `enviado`
- `entregue`
- `cancelado`

A API possui regras para controlar a mudança de status dos pedidos:

| Status atual | Próximos status permitidos |
|---|---|
| `recebido` | `em_preparacao` ou `cancelado` |
| `em_preparacao` | `enviado` ou `cancelado` |
| `enviado` | `entregue` |
| `entregue` | Nenhum |
| `cancelado` | Nenhum |

Não é permitido pular etapas ou alterar o status de pedidos que já foram entregues ou cancelados.

Para atualizar o status, utilize o método PATCH na rota `/pedidos/:id/status`.

Exemplo de corpo da requisição:

```json
{
  "status": "em_preparacao"
}
```

Se a mudança não for permitida, a API retorna o código HTTP 400.

## 7. Validações e respostas

A API possui validações para os dados enviados na criação dos pedidos.

- Cliente não pode estar vazio.
- Tipo deve ser `entrega` ou `retirada`.
- Valor deve ser numérico e maior que zero.
- Prioridade deve ser `normal` ou `alta`.
- O status informado deve pertencer à lista de status aceitos.
- Caso o pedido não seja encontrado, a API retorna erro 404.

Principais códigos HTTP utilizados:

| Código | Significado |
|---|---|
| 200 | Requisição realizada com sucesso |
| 201 | Pedido criado com sucesso |
| 400 | Dados ou status inválidos |
| 404 | Pedido não encontrado |

## 8. Organização do projeto

O projeto utiliza uma arquitetura em camadas:

- **Routes:** define os caminhos e métodos das requisições.
- **Controllers:** recebe as requisições, realiza validações e envia as respostas.
- **Services:** contém as funções responsáveis pelo gerenciamento dos pedidos.
- **server.js:** configura e inicia a aplicação.

Os pedidos são armazenados temporariamente em memória, sem utilização de banco de dados.

## 9. Testes

Foram realizados testes automatizados utilizando Jest e Supertest.

Para executar os testes, utilize:

```bash
npm test
```

Os testes automatizados verificam:

- Listagem de pedidos.
- Criação de pedidos.
- Consulta de um pedido específico.
- Atualização do status de um pedido.

Também foram realizados testes manuais utilizando o Postman para verificar as respostas da API.

## 10. Evidências

A pasta `evidencias` contém capturas de tela dos testes realizados no Postman:

1. Criação de pedido.
2. Validação de dados inválidos.
3. Listagem de pedidos.
4. Consulta de pedido inexistente.
5. Atualização do status.

## 11. Uso de Inteligência Artificial

Foi utilizada a ferramenta ChatGPT como apoio durante o desenvolvimento da atividade.

A ferramenta ajdou na compreensão dos requisitos, organização de partes dos arquivos, desenvolvimento de partes do código, identificação de erros e criação dos testes.

Uma sugestão aceita foi utilizar a arquitetura em camadas, separando rotas, controllers e services. Essa organização facilitou a compreensão e a manutenção do projeto.

As orientações foram analisadas e aplicadas durante o desenvolvimento, com testes para verificar o funcionamento da API.

## 12. Considerações finais

O desenvolvimento deste projeto permitiu praticar a criação de uma API REST utilizando Node.js e Express, além de trabalhar com rotas, validações, organização em camadas e testes automatizados.