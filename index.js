require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const rotas1 = require("./rotas/rotas_produtos", );
const rotas2 = require("./rotas/rotas_clientes", );
const rotas3 = require("./rotas/rotas_autenticacao", );
const cookieParser = require('cookie-parser')
const swaggerUi = require('swagger-ui-express')

const YAML = require('yamljs')

const swaggerDocument = YAML.load('./docs/documentacao.yaml')

app.use(bodyParser.json());
app.use(cookieParser())

app.use("/produtos", rotas1);
app.use("/clientes", rotas2)
app.use('/auth', rotas3);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(8001);


module.exports = app


