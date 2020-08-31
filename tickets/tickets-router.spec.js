const request = require('supertest');
const server = require('../api/server.js');
const db = require('../database/dbConfig.js');

let token;
let userId;

beforeAll(async () => {
    await db.seed.run();
    const credentials = await request(server)
      .post("/api/auth/login")
      .send({ username: "annaOne", password: "password" })
      .expect(200);
  
    token = credentials.body.token;
    userId = credentials.body.id;
  });

describe("GET /tickets", function () {
    it("should throw an error 401 if user does not have a token.", async () => {
        const tickets = await request(server).get("/api/tickets");
        expect(tickets.status).toBe(401);
    });
});