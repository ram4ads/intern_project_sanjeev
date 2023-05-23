import React, {createContext, useState} from 'react'


import SignatureInput from './Signature'
export const Globaldata =createContext()
function App() {
  const [uniquedata,setuniqueData]=useState('')
  return (
    <div style={{display:"flex",justifyContent:"center",flexDirection:"column"}}>
      <Globaldata.Provider value={{uniquedata,setuniqueData}}>
      <SignatureInput/>
      </Globaldata.Provider>
    </div>
  )
}

export default App
