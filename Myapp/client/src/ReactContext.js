



import React, { createContext, useContext, useState } from 'react';

// Create a new context object
const MyContext = createContext();

// Create a provider component that will provide the context
const MyProvider = ({ children }) => {
  const [name, setName] = useState('John');

  // Wrap the children with the context provider
  return (
    <MyContext.Provider value={{ name, setName }}>
      {children}
    </MyContext.Provider>
  );
};

// Create a child component that will consume the context
const ChildComponent = () => {
  // Consume the context using useContext
  const { name, setName } = useContext(MyContext);

  return (
    <div>
      <p>My name is {name}</p>
      <button onClick={() => setName('Bob child of John')} style={{backgroundColor:"green",width:"200px",height:"55px",borderRadius:"10px",color:"white"}}>child Change Name</button>
      <SubChildComponent/>
    </div>
  );
};

//Create a sub child component that will consume the context

const SubChildComponent = () => {
    // Consume the context using useContext
    const { name, setName } = useContext(MyContext);
  
    return (
      <div>
        <p>My name is {name}</p>
        <button onClick={() => setName('sub child Bob')} style={{backgroundColor:"green",width:"200px",height:"55px",borderRadius:"10px",color:"white"}}>sub child Change Name</button>
        <SuperSubChildComponent/>
      </div>
    );
  };

  ////Create a super sub child component that will consume the context
  const SuperSubChildComponent = () => {
    // Consume the context using useContext
    const { name, setName } = useContext(MyContext);
  
    return (
      <div>
        <p>My name is {name}</p>
        <button onClick={() => setName('super sub child Bob')} style={{backgroundColor:"green",width:"200px",height:"55px",borderRadius:"10px",color:"white"}}>super sub child Change Name</button>
        
      </div>
    );
  };

// In your main app component, render the provider component

function ReactContext() {
    return (
      <div>
        <MyProvider>
        <ChildComponent />
      </MyProvider>
      </div>
    )
  }
  
  export default ReactContext
