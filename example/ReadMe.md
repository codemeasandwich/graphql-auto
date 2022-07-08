```js
fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query:'query($l: String){ User(lastname:$l){name, fName:firstname, bio{about} } }',
	variables: { l:"ww" }
  })
})
.then(r => r.json())
.then(data => console.log('data returned:', data));
```