const request = require("supertest");
const server = require("../server");
const mongoose = require("mongoose");
const User = require("../models/User");
const email = process.env.SUPER_ADMIN_EMAIL;
const password = process.env.SUPER_ADMIN_PASSWORD;
jest.setTimeout(30000);
describe("Test singUp function", () => {
  it("if no data return status 400", (done) => {
    request(server).post("/user/signup").expect(400).end(done);
  });
  it("if user not exist -return 201 and user created", (done) => {
    request(server)
      .post("/user/signup")
      .send({ email: email, password: password })
      .expect(201)
      .end(done);
  });
  it("if user  exist return 401", (done) => {
    request(server)
      .post("/user/signup")
      .send({ email: email, password: password })
      .expect(201)
      .end(done);
  });
});
