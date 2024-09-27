const express = require("express");
const router = express.Router();
const controlador_pedidos = require("../controladores/control_pedidos");

router.get("", controlador_pedidos.listPedidos);
router.get("/:id", controlador_pedidos.getPedidos);
router.post("", controlador_pedidos.createPedidos);
router.post("/:id", controlador_pedidos.updatePedidos);
router.delete("/:id", controlador_pedidos.deletePedido);

module.exports = router;