import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
// import './App.css'
import { useCallback } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [Password, setPassword] = useState("") 

  // useref hoook
  const passwordRef = useRef(null)


  const PasswordGenerator =  useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefgijklmnopqrstuvwxyz"
    if(numberAllowed)
    {
      str+= "0123456789";
    } 
    else if(charAllowed)
    {
      str+="!@#$%^&*+-[](){}|>:"
    } 
    for (let i = 1; i <= length; i++) {
       let char = Math.floor(Math.random() * str.length +1); 
       pass+= str.charAt(char)
    } 
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword]) 

  const copyPassword = useCallback(()=>{
    passwordRef.current?.select();
      window.navigator.clipboard.writeText(Password)
  }, [Password])
   
//  for Showing the password on effecting dependencies
  useEffect(()=>{
     PasswordGenerator()
  }, [length, charAllowed, numberAllowed, PasswordGenerator]) 


  // for length of the password  
 

  return (
    <>
    <h1 className='text-center text-4xl py-8 px-4 bg-green-300 font-serif'>Create your new Password Here : </h1>
    <div className='w-full  max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'> 
    <h1 className='text-center  text-lime-50 text-xl py-2 px-2'>Password generator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4 ' > 
<input type="text" 
  value={Password} 
  className='outline-none  w-full py-2 px-4 text-lg'
   placeholder='Password' 
   ref={passwordRef}
   /> 
<button type="button" className='outline-none text-white bg-blue-700 px-3 py-2 shrink-0'
  onClick={copyPassword}> Copy</button >   
    </div>
      <div className='flex text-lg gap-x-2'>
              <div className='flex items-center gap-x-1'>

                <input type="range" min={6}
                 max={12}
                 value={length}
                 className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}    
                /> 
                <label>Length: {length}</label> 
              </div> 
              <div className='flex text-lg gap-x-2 text-m'>
          <input type="checkbox" value={charAllowed} defaultChecked={numberAllowed}
          id='numberInput' onChange={()=>{setNumberAllowed((prev)=>!prev)}}
          />
                <label >Numbers: </label> 
          <input type="checkbox" value={charAllowed} defaultChecked={charAllowed}
          id='numberInput' onChange={()=>{setCharAllowed((prev)=>!prev)}}
          />
                <label>Character: </label> 

       </div>
      </div>
    </div>
    
    
    </>
  )
}

export default App
