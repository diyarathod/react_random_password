import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length,setLength]= useState(3);
  const[num,setNumberAllow]=useState(false)
  const[character,setCharacter]=useState(false)
  const [pass,setPassword]=useState("")

  //Using useRef for giving reference about the item
  const passwordRef= useRef(null);
  //Using callback hook
  // useCallback(fn,dependencies)
  const passwordGenerate= useCallback( () =>{
    let password="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(num){
      str += "0123456789"
    }
    if(character){
      str += "!-?"
    }
    for (let i = 1; i <=length; i++) {
      let char= Math.floor(Math.random() * str.length + 1)
       password +=str.charAt(char);
      }
      setPassword(password)

  },[length,num,character,setPassword])


  const copyPass= useCallback( ()=> {
    passwordRef.current?.select()
    //for selecting the range of the input data
    passwordRef.current?.setSelectionRange(0,5)
    window.navigator.clipboard.writeText(pass)
  },
  [pass] )
//we are using useEffect to change the password at runtime and sychronize it.
  useEffect( ()=> {
    passwordGenerate()
  },[length,num,character,passwordGenerate])
  return (
    <>
     <div className='w-full max-w-md mx-auto rounded-lg px-4 py-3 my-8 text-orange-500 bg-slate-800'>
      <h1 className='text-white text-center '> Password Generator</h1>
      <div  className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text"
        value={pass}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef}/>
        <button  onClick={copyPass} className=' bg-blue-800 '> Copy </button>
      </div>
      <div className='flex  text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type='range'
          min={3}
          max={100}
          value={length}
          className=' cursor-pointer '
          onChange={(e) =>{setLength(e.target.value)}}/>
          <label> Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type='checkbox'
          defaultChecked={setNumberAllow}
          id="numberInput"
          onChange={() =>{
            setNumberAllow((prev)=>!prev );
            }}/>
            <label> Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type='checkbox'
          defaultChecked={setCharacter}
          id="charInput"
          onChange={() =>{
            setCharacter((prev)=>!prev );
            }}/>
            <label>Characters</label>
        </div>
      </div>
     </div>
    </>
  )
}

export default App
