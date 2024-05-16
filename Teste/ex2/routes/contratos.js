var express = require('express');
var router = express.Router();
var axios = require("axios")

router.get('/', function(req,res) {
    var d = new Date().toISOString().substring(0,16)
        axios.get("http://api:16000/contratos")
            .then(resp => {
                var cont = resp.data
                res.status(200).render("listaContratos", {"lContratos" : cont, "date" : d})
            })
            .catch(erro => {
                res.status(501).render("error", {"error" : erro})
            })
});

router.get('/:id', function (req, res, next) {
    var d = new Date().toISOString().substring(0,16)
    console.log(req.params.id)
    axios.get("http://api:16000/contratos/" + req.params.id)
        .then((result) => {
            res.render("contratoPage", {contrato: result.data, "date" : d});
        }).catch((err) => {
            res.render('error', {error: err})
        });
});

router.get('/entidades/:id', function (req, res, next) {
    axios.get("http://api:16000/contratos/entidade/" + req.params.id + '/nomeEntidade')
    .then((nEntidade) => {
        console.log(nEntidade.data)
        axios.get("http://api:16000/contratos?entidade=" + req.params.id)
        .then((result) => {
            console.log(result.data)
            console.log('TOTAL:' + result.data.length)
            console.log('Entidade:' + result.data[0].entidade_comunicante)
            res.render('entidadePage', {n_registos: result.data.length, nomeEntidade: result.data[0].entidade_comunicante, contrato: result.data})
        }).catch((err) => {
            res.render('error', {error: err})
        });
    }).catch((err) => {
        res.render('error', {error: err})
    });
});






















module.exports = router;