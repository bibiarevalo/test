const express = require("express");
const router = express.Router();
const controlador_produtos = require("../controladores/control_produtos");
const { validadorDeCookie } = require("../middlewares/cookie_validator");

router.get("",validadorDeCookie, controlador_produtos.listProdutos);
router.get("/:id", validadorDeCookie,controlador_produtos.getProduto);
router.post("", validadorDeCookie,controlador_produtos.createProduto);
router.post("/:id", validadorDeCookie, controlador_produtos.updateProduto);
router.delete("/:id", validadorDeCookie,controlador_produtos.deleteProduto);

module.exports = router;
