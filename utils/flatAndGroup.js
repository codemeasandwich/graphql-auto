const fs   = require('fs');
const path = require('path');

const separator = "|"

function flat(object) {
  
  return Object.keys(object).reduce((all,key) => {
      const item = object[key]
      if ("object" === typeof item) {
        const group = flat(item)
        for(p in group){
          all[key+separator+p] = group[p]
        }
      } else {
        all[key] = item
      }
      return all
  },{})
} // END flat

module.exports = function group(object) {
  const handlers = flat(object)
  const topLevelGroups = {}
  for(let path in handlers){
    const elemets = path.split(separator)
    const topLevel = elemets.pop()
    topLevelGroups[topLevel] = topLevelGroups[topLevel] || []
    topLevelGroups[topLevel].push([elemets.reverse(),handlers[path]])
  }
 // console.log(topLevelGroups)
  return topLevelGroups
} //END group
/*
var object = { post: 
    { comment: {
        create:{ mutation:()=>{} },
        remove:{ mutation:()=>{} }
      },
      mutation:()=>{},
      query:()=>{},
      remove: {
          mutation:()=>{}
        }
    },
   user: { query:()=>{} }
}*/