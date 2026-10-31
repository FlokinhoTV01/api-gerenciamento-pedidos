
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

// Inicia o servidor normalmente
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}

// Permite que o Supertest utilize a API
module.exports = app;
