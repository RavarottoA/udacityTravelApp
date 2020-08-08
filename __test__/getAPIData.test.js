const request = require("supertest");
//const { app } = require("../src/server/server");
import { app } from '../src/server/server'

const formText = "london";
const whenText = "2020-08-08";

describe("Test the root path", () => {
  test("It should response the GET method", () => {
    return request(app)
      .get("/traerDatos?name=" + formText + "&when=" + whenText)
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});