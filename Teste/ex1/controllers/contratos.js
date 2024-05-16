var Contrato = require('../models/contratos')

module.exports.list = () => {
    return Contrato
        .find()
        .sort({_id : 1})
        .exec()
};

module.exports.findById = id => {
    return Contrato
        .findOne({_id : id})
        .exec()
};

module.exports.update = (id,cont) => {
    return Contrato
        .findByIdAndUpdate(id, cont, {new : true})
        .exec()
};

module.exports.create = cont => {
    var newContrato = new Planta(cont)
    return newContrato
        .save()
};

module.exports.remove = id => {
    return Contrato
        .findByIdAndDelete({_id : id})
        .exec()
};

module.exports.getEntidade = (ent) => {
    return Contrato
        .find({entidade_comunicante : ent})
        .exec()
}

module.exports.getTipo = (tip) => {
    return Contrato
        .find({tipoprocedimento : tip})
        .exec()
}

module.exports.listEntidades = () => {
    return Contrato
        .find({}, { entidade_comunicante: 1, _id: 0 })
        .sort({ entidade_comunicante: 1 })
        .distinct('entidade_comunicante')
        .exec();
};

module.exports.listTipos = () => {
    return Contrato
        .find({}, { tipoprocedimento: 1, _id: 0 })
        .sort({ tipoprocedimento: 1 })
        .distinct('tipoprocedimento')
        .exec();
};

module.exports.getNIPCName = entidade => {
    return Contrato.aggregate([
        { $match: { entidade_comunicante: entidade } }, // Filtra pelos contratos da entidade específica
        {
            $group: {
                _id: "$entidade_comunicante",
                nipcs: { $push: "$_id" },
                total: { $sum: 1 }
            }
        }
    ]).exec();
};
