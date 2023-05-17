
import React, { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const Form = ({Imgsrc,Sigsrc}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [currentInput, setCurrentInput] = useState("");
  console.log(typeof(Imgsrc),typeof(Sigsrc),"passed props")

  const commands = [
    {
      command: "name*",
      callback: (name) => {
        setName(name);
        setCurrentInput("email");
        speak("Please tell me your email address");
      },
    },
    {
      command: "mail*",
      callback: (email) => {
        setEmail(email);
        setCurrentInput("message");
        speak("Please tell me your message");
      },
    },
    {
      command: "ok*",
      callback: (message) => {
        setMessage(message);
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

  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speechSynthesis.speak(speech);
  };

  const submitForm = () => {
    fetch("http://localhost:7000/postdata",{ method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name:name,
      email:email,
      subject:message,
      image:Imgsrc,
      signature:Sigsrc
    })
  }).then(data=>console.log(data))
  console.log(typeof(email),name,message)
}
  

  const startListening = () => {
    setCurrentInput("name");
    speak("Please tell me your name");
    SpeechRecognition.startListening({ continuous: true });
  };

  return (
    <div>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={currentInput !== "name"}
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={currentInput !== "email"}
      />

      <label htmlFor="message">Message</label>
      <textarea
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={currentInput !== "message"}
      />

      <button onClick={startListening} disabled={currentInput !== ""}>
        Activate voice assistant
      </button>
    </div>
  );
};

export default Form;
