
const pedidoService = require('../services/pedidoService');

function criar(req, res) {
    const dados = req.body;

    if (
        typeof dados.cliente !== 'string' ||
        dados.cliente.trim() === '' ||
        typeof dados.tipo !== 'string' ||
        !['entrega', 'retirada'].includes(dados.tipo) ||
        typeof dados.valor !== 'number' ||
        !Number.isFinite(dados.valor) ||
        dados.valor <= 0 ||
        !['normal', 'alta'].includes(dados.prioridade)
    ) {
        return res.status(400).json({
            mensagem: 'Dados do pedido inválidos.'
        });
    }

    const pedido = pedidoService.criarPedido(dados);

    return res.status(201).json(pedido);
}

function listar(req, res) {
    return res.status(200).json(
        pedidoService.listarPedidos()
    );
}

function consultar(req, res) {
    const pedido = pedidoService.buscarPedido(req.params.id);

    if (!pedido) {
        return res.status(404).json({
            mensagem: 'Pedido não encontrado.'
        });
    }

    return res.status(200).json(pedido);
}

function atualizarStatus(req, res) {
    const statusPermitidos = [
        'recebido',
        'em_preparacao',
        'enviado',
        'entregue',
        'cancelado'
    ];

    const status = req.body.status;

    if (!statusPermitidos.includes(status)) {
        return res.status(400).json({
            mensagem: 'Status inválido.'
        });
    }

    const pedido = pedidoService.atualizarStatus(
        req.params.id,
        status
    );

    if (!pedido) {
        return res.status(404).json({
            mensagem: 'Pedido não encontrado.'
        });
    }

    return res.status(200).json(pedido);
}

module.exports = {
    criar,
    listar,
    consultar,
    atualizarStatus
};
