

import React, { useState, useRef, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import Webcam from "react-webcam";

import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";



const SignatureInput = () => {
  const [signature, setSignature] = useState("");
  const [selectedFile, setSelectedFile] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');
  const [activeTab, setActiveTab] = useState(1);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const maxDate = new Date(1925, 0, 1);
  const webcamRef = useRef("");
  const [imgSrc, setImgSrc] = useState("image");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [currentInput, setCurrentInput] = useState("");
  const [gender,setgender]=useState("male")
  const [successfull,setsuccessfull]=useState('')
const [control,setcontrol]=useState(false)

  const commands = [
    {
      command: "first*",
      callback: (name) => {
        setName(name);
        // setCurrentInput("lastName");
        speak("Please tell me your lastName address");
      },
    },
    {
      command: "last*",
      callback: (lastName) => {
        setLastName(lastName);
        // setCurrentInput("email");
        speak("Please tell me your email address");
      },
    },
    {
      command: "mail*",
      callback: (email) => {
        setEmail(email);
        // setCurrentInput("gender");
        speak("Please tell me your Gender");
      },
    },
    {
      command: "gender*",
      callback: (gender) => {
        setgender(gender);
        setCurrentInput("submit");
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
  
  const submitFormcheking=()=>{
    if(captcha===captchaValue){
      submitForm()
     
     
    }
    else{
      setCaptcha(generateCaptcha())
      setsuccessfull('entered the captcha correctly')
    }
  }
  

  const submitForm = () => {
    console.log('data is fetching')
    fetch("http://localhost:7000/postdata",{ method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstname:name,
      lastname:lastName,
      email:email,
      gender:gender,
      image:imgSrc,
      signature:signature,
      dateOfBirth:dateOfBirth,
      file:selectedFile
    })
  }).then(data=>{ setsuccessfull("submitted successfully")
  console.log(data)})
  console.log(typeof(email),name,gender)
  setcontrol(false)
  setCaptchaValue("")
  setName('')
  setEmail('')
  setLastName('')
  setImgSrc('image')
  setSignature('')
  setDateOfBirth("")
  setSelectedFile("")
}


  const startListening = () => {
    // setCurrentInput("name");
    speak("Please tell me your firstname");
    SpeechRecognition.startListening({ continuous: true });
  };
 
  
    useEffect(() => {
      setCaptcha(generateCaptcha())
    }, []);
  
    const capture = () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
      
    };
   

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setsuccessfull("")
    setCaptchaValue("")
    setCaptcha(captcha)
    console.log(captcha,"captcha")
    return captcha;
   
  };
  const setCaptchaValuefun=(value)=>{
    setCaptchaValue(value)
   
  }
  
  const sigCanvas = useRef(null);

  const clearSignature = () => {
    sigCanvas.current.clear();
    setSignature(null);
  };

  const saveSignature = () => {
    const data = sigCanvas.current.toDataURL();
    setSignature(data);
  };
  const handleFileChange = (event) => {
    setSelectedFile(URL.createObjectURL(event.target.files[0]));
  };

  // Get today's date
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const minDate = `${yyyy}-${mm}-${dd}`;


  

 

  const handleTabClick = (tabNumber) => {
    if (tabNumber === 2 && !isTab1Valid()) {
      alert('Please fill in all the details in Tab 1 before proceeding to Tab 2.');
      return;
    }

    if (tabNumber === 3 && !isTab2Valid()) {
      alert('Please fill in all the details in Tab 2 before proceeding to Tab 3.');
      return;
    }

    setActiveTab(tabNumber);
  };

  const isTab1Valid = () => {
    // Check if all required fields in Tab 1 are filled
    return selectedFile !== null;
  };

  const isTab2Valid = () => {
    // Check if all required fields in Tab 2 are filled
    return signature !== null && dateOfBirth !== '';
  };

  // Rest of the code...
console.log(selectedFile,"file type")
console.log(signature,"signature")
console.log(imgSrc,"image")

  return (
    <>
      <div className='container'>
        <div>
          <div className="tabs">
            <button
              className={activeTab === 1 ? 'active' : 'tab'}
              onClick={() => handleTabClick(1)}
            >
              Tab 1
            </button>
            <button
              className={activeTab === 2 ? 'active' : 'tab'}
              onClick={() => handleTabClick(2)}
            >
              Tab 2
            </button>
            <button
              className={activeTab === 3 ? 'active' : 'tab'}
              onClick={() => handleTabClick(3)}
            >
              Tab 3
            </button>
          </div>

          {activeTab === 1 && (
            <div className='tab_container1'>
               <div>
              <img src="passport-4841579_960_720.jpg" alt="passport image" className='image'/>

                </div>
              <div className='mini-container'>
      <label htmlFor="name" className='label'>FirstName</label>
      <input
      className='currentinput'
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        // disabled={currentInput !== "name"}
      />
      <label htmlFor="name" className='label'>LastName</label>
      <input
       className='currentinput'
        id="lastName"
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        // disabled={currentInput !== "lastName"}
      />

      <label htmlFor="email" className='label'>Email</label>
      <input
       className='currentinput'
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        // disabled={currentInput !== "email"}
      />

<div>
      <label className='label'>Gender:</label>
      <div>
        <label className='label'>
          <input
            type="radio"
            value="male"
           
            checked={gender === '' || gender==="male"}
            onChange={handleGenderChange}
          />
          Male
        </label>
        <label className='label'>
          <input
            type="radio"
            value="female"
            checked={gender === 'female'}
            onChange={handleGenderChange}
          />
          Female
        </label>
        <label className='label'>
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

      <button onClick={startListening} className='btn voice_assistance'>
        Activate voice assistant
      </button>
       {/* <Form Imgsrc={imgSrc} Sigsrc={signature} captcha={captcha} captchaValue={captchaValue} setCaptcha={setCaptcha} generateCaptcha={generateCaptcha} /> */}
       <input type="file" accept="image/*" onChange={handleFileChange} className='voice_assistance'/>
              {selectedFile && (
                <div>
                  <h2>Selected Image:</h2>
                  <img src={selectedFile} alt="Selected" className='selectedfile'/>
                </div>
              )}
    </div>
             
              
             
            </div>
            
          )}

          {activeTab === 2 && (
            <div className='tab_container1'>
               <div>
              <img src="passport-4841579_960_720.jpg" alt="passport image" className='image'/>

                </div>
              
              <div className='mini-container'>
              
                <SignatureCanvas
                  penColor='black'
                  
                  canvasProps={{ width: 200, height: 110, className: 'sigCanvas'}}
                  ref={sigCanvas}
                />
                <div style={{margin: "20px"}}>
                 <label className='label'>Signature of the Candidate</label>
                 </div>
                <div >
                  <button onClick={clearSignature} className='btn clear'>Clear</button>
                  <button onClick={saveSignature} className='btn save'>Save</button>
                 
                </div>
                {signature && (
                  <div>
                    <h2>Signature:</h2>
                    <img src={signature} alt="Signature" className='selectedfile'/>
                  </div>
                )}
          
              <div style={{margin:"20px"}}>
                <label htmlFor="dob" className='label'>Date of Birth:</label>
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
              <div className='webcam'>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  height={200}
                  width={350}
                  frameBorder={5}
                />
               <div>
                <div>
              <button onClick={capture} className='btn capturephoto'>Capture photo</button>
              </div>
                <img src={imgSrc} alt="name"  className='webcam_image'/>
                </div>

              </div>
              
            </div>
          
          )}

          {activeTab === 3 && (
            <div className='tab_container third_tab'>
              <div className="thirdtab">
                <label className='label'>Enter Captcha:</label>
                <input
                  type="text"
                  className='currentinput'
                  value={captchaValue}
                  onChange={(e) => setCaptchaValuefun(e.target.value)}
                  required

                />
              </div>

              <div className="captcha-group">
              <div>
                <img src={captcha} alt={captcha} className='captcha'/>
                
                <button type="button" onClick={() => setCaptcha(generateCaptcha())} className='btn captcha_generate'>
                  Generate New Captcha
                </button>
                </div>
                <div>
                <button onClick={()=>submitFormcheking()} className='btn captcha submit'>Submit</button>
                </div>
                {/* <button onClick={()=>setcontrol(true)}>control</button> */}
              <p className='status'>{successfull}</p>
              </div>
              
      
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SignatureInput;
