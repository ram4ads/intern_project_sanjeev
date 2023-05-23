import React, { createContext, useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route,NavLink  } from 'react-router-dom';
import Tab1 from './FirstTab';
import Tab2 from './SecondTab';
import Tab3 from './ThirdTab';
export const TabContext = createContext();

const useTabContext = () => useContext(TabContext);

const TabProvider = ({ children }) => {
  const [imagesrc, setimagesrc] = useState("");
  const [signature,setsignature]=useState("")
  const [formsubmistion,setformsubmistion] = useState(false)
  const [successfull,setsuccessfull] = useState('')
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [lastName, setLastName] = useState(""); 
  const [gender,setgender]=useState("male")

  const uploadImage = (image) => {
    setimagesrc(image);
  };
  const uploadSignature=(signature)=>{
    setsignature(signature)
  }

  const value = {
    name,
    setName,
    imagesrc,
    email,
    setEmail,
    lastName,
    setLastName,
    gender,
    setgender,
    uploadImage,
    signature,
    uploadSignature,
    formsubmistion,
    setformsubmistion,
    successfull,
    setsuccessfull
  };

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
};






const App = () => {
  return (
    <Router>
      <TabProvider>
        <div>
          <nav>
            <ul className='navbar'>
              <li>
                <NavLink  exact to="/" activeClassName='active'>Tab 1</NavLink >
              </li>
              <li>
                <NavLink  to="/tab2" activeClassName='active'>Tab 2</NavLink >
              </li>
              <li>
                <NavLink  to="/tab3" activeClassName='active'>Tab 3</NavLink >
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Tab1 />} />
            <Route path="/tab2" element={<Tab2 />} />
            <Route path="/tab3" element={<Tab3 />} />
          </Routes>
        </div>
      </TabProvider>
    </Router>
  );
};

export default App;
