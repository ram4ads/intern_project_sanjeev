import React,{useContext,useState} from "react";
import { TabContext } from "./App";

const Tab3 = () => {
    const {name,email,lastName,setName,setEmail,setLastName,gender,setgender,imagesrc,signature,setsuccessfull,setformsubmistion,uploadImage,uploadSignature,successfull} =useContext(TabContext)
    const [captcha, setCaptcha] = useState('');
    const [captchaValue, setCaptchaValue] = useState('');
    
    const generateCaptcha = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let captcha = '';
        for (let i = 0; i < 6; i++) {
          captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCaptcha(captcha)
        console.log(captcha,"captcha")
        return captcha;
      };
      const setCaptchaValuefun=(value)=>{
        setCaptchaValue(value)
       
      }

// post the data 

const submitForms = () => {
  
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
}).then(data=>{
 
  setsuccessfull("successfully submited")
  setName("")
  setEmail("")
  setLastName("")
  setgender("male")
  uploadImage("")
  setsuccessfull("")
  uploadSignature("")
  console.log(data,"success")
})
}

 return (
      <div>
       <div>
          <div className="form-group">
          <label>Enter Captcha:</label>
          <input
            type="text"
            value={captchaValue}
            onChange={(e) => setCaptchaValuefun(e.target.value)}
            required
            />
      </div>
        <div className="captcha-group">
        <img src={captcha} alt={captcha} />
        <button type="button" onClick={() => setCaptcha(generateCaptcha())}>
         Generate New Captcha
        </button>
        <button onClick={()=>submitForms()}>Submit</button>
         p>{successfull}</p>
        </div>
    </div>
      </div>
    );
  };
  export default Tab3
