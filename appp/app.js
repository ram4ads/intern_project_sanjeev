// client-side app.js

const query = `
  query GetUser {
    user(id: "4") {
      id
      name
      friends {
        id
        name
        
    
      }
    }
  }
`;

fetch('http://localhost:4500/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query }),
})
  .then(response => response.json())
  .then(data => {
    console.log('GraphQL Response:', data);
    const user = data;

console.log(`User ID: ${user.data.user.id}`);
console.log(`User Name: ${user.data.user.name}`);
console.log(`User Name: ${user.data.user.value}`);

console.log("Friends:",user.data.user.friends);
user.data.user.friends.forEach((friend) => {
  console.log(`Friend ID: ${friend.id}`);
  console.log(`Friend Name: ${friend.name}`);
  console.log('friends',friend)
});
    // Process the response data here
  })
  .catch(error => {
    console.error('GraphQL Request Error:', error);
    // Handle errors here
  });
