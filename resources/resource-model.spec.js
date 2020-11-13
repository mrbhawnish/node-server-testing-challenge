
const db = require('../data/connection');
const dbModel = require('./resource-model');

beforeEach(async () => {   // Make sure there are no tables before each test starts
    await db('resources').truncate()   // and will reset all of the id's so we start with 1 again
}) 

describe("Model Test" , () => {
    describe("[getAll()]" , () => {
       it("test our getAll()", async() => {
        const resources = await dbModel.getAll()
        expect(resources).toHaveLength(0)
       })

       it("gets all of the resources", async () => {
         await db("resources").insert({id: 1, name: "somethingnew"})
        const ourResource = await dbModel.getAll()
        expect(ourResource).toHaveLength(1)
       })

    })


    describe("[create()]" , () => {

        it("succesfully creates a resource", async () => {
          await dbModel.create({ name: "newResource"})
          const ourResources = await db("resources")
          expect(ourResources).toHaveLength(1)
            
          //insert a second resource in the database

           await dbModel.create({ name: "newwResource"})
            const newOurResources = await db("resources")
            expect(newOurResources).toHaveLength(2)
          })
        })

        describe("[delete()]" , () => {

            it("succesfully deletes a resource", async () => {
              db("resources").insert({ id: 1, name: "deleteItem" })
               await dbModel.remove(1)
               const getAgain = await db("resources")
               expect(getAgain).toHaveLength(0)
            })

               it("succesfully returns the item to delte", async () => {
               db("resources").insert({ id: 1, name: "deleteditem" })
               await dbModel.remove(1)
               const getOnceAgain = await db("resources")
               expect(getOnceAgain).toHaveLength(0)
             
            })
        })
    })
