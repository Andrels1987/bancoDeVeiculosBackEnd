const {Veiculo, Motorista} = require('../schemas/Veiculo')
const mongoose = require('mongoose');

const getAllVeiculos = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let veiculos = await Veiculo.find({})
    if (veiculos.length === 0)
        return res.send({ message: 'sem registros de veiculos' })
    res.send([...veiculos])
}
const getVeiculoPeloId = async (req, res) => {
    const { id } = req.params
    var isValid = mongoose.Types.ObjectId.isValid(id)
    if (!isValid) {
        return res.send({ id_error: 'O id não é uma string valida' })
    }
    let veiculo = await Veiculo.findById(id).exec();
    if (veiculo)
        return res.send(veiculo)
    res.send({ err: 'nenhum veiculo encontrado' })
}
const getVeiculoPelaPlaca = async (req, res) => {
    const { placa } = req.query

    console.log(placa);
    let veiculo = await Veiculo.findOne({ placa }).exec();
    if (veiculo)
        return res.send(veiculo)
    res.send({ err: 'nenhum veiculo com essa placa' })
}
const salvarVeiculo = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let bodyRequest = req.body

     let motorista = new Motorista ({
        nome: bodyRequest.nomeProprietario,
        numeroDocumento: bodyRequest.documentoProprietario,
        bloco: bodyRequest.bloco,
        apartamento: bodyRequest.apartamento
    }) 
     let newVeiculo = new Veiculo({
        placa: bodyRequest.placa,
        modelo: bodyRequest.modelo,
        marca: bodyRequest.marca,
        cor: bodyRequest.cor,
        foto: bodyRequest.foto,
        vaga: bodyRequest.vaga,
        tipoDeAutorizacao: bodyRequest.tipoDeAutorizacao,
        observacao: bodyRequest.observacao,
        status_de_acesso: bodyRequest.status_de_acesso,
        motorista: motorista
    }) 
    console.log("Veiculo: ", newVeiculo.placa);
    let veiculoExiste = await Veiculo.findOne({"placa": newVeiculo.placa}).exec()
        
    if(veiculoExiste){
        console.log("entrou aqui");
        return res.send({status: "veiculo já existe"})
    }else{
        const saved = await newVeiculo.save()
        if(saved){
            res.send({status: "veiculo salvo com sucesso"})
        }else{
            res.send({status: "erro ao inserir veiculo"})
        } 
    }
    
}
const atualizarVeiculo = async (req, res) => {   
    let veiculo = await Veiculo.findById(req.params.id).exec();
    
    let motorista = new Motorista ({
        nome: req.body.nomeProprietario,
        numeroDocumento: req.body.documentoProprietario,
        bloco: req.body.bloco,
        apartamento: req.body.apartamento
    }) 
   
        veiculo.placa = req.body.placa,
        veiculo.modelo = req.body.modelo,
        veiculo.marca = req.body.marca,
        veiculo.cor = req.body.cor,
        veiculo.foto = req.body.foto || "",
        veiculo.vaga = req.body.vaga,
        veiculo.tipoDeAutorizacao = req.body.tipoDeAutorizacao,
        veiculo.status_de_acesso = req.body.status_de_acesso,
        veiculo.motorista = motorista,
        veiculo.observacao = req.body.observacao 
    
        const saved = await veiculo.save() 
        if(saved){
            console.log(saved);
            res.send({status: "veiculo atualizado com sucesso"})
        }else{
            res.send({status: "erro ao atualizar veiculo"})
        } 
}
//65d4dee63fa66f8211665f3f
//IMPLEMENTAR DELETAR VEICULO



module.exports = { atualizarVeiculo, salvarVeiculo, getAllVeiculos, getVeiculoPeloId, getVeiculoPelaPlaca }