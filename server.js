const express = require('express');

const app = express();

app.use(express.json());

const pedidoRoutes = require('./routes/pedidoRoutes');

app.get('/', (req, res) => {
    res.status(200).json({
        mensagem: 'API de Gerenciamento de Pedidos funcionando!'
    });
});

app.use('/pedidos', pedidoRoutes);

const PORT = 3000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}

app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        mensagem: 'Erro interno do servidor.'
    });
});

module.exports = app;
