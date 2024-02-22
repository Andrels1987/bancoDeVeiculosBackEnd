const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const motoristaSchema = new Schema({
    nome: {
        type: String,
        require: false
    },
    numeroDocumento: {
        type: String,
        require: false
    },
    bloco: {
        type: String,
        require: false
    },
    apartamento: {
        type: String,
        require: false
    }
})

const veiculoSchema = new Schema({
        placa: {
            type: String,
            required: true
        },
        modelo: {
            type: String,
            required: false
        },
        marca: {
            type: String,
            required: false
        },
        cor: {
            type: String,
            required: false
        },
        foto: {
            type: String,
            required: false
        },
        vaga: {
            type: String,
            required: false
        },
        tipoDeAutorizacao: {
            type: String,
            required: false
        },
        status_de_acesso: {
            type: String,
            required: false
        },
        motorista: {
            type : motoristaSchema,
            required: true
        },
        observacao: {
            type: String,
            required: false
        }
    
    }
)

const Veiculo = mongoose.model('Veiculo', veiculoSchema);
const Motorista = mongoose.model('Motorista', motoristaSchema);
module.exports = {Veiculo, Motorista}