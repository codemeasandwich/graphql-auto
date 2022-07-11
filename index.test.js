const graphql    = require('graphql');
const path       = require("path");
const graphQlAuto = require('./index')
const data = require('./example/data.json')

// load examples
const qlSchema = graphQlAuto(path.join(__dirname, '/example/api'))

describe("Check transformations", () => {
    test("should transformer types files",()=>{

    })
    test("should transformer args files",()=>{

    })
})

describe("Check Querys", () => {
    test("should check args",()=>{
        const user = data.users.find(user => user.id === 3)
        return graphql.graphql({ schema:qlSchema,
                                 source:' { User(id:3){name, alias:username } }' })
                        .then(({data}) => {
                            expect(data.User).toMatchObject({name:user.name,alias:user.username})
                 });
    })
    test("should without args",()=>{
        const user = data.users[0]
        return graphql.graphql({ schema:qlSchema,
                                 source:' { User{name, website } }' })
                      .then((result) => {
                          expect(result.data.User).toMatchObject({
                            name:user.name,
                            website:user.website
                          })
                      });
    })
    test("should enforce types",()=>{
        const user = data.users[0]
        return graphql.graphql({ schema:qlSchema,
                                 source:' { User{ foo } }' })
                      .then(({errors}) => {
                          expect(errors[0].message).toContain('Cannot query field "foo" on type "user".')
                      });
    })
    test("should percest input",()=>{

    })
    test("should check for errors at graphQL level",()=>{
        const user = data.users[0]
        return graphql.graphql({ schema:qlSchema,
                                 source:' { User(){name, website } }' })
                      .then(({errors}) => {
                          expect(errors[0].message).toContain('Syntax Error: Expected Name')
                      });
    })
    test("should check for errors at function level",()=>{
        const user = data.users.find(user => user.id === 3)
        return graphql.graphql({ schema:qlSchema,
                                 source:' { User(id:0){name, alias:username } }' })
                      .then(({errors}) => {
                          expect(errors[0].message).toContain('Bad ID value')
                      });
    })
 })

describe("Check Mutations", () => {
    test("should check args",()=>{
       /* console.log("aa")
        return graphql.graphql({ schema:qlSchema,
                                 source:'{ User(id:"ww"){name, fName:firstname, bio{about} } }' })
                        .then(({data}) => {
                            expect(data.User).toMatchObject({name:"Ashlyn",bio:{about:"Yo"},fName:"boom"})
                 });*/
    })
    test("should enforce types",()=>{

    })
 })
