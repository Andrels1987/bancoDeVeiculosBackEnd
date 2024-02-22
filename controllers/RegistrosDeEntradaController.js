const Registros = require('../schemas/Registros')
const mongoose = require('mongoose');
const { Veiculo } = require('../schemas/Veiculo');


const getAllRegistroDeEntrada = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let registros = await Registros.find({});
    res.send(JSON.stringify([...registros], 4, null))
}
const salvarRegistroDeEntrada = async (req, res) => {
    const {id} = req.params
    res.setHeader('Content-Type', 'application/json');
    let veiculo = await Veiculo.findById(id).exec()
    let registro = await Registros.findOne({'veiculo.placa': veiculo.placa});
    if(registro){
        if(registro.statusVisita === 'presente'){
            res.send({status: 'veiculo ja se encontra na lista de entrada'})
            return;
        }else{
            registro.statusVisita = 'presente'
            registro.horaEntrada = new Date()
            registro.save();
            res.send({status: `veiculo de placa ${veiculo.placa} entrou`})
            return;
        }
    }
        const registroDeEntrada = new Registros({
        statusVisita: "presente",
        horaEntrada: new Date(),
        horaSaida: null,
        veiculo: veiculo
    }) 
   
    let novoRegistro = await registroDeEntrada.save();
    //res.send(JSON.stringify(novoRegistro, 4, null)) 
    if(novoRegistro)
        res.send({status: `Registro do carro${novoRegistro.veiculo?.placa} inserido`})
    else
        res.send({status: 'erro ao inserir novo regitro de entrada'}) 

    /* 
    */
}
const registrarSaida = async (req, res) => {
    const {id} = req.params
    res.setHeader('Content-Type', 'application/json');
    let registro = await Registros.findById(id).exec();
    registro.statusVisita = "ausente";
    registro.horaSaida = new Date();
    registro = await registro.save();
    if(registro)
        res.send({status: `Veiculo [${registro.veiculo.placa}] saiu`})
}

//IMPLEMENTAR DELETAR REGISTRO DE ENTRADA

module.exports = { 
    getAllRegistroDeEntrada,
    salvarRegistroDeEntrada, 
    registrarSaida 
}