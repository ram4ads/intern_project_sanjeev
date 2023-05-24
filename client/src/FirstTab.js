import React, { useState,useContext } from 'react';
import { TabContext } from './App';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const Tab1 = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const maxDate = new Date(1925, 0, 1)
  const {name,email,lastName,setName,setEmail,setLastName,gender,setgender,imagesrc,signature,setsuccessfull,setformsubmistion,uploadImage,uploadSignature} =useContext(TabContext)

  const commands = [
    {
      command: "first*",
      callback: (name) => {
        setName(name);
        speak("Please tell me your lastName address");
      },
    },
    {
      command: "last*",
      callback: (lastName) => {
        setLastName(lastName);
        speak("Please tell me your email address");
      },
    },
    {
      command: "mail*",
      callback: (email) => {
        setEmail(email);
        speak("Please tell me your Gender");
      },
    },
    {
      command: "gender*",
      callback: (gender) => {
        setgender(gender);
        speak("Ready to submit. Say 'Submit' to submit the form");
      },
    },
    {
      command: "Submit",
      callback: () => submitForm(),
    },
  ];
  const { transcript } = useSpeechRecognition({ commands });
  const handleGenderChange = (e) => {
    setgender(e.target.value);
  };

  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speechSynthesis.speak(speech);
  };
  
const submitForm = () => {
  console.log('data is fetching')
  fetch("http://localhost:7005/postdata",{ method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    firstname:name,
    lastname:lastName,
    email:email,
    gender:gender,
    image:imagesrc,
    signature:signature
  })
}).then(data=>console.log(data))
}

const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const startListening = () => {
    // setCurrentInput("name");
    speak("Please tell me your firstname");
    SpeechRecognition.startListening({ continuous: true });
  };
 
   // Get today's date
   const today = new Date();
   const yyyy = today.getFullYear();
   const mm = String(today.getMonth() + 1).padStart(2, '0');
   const dd = String(today.getDate()).padStart(2, '0');
   const minDate = `${yyyy}-${mm}-${dd}`;
    
    return (
      <div>
         <div>
                <div>
        <label htmlFor="name">FirstName</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          // disabled={currentInput !== "name"}
        />
        <label htmlFor="name">LastName</label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          // disabled={currentInput !== "lastName"}
        />
  
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          // disabled={currentInput !== "email"}
        />
  
  <div>
        <label>Gender:</label>
        <div>
          <label>
            <input
              type="radio"
              value="male"
             
              checked={gender === '' || gender==="male"}
              onChange={handleGenderChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              value="female"
              checked={gender === 'female'}
              onChange={handleGenderChange}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              value="other"
              checked={gender === 'other'}
              onChange={handleGenderChange}
            />
            Other
          </label>
        </div>
        <input type="hidden" name="gender" value={gender} />
      </div>
  
        <button onClick={startListening} >
          Activate voice assistant
        </button>
        <button onClick={()=>submitForm()}>submit</button>
        <div>
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  max={minDate}
                  min={maxDate.toISOString().split('T')[0]}
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                />
              </div>
      </div>
      
      <input type="file" accept="image/*" onChange={handleFileChange} />
              {selectedFile && (
                <div>
                  <h2>Selected Image:</h2>
                  <img src={URL.createObjectURL(selectedFile)} alt="Selected" />
                </div>
              )} 
                
              </div>
      </div>
    );
  };
  export default Tab1
