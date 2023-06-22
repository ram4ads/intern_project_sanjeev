
const express = require('express');
const {graphqlHTTP}= require('express-graphql')
const { buildSchema }= require('graphql')


const users = [
  {
    id: '1',
    name: 'one',
    friends: ['2', '3'],
  },
  {
    id: '2',
    name: 'two',
    friends: [ '6'],
  },
  {
    id: '3',
    name: 'three',
    friends: ['1', '5'],
  },
  {
    id: '4',
    name: 'four',
    friends: ['5'],
  },
  {
    id: '5',
    name: 'five',
    friends: ['3','4'],
  },
  {
    id: '6',
    name: 'six',
    friends: ['2'],
  },
];

// GraphQL schema
const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    friends: [User]!
  }

  type Query {
    user(id: ID!): User
  }
`);

  //<======================================>//
  // Helper function to fetch friends of friends
// Helper function to fetch friends of friends
// const fetchFriendsOfFriends = (userId, visited = []) => { //1 visited=[1,]
//     const user = users.find((user) => user.id === userId);
//     if (!user) {
//       throw new Error('User not found');
//     }  
  
//     // Check if the user has already been visited
//     if (visited.includes(user.id)) {
       
//       return [];
//     }

//     visited.push(user.id); // Mark the user as visited
    
  
//     const friendsOfFriends = user.friends.flatMap((friendId) => {
//       const friend = users.find((friend) => friend.id === friendId);  //2
     
//       if(visited.includes(friend.id)){

//         return []
//       }
     

    
//       return [
//         {
//           id: friend.id, //2 ,
//           name: friend.name,//
//           friends: fetchFriendsOfFriends(friend.id, visited),//call the function with id 2(name,id),1(null),3(name,id)
//         },
//         ...friend.friends.map((friendOfFriendId) => {
//           const friendOfFriend = users.find(
//             (friend) => friend.id === friendOfFriendId 
        
//           );
       
//             return {
//                 id: friendOfFriend.id,
//                 name:friendOfFriend.name,
//                 friends:[]
              
//               };
         
          
//         }),
//       ];
//     });

//     return friendsOfFriends;

   
//   };

const fetchFriendsOfFriends=(userId,visited=[],output=[])=>{
  if(visited.includes(userId)){
    return;
  }
  visited.push(userId)
  

  const newuser=users.find(user=>user.id===userId)
  output.push({"name":newuser.name,"id":newuser.id})
  newuser.friends.map(friendId=>{

    fetchFriendsOfFriends(friendId,visited,output)
    
  })
  return output
    
}



  
  // Resolver functions
  
  

  
  // Resolver functions
  const root = {
    user: ({ id }) => {
      const user = users.find((user) => user.id === id);
      if (!user) {
        throw new Error('User not found');
      }
  
      const friendsOfFriends = fetchFriendsOfFriends(user.id);
      console.log(friendsOfFriends,"friends of friends")
      return {
        id: user.id,
        name: user.name,
        friends: friendsOfFriends,
      };
    },
  };
  

// Create an Express app
const app = express();

// Mount the GraphQL endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // Enable GraphiQL for testing
  })
);



const port = 4500;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/graphql`);
});
