const request = require("supertest");
const app = require("./server");

describe("Testes da API de Pedidos", () => {

    test("Deve consultar os pedidos", async () => {
        const resposta = await request(app).get("/pedidos");

        expect(resposta.status).toBe(200);
    });

    test("Deve criar um pedido", async () => {
        const resposta = await request(app)
            .post("/pedidos")
            .send({
                cliente: "Carlos Silva",
                tipo: "entrega",
                valor: 350,
                prioridade: "normal"
            });

        expect(resposta.status).toBe(201);
    });



    test("Deve consultar um pedido específico", async () => {
        const criacao = await request(app)
            .post("/pedidos")
            .send({
                cliente: "Maria Silva",
                tipo: "entrega",
                valor: 150,
                prioridade: "normal"
            });

        const id = criacao.body.id;

        const resposta = await request(app)
            .get(`/pedidos/${id}`);

        expect(resposta.status).toBe(200);
        expect(resposta.body.id).toBe(id);
    });

    test("Deve atualizar o status de um pedido", async () => {
        const criacao = await request(app)
            .post("/pedidos")
            .send({
                cliente: "João Souza",
                tipo: "retirada",
                valor: 200,
                prioridade: "alta"
            });

        const id = criacao.body.id;

        const resposta = await request(app)
            .patch(`/pedidos/${id}/status`)
            .send({
                status: "em_preparacao"
            });

        expect(resposta.status).toBe(200);
        expect(resposta.body.status).toBe("em_preparacao");
    });

        test("Deve rejeitar um pedido com valor inválido", async () => {
        const resposta = await request(app)
            .post("/pedidos")
            .send({
                cliente: "Carlos Silva",
                tipo: "entrega",
                valor: -50,
                prioridade: "normal"
            });

        expect(resposta.status).toBe(400);
    });

    test("Deve retornar 404 para pedido inexistente", async () => {
        const resposta = await request(app)
            .get("/pedidos/999999");

        expect(resposta.status).toBe(404);
    });

        test("Deve rejeitar uma transição de status inválida", async () => {
        const criacao = await request(app)
            .post("/pedidos")
            .send({
                cliente: "Pedro Santos",
                tipo: "entrega",
                valor: 250,
                prioridade: "normal"
            });

        const id = criacao.body.id;

        const resposta = await request(app)
            .patch(`/pedidos/${id}/status`)
            .send({
                status: "entregue"
            });

        expect(resposta.status).toBe(400);
    });

});