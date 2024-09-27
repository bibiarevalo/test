const db = require("../db.json");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const listPedidos = async (req, res) => {
    var pedidos = db.pedidos
    res.json(pedidos)
}

const getPedidos = async (req, res) => {
    const _id = req.params.id;
    const lista_pedidos = db.pedidos;
    const pedidos = lista_pedidos.find((pedido) => pedido.id == _id);
    pedido ? res.send(pedido) : res.status(404).send({ error: "not found" });
};

const createPedidos = async (req, res) => {
    const dados = req.body;
    if (!dados.cliente_id || !dados.itens) {
      return res.status(406).send({ error: "Id do cliente ou itens deve ser informado" });
    }
    const _id = uuidv4();
    dados.id = _id;
    db.pedidos.push(dados);
    fs.writeFile("./db.json", JSON.stringify(db), (err) => {
      if (err) {
        res.status(500).send({ error: "erro no servidor" });
      }
    });
    res.status(204).send();
  };

  const updatePedidos = async (req, res) => {
    const _id = req.params.id;
    const dados = req.body;
    const lista_pedidos = db.pedidos;
    const pedidos = list_pedidos.find((pedido) => pedido.id == _id);
    if (!pedido || !dados) {
      return res.status(404).send({ error: "not found" });
    }
  };

  const deletePedido = async (req, res) => {
    const _id = req.params.id;
    const lista_pedidos = db.pedidos;
    const pedido = lista_pedidos.find((pedido) => pedido.id == _id);
  };

  module.exports = {
    listPedidos,
    getPedidos,
    createPedidos,
    updatePedidos,
    deletePedido,
  };