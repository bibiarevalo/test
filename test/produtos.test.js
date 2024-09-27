const request = require("supertest");
const app = require("../index");



describe("GET/produtos", () => {
  it("pegar a lista de produtos com sucesso", async () => {
    const res = await request(app).get("/produtos").send();
    expect(res.status).toBe(200);
  });
  it("verificar se a lista de produtos esta cheia", async () => {
    const res = await request(app).get("/produtos").send();
    expect(res.body).toBeDefined();
    //espera o corpo da requisição
  });
});

describe("POST/produtos", () => {
  it("criar um produto com sucesso", async () => {
    const res = await request(app).post("/produtos").send({
      nome: "teste jest",
      descricao: "teste_descricao",
      preco: 23,
    });
    expect(res.status).toBe(200);
  });
  it("atualizar um dado do produto", async () => {
    const res = await request(app).post("/produtos/3").send({
       nome:'bea updade' 
    });
    expect(res.status).toBe(201)
  });
});

describe("DELETE/produtos/:id", () => {
  it("deletar um produto", async () => {
    const res = await request(app).delete("/produtos/5a2aaff7-8c96-4c9a-a47b-cd14019383f6").send();
    expect(res.status).toBe(204); 
})
  
})


module.exports = {
  testTimeout: 1000, 
};
