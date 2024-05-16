var express = require('express');
var router = express.Router();
var Contrato = require('../controllers/contratos')

router.get('/', function(req, res) {
    if (req.query && Object.keys(req.query).length > 0) {
        if (req.query.tipo) {
            Contrato.getTipo(req.query.tipo)
                .then(dados => res.jsonp(dados))
                .catch(erro => res.jsonp(erro))
        }
        else if (req.query.entidade) {
            Contrato.getEntidade(req.query.entidade)
                .then(dados => res.jsonp(dados))
                .catch(erro => res.jsonp(erro))
        }
    }
    else {
        Contrato.list()
            .then(data => res.jsonp(data))
            .catch(erro => res.jsonp(erro))
    }
});

router.get('/entidade/:id/nomeEntidade', function (req, res, next) {
    Contrato.getNIPCName(req.params.id)
        .then(data => {
            console.log(data)
            res.jsonp(data)})
        .catch(erro => res.jsonp(erro))
});


router.get('/entidades', function (req, res, next) {
    Contrato.listEntidades()
        .then(data => res.jsonp(data))
        .catch(erro => res.jsonp(erro))
});

router.get('/tipos', function (req, res, next) {
    Contrato.listTipos()
        .then(data => res.jsonp(data))
        .catch(erro => res.jsonp(erro))
});

router.get('/:id', function(req, res) {
    Contrato.findById(req.params.id)
        .then(data => res.jsonp(data))
        .catch(erro => res.jsonp(erro))
});

router.post('/', function(req, res) {
    Contrato.create(req.body)
        .then(data => res.jsonp(data))
        .catch(erro => res.jsonp(erro))
});

router.put('/:id', function(req,res) {
    Contrato.update(req.params.id, req.body)
        .then(data => res.jsonp(data))
        .catch(erro => res.jsonp(erro))
});

router.delete('/:id', function(req,res) {
    Contrato.remove(req.params.id)
        .then(console.log("Deleted " + req.params.id))
        .catch(erro => res.jsonp(erro))
});

module.exports = router;