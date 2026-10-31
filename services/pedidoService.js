
let pedidos = [];
let proximoId = 1;

function criarPedido(dados) {
    const pedido = {
        id: proximoId++,
        cliente: dados.cliente.trim(),
        tipo: dados.tipo,
        valor: dados.valor,
        prioridade: dados.prioridade,
        status: 'recebido'
    };

    pedidos.push(pedido);

    return pedido;
}

function listarPedidos() {
    return pedidos;
}

function buscarPedido(id) {
    return pedidos.find(pedido => pedido.id === Number(id));
}

function atualizarStatus(id, novoStatus) {
    const pedido = buscarPedido(id);

    if (!pedido) {
        return null;
    }

    const transicoes = {
        recebido: ['em_preparacao', 'cancelado'],
        em_preparacao: ['enviado', 'cancelado'],
        enviado: ['entregue'],
        entregue: [],
        cancelado: []
    };

    if (!transicoes[pedido.status].includes(novoStatus)) {
        return false;
    }

    pedido.status = novoStatus;

    return pedido;
}

module.exports = {
    criarPedido,
    listarPedidos,
    buscarPedido,
    atualizarStatus
};
