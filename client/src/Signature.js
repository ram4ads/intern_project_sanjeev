import React, { useState, useRef,useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import Webcam from "react-webcam";
import Form from './VoiceAssistant';

const SignatureInput = () => {
  const [signature, setSignature] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  
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
    setSelectedFile(event.target.files[0]);
  };

  const [dateOfBirth, setDateOfBirth] = useState('');

  const maxDate = new Date(1925, 0, 1);

  // Get today's date
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const minDate = `${yyyy}-${mm}-${dd}`;



  //webcam part
 
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
  
    useEffect(() => {
      if (imgSrc) {
        // TODO: Use the imgSrc for further processing or display
      }
    }, [imgSrc]);
  
    const capture = () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
      
    };

  return (
    <><div>
    <input type="file" accept="image/*" onChange={handleFileChange} />
    {selectedFile && (
      <div>
        <h2>Selected Image:</h2>
        <img src={URL.createObjectURL(selectedFile)} alt="Selected" />
      </div>
    )}
  </div>
    <div>
      <SignatureCanvas 
        penColor='black' 
        canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
        ref={sigCanvas}
      />
      <div>
        <button onClick={clearSignature}>Clear</button>
        <button onClick={saveSignature}>Save</button>
      </div>
      {signature && (
        <div>
          <h2>Signature:</h2>
          <img src={signature} alt="Signature" />
        </div>
      )}
    </div>
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
      />
    </div>
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        height={300}
        width={350}
      />
      <button onClick={capture}>Capture photo</button>
      <img src={imgSrc} alt="name"/>
     
    </div>
     <Form Imgsrc={imgSrc} Sigsrc={signature}/>
    </>
  );
};

export default SignatureInput;







  
  