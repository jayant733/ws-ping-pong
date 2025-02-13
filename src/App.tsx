
import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  const [socket , setsocket] = useState();
  const inputref = useRef("");
  const sendmessage = ()=>{
    if(!socket)
      return;

    const message = inputref.current.value;
   //@ts-ignore
    socket.send(message)

  }

  useEffect(()=>{
    //this will work only when the component first render or the component mountsa
    const ws = new WebSocket("ws://localhost:8070")
    setsocket(ws);

    ws.onerror =(err) =>{
      console.log(err)
    }
    ws.onmessage= (ev)=>{
      alert(ev.data)
    }

    ws
  },[])
  return (
    <>

    <div>
      <input  ref = {inputref} type = "text" placeholder='message...'></input>
      <button onClick={sendmessage}>send</button>
    </div>
    </>
  )
}

export default App
