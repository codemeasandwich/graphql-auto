const graphql    = require('graphql');
const path       = require("path");
const graphQlAuto = require('./index')
const data = require('./example/data.json')

// load examples
const qlSchema = graphQlAuto(path.join(__dirname, '/example/api'))

function graph(source) {
    return graphql.graphql({ schema:qlSchema, source })
}

describe("Check transformations", () => {
    test("should transformer types files",()=>{

    })
    test("should transformer args files",()=>{

    })
})

describe("Check Querys", () => {
    test("should check args",()=>{
        const user = data.users.find(user => user.id === 3)
        return graph(' { user(id:3){name, alias:username } }')
                        .then((result) => {
                         //   console.log(result)
                            expect(result.data.user).toMatchObject({name:user.name,alias:user.username})
                 });
    })
    test("should without args",()=>{
        const user = data.users[0]
        return graph(' { user{name, website } }')
                      .then((result) => {
                     //       console.log(result)
                          expect(result.data.user).toMatchObject({
                            name:user.name,
                            website:user.website
                          })
                      });
    })
    test("should enforce types",()=>{
        const user = data.users[0]
        return graph(' { user{ foo } }')
                      .then(({errors}) => {
                          expect(errors[0].message).toContain('Cannot query field "foo" on type "user".')
                      });
    })
    test("should percest input",()=>{

    })
    test("should check for errors at graphQL level",()=>{
        const user = data.users[0]
        return graph(' { user(){name, website } }' )
                      .then(({errors}) => {
                          expect(errors[0].message).toContain('Syntax Error: Expected Name')
                      });
    })
    test("should check for errors at function level",()=>{
        const user = data.users.find(user => user.id === 3)
        return graph(' { user(id:0){name, alias:username } }')
                      .then(({errors}) => {
                          expect(errors[0].message).toContain('Bad ID value')
                      });
    })
 })

describe("Check Mutations", () => {
    test.skip("should check args",async ()=>{
        const result1 = await graph('{ posts{ id } } ')
       
        const oldCountOfPost = result1.posts.length
        const newPost = { userId : 99, title: "foo", body: "bar" }
        
        const result2 = await graph(' mutation { post{ id } } ')
        const savedPost = result2.data.post
        for(key in newPost){
            expect(newPost[key]).toBe(savedPost[key])
        }
        
        const result3 = await graph('{ posts{ id } } ')
        const newCountOfPost = result3.posts.length
        
        expect(newCountOfPost).toBe(1+oldCountOfPost)

    })
    test("should enforce types",()=>{

    })
})
