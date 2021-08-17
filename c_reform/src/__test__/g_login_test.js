const request = require("supertest");
const server = require("../../server");
const mongoose = require("mongoose");
const User = require("../models/User");

const email = process.env.SUPER_ADMIN_EMAIL;
const password = process.env.SUPER_ADMIN_PASSWORD;
jest.setTimeout(30000);

/* remove user if exist for the test */
User.findOneAndRemove({ email: email });

describe("Test login fonction", () => {
  it("if user not exist  return status 400 and message error_user_not_exist ", (done) => {
    request(server).post("/user/login").expect(400).end(done);
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
