import React, { useRef,useContext} from 'react';
import SignatureCanvas from 'react-signature-canvas';
import Webcam from "react-webcam";
import { TabContext } from './App';

const Tab2 = () => {
    
    const {imagesrc,signature,uploadSignature,uploadImage} =useContext(TabContext)
    
    const webcamRef = useRef("");
    const sigCanvas = useRef(null);
    const clearSignature = () => {
        sigCanvas.current.clear();
        uploadSignature(null);
      };
    
      const saveSignature = () => {
        const data = sigCanvas.current.toDataURL();
        uploadSignature(data);
      };
      const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        uploadImage(imageSrc);
        
      };
    return (
        <div>
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
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            height={300}
            width={350}
          />
          <button onClick={capture}>Capture photo</button>
          <img src={imagesrc} alt="name" />

        </div>
      </div>
    );
  };
  export default Tab2
