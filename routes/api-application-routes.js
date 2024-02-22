const express = require('express');
const { getAllVeiculos,
    getVeiculoPeloId,
    getVeiculoPelaPlaca,
    salvarVeiculo,
    atualizarVeiculo } = require('../controllers/VeiculoController');
const { getAllRegistroDeEntrada,
    registrarSaida,
    salvarRegistroDeEntrada } = require('../controllers/RegistrosDeEntradaController');
const apiRouter = express.Router();



apiRouter.get('/todosveiculos', getAllVeiculos)
apiRouter.get('/veiculo/:id', getVeiculoPeloId)
apiRouter.get('/veiculo', getVeiculoPelaPlaca)
//verificar se ja existe veiculo adicionado
apiRouter.post('/salvarveiculo', salvarVeiculo)
apiRouter.put('/atualizarveiculo/:id', atualizarVeiculo)

apiRouter.get('/registrosdeentrada', getAllRegistroDeEntrada)
apiRouter.post('/registrarentradadevisitantes/:id', salvarRegistroDeEntrada)
apiRouter.put('/registrarsaidadevisitantes/:id', registrarSaida)



module.exports = apiRouter