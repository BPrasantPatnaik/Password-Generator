import { useCallback, useState,useEffect,useRef } from 'react'
import './App.css'

function App() {

  const [length,setLength]=useState(8);
  const [Password,setPassword]=useState("")
  const [numbers,setNumbers]=useState(false);
  const [chars,setChars]=useState(false);
  const passwordRef=useRef(null)

  const GeneratePassword=useCallback(()=>{
    var password=""
      var str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numbers){
      str+="1234567890";
    }
    if(chars){
      str+="~!@#$%^&*()_{}<>,.[]"
    }
    for (let i = 0; i < length; i++) {

      var num=Math.floor(Math.random()*str.length+1);
      var c=str.charAt(num);
      password += c;
    }
    setPassword(password);
    }
    

  ,[length,numbers,chars])

  useEffect(() => {
    GeneratePassword();
  },[length,numbers,chars,GeneratePassword]);
  
const copytoclipboard=useCallback(()=>{

  passwordRef.current?.select()
  window.navigator.clipboard.writeText(Password)
},[Password]);

  return (
    <>
      <h1 className='text-white text-4xl'>Password Generator</h1>
      <div className='bg-gray-500 rounded-md m-5 border-8'>

        <input type="text" className='my-10 p-1 px-10 rounded-sm bg-white' placeholder='Password' value={Password} readOnly ref={passwordRef}/>
        <button className='bg-blue-500 mx-5 text-1 rounded-md p-1' onClick={copytoclipboard} >Copy</button>

        <div className='m-5'>

          <input type="range" min={5} max={15} value={length} onChange={(e)=>{setLength(e.target.value)}} />
          <label className='text-lg mx-5 '><b>Length : {length}</b></label>

          <input type="checkbox" onChange={()=>{setNumbers((prev)=>!prev);}}/> 
          <label className='text-lg mx-5'  ><b> Numbers </b></label>

          <input type="checkbox" onChange={()=>{setChars((prev)=>!prev);}} />
          <label className='text-lg mx-5 '><b> Characters </b></label>

        </div>

        

      </div>
    </>
  )
}

export default App
