import { useState,useEffect } from 'react'

function App() {
  let [message_array, set_message_array] = useState([]);
  const [ws, set_ws] = useState();
  const [message, set_message] = useState("");
  const changeMessage = (e) => {
    set_message(e.target.value);
  }
  console.log(message);
  const handleSubmission = () => {
    if (!ws || !message) {
      alert("Please write a message first");
    }
    else {
      ws.send(message);
    }
  }
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    set_ws(ws);
    ws.onmessage = (e) => {
      set_message_array(prev => {
        const updated = [...prev, e.data];
        return updated;
      });
    }
  }, [])

  const message_li = message_array.map((message, index) => {
    return (
      <div key={index} className= "bg-white text-black p-[1rem] my-[2rem] w-[max] rounded-xl">
        <p>{message }</p>
      </div>
    )
  })
  
  return (
    <>
      <div className="bg-black h-[100vh] w-full text-white flex flex-col items-center">
        <h1 className="text-center text-[5rem] bg-white text-black p-[1rem] rounded-[1rem]">Welcome to the chat application</h1>
        {/* <label className="text-white">What is your message</label> */}
        <div className="flex flex-row w-[100%] justify-center items-center">
          <input type="text" className="bg-white text-black h-[2.5rem] p-[0.5rem] w-[30vw] m-[2rem] outline-none rounded-md" placeholder="Type your message here" value={message} onChange={changeMessage}></input>
          <button onClick={handleSubmission } className="text-black bg-white rounded-xs p-[0.5rem] mx-[0.5rem]">Send</button>
        </div>
        <div>
          {message_li}
        </div>
      </div>
    </>
  )
}

export default App
