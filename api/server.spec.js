const server = require('./server');
const request = require('supertest');  //will mimic to send endpoint requests for testing
const db = require('../data/connection.js')

beforeEach(async () => {   // Make sure there are no tables before each test starts
    await db('resources').truncate()   // and will reset all of the id's so we start with 1 again
}) 

describe("supertest" , () => {
    it("testing the environment", () => {
        expect(process.env.DB_ENV).toBe("testing")
        expect(process.env.DB_ENV).not.toBe("development")
        expect(process.env.DB_ENV).not.toBe("staging")
    })

    describe("Test [GET] endpoint " , () => {
        it("testing the get endpoint", async () => {
            const res = await request(server).get("/")
            expect(res.status).toBe(200)  // testing the status
            expect(res.body).toMatchObject({ api: "up" })   // testing the response
            expect(res.type).toMatch(/json/)         //testing the type

        })
    })

        describe("Test [POST] endpoint " , () => {
            it("testing the POST endpoint", async () => {
                const res = await request(server).post("/resources").send({ name: "barabara" })
                expect(res.status).toBe(200) // testing the status code
                expect(res.body).toMatchObject({ name: "barabara"}) // testing the returned item
                expect(res.type).toMatch(/json/) //testing the type
            })
        })
            describe("Test [DELETE] endpoint " , () => {
                it("testing the DELETE endpoint", async () => {
                    await request(server).post("/resources").send({  name: "barabara" })
                          /*  delete item with id 1 which is barabara*/
                     const res = await request(server).delete("/1")
                    expect(res.status).toBe(200) //testing the status
                    // expect(res.json).toMatchObject({itemToDelete: {id:1, name: "barabara"}}) //testing the response to the client

                })
        
             })


})