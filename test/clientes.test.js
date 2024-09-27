const request = require("supertest");
const app = require("../index");

describe("GET/clientes", () => {
  it("pegar a lista de clientes com sucesso", async () => {
    const res = await request(app).get("/clientes").send();
    expect(res.status).toBe(200);
  });
  it("verificar se a lista de clientes esta cheia", async () => {
    const res = await request(app).get("/clientes").send();
    expect(res.body).toBeDefined();
  });
});

describe("GET/produtos/:id", () => {
  it("deve listar um produto pelo ID", async () => {
    const res = await request(app).get("/produtos/8de057a1-6eca-4c68-a587-162b20e3b66e").send();
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", "8de057a1-6eca-4c68-a587-162b20e3b66e");
  });
});

describe("POST/clientes", () => {
  it("criar um cliente com sucesso", async () => {
    const res = await request(app).post("/clientes").send({
      nome: "teste jest",
      email: "testejest@gmail.com",
      senha: "test123", 
    });
    expect(res.status).toBe(204);
  });
  it("atualizar um dado do cliente", async () => {
    const res = await request(app).post("/clientes/1").send({
       nome:'bea updade' 
    });
    expect(res.status).toBe(200)
  });
});

describe("DELETE/clientes/:id", () => {
  it("deletar um cliente", async () => {
    const res = await request(app).delete("/clientes/2").send();
    expect(res.status).toBe(204); 
})
  
})

module.exports = {
  testTimeout: 10000, 
};
