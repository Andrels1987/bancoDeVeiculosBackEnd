const mongoose = require('mongoose');
const {Veiculo} = require('../schemas/Veiculo')
const VeiculoObject = Veiculo.schema
const Schema = mongoose.Schema;
const registroSchema = new Schema({
    id: {
        type: String,
        require: true
    },
    statusVisita: {
        type: String,
        require: true
    },
    horaEntrada: {
        type: Date,
        require: true
    },
    horaSaida: {
        type: Date,
        require: true
    },
    veiculo: {
        type: VeiculoObject,
        require: true
    }
}
)

module.exports = mongoose.model('EntradaDeVisitante', registroSchema);