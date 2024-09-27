const express = require("express");
const router = express.Router();
const controlador_clientes = require("../controladores/control_cliente");
const { validadorDeCookie } = require("../middlewares/cookie_validator");


router.get("", validadorDeCookie, controlador_clientes.listClientes);
router.get("/:id",validadorDeCookie, controlador_clientes.getCliente);
router.post("", controlador_clientes.createCliente);
router.post("/:id", validadorDeCookie, controlador_clientes.updateCliente);
router.delete("/:id",validadorDeCookie, controlador_clientes.deleteCliente);

module.exports = router;
