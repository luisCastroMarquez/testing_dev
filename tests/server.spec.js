const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  // Test 1: GET /cafes devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto.
  it("Obteniendo un 200 y un arreglo con al menos 1 objeto", async () => {
    const response = await request(server).get("/cafes").send();
    const status = response.statusCode;

    console.log('Test 1 - Status Code:', status);
    console.log('Test 1 - Response Body:', response.body);

    expect(status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // Test 2: Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe.
  it("Eliminando un café con un id que no existe devuelve un 404", async () => {
    const response = await request(server).delete("/cafes/7").send();
    const status = response.statusCode;

    console.log('Test 2 - Status Code:', status);
    console.log('Test 2 - Response Body:', response.body);

    expect(status).toBe(404);
  });

  // Test 3: Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201.
  it("Agregando un nuevo café devuelve un 201", async () => {
    const newCafe = {
      id: 5,
      nombre: "Latte"
    };

    const response = await request(server).post("/cafes").send(newCafe);
    const status = response.statusCode;

    console.log('Test 3 - Status Code:', status);
    console.log('Test 3 - Response Body:', response.body);

    expect(status).toBe(201);
  });

  // Test 4: Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload.
  it("Intento de actualizar con id diferente en parámetros devuelve un 400", async () => {
    const updatedCafe = {
      id: 4,
      nombre: "Café Actualizado"
    };

    const response = await request(server).put("/cafes/6").send(updatedCafe);
    const status = response.statusCode;

    console.log('Test 4 - Status Code:', status);
    console.log('Test 4 - Response Body:', response.body);

    expect(status).toBe(400);
  });

});