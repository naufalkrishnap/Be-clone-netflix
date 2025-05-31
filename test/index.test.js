require("dotenv").config()
const mongoose = require("mongoose")
const request = require("supertest")
const app = require("../index")

beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URL)
})

afterEach(async () => {
    await mongoose.connection.close()
})

describe('Resource /my-movies', () => {
    it('should return a success message', async () => {
        const response = await request(app).get(
            "/my-movies/naufal1@gmail.com/1234"
        );
        expect(response.statusCode).toBe(200)
        expect(response.body.message).toBe("Get favorit movies suskses")
    });
});
