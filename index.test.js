const graphql    = require('graphql');
const path       = require("path");
const graphQlAuto = require('./index')

const qlSchema = graphQlAuto(path.join(__dirname, '/example/api'))

 describe("abc", () => {
    test("should do ..",()=>{
        
        return graphql.graphql({ schema:qlSchema,
                                 source:'{ User(id:"ww"){name, fName:firstname, bio{about} } }' })
                        .then(({data}) => {
                            expect(data.User).toMatchObject({name:"Ashlyn",bio:{about:"Yo"},fName:"boom"})
                 });
        
        
    })
 })


