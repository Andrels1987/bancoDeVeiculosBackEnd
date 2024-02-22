const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const motoristaSchema = new Schema({
    nome: {
        type: String,
        require: true
    },
    numeroDocumento: {
        type: String,
        require: true
    },
    bloco: {
        type: String,
        require: true
    },
    apartamento: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Motorista', motoristaSchema)