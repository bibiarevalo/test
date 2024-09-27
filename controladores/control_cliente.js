const db = require("../db.json");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const bcryptjs = require('bcryptjs');

const listClientes = async (req, res) => {
  var clientes = db.clientes;
  res.json(clientes);
};

const getCliente = async (req, res) => {
  const _id = req.params.id;
  const lista_cliente = db.clientes;
  const cliente = lista_cliente.find((cliente) => cliente.id == _id);
  cliente ? res.send(cliente) : res.status(404).send({ error: "not found" });
};

const createCliente = async (req, res) => {
  const dados = req.body;
  if (!dados.nome || !dados.email) {
    return res.status(406).send({ error: "Nome e email deve ser informado" });
  }
  const _id = uuidv4();
  const senhaCriptografada = await bcryptjs.hash(dados.senha, 10);
  dados.senha = senhaCriptografada;
  dados.id = _id;
  db.clientes.push(dados);
  fs.writeFile("./db.json", JSON.stringify(db), (err) => {
    if (err) {
      res.status(500).send({ error: "erro no servidor" });
    }
  });
  res.status(204).send();
};

const updateCliente = async (req, res) => {
  const _id = req.params.id;
  const dados = req.body;
  const lista_cliente = db.clientes;
  const cliente = lista_cliente.find((cliente) => cliente.id == _id);
  if (!cliente || !dados) {
    return res.status(404).send({ error: "not found" });
  }
  for (const dado in dados) {
    if (!dado in cliente) {
      console.log("erro esse dado não existe");
      continue;
    }
    cliente[dado] = dados[dado];
    fs.writeFile("./db.json", JSON.stringify(db), (err) => {
      if (err) {
        res.status(500).send({ error: "erro no servidor" });
      }
    });
    res.status(200).send({ cliente });
  }
};

const deleteCliente = async (req, res) => {
  const _id = req.params.id;
  const list_cliente = db.clientes;
  const cliente = list_cliente.find((cliente) => cliente.id == _id);

  var idx = list_cliente.indexOf(cliente);
  list_cliente.splice(idx, 1);
  fs.writeFile("./db.json", JSON.stringify(db), (err) => {
    if (err) {
      res.status(500).send({ error: "erro no servidor" });
    }
  });
  res.status(204).send();
};

module.exports = {
  listClientes,
  getCliente,
  createCliente,
  updateCliente,
  deleteCliente,
};
