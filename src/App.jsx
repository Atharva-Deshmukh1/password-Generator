import { useCallback, useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(0)
  const [characallowed, setcharacallowed] = useState(false)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [Password, setpassword] = useState("")


  //password generation method
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm"
    if (characallowed) str += "!@#$%^&*_+?/"
    if (numberAllowed) str += "1234567890"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }
    setpassword(pass)

  }, [length, characallowed, numberAllowed, setpassword])

  //useRef hook to copy the text
  const passRef = useRef(null)
  const copytoclipboard = useCallback(()=>{
    passRef.current.select()
    window.navigator.clipboard.writeText(Password)
  },[Password])


  useEffect(()=>{
    passwordGenerator()
  },[length, characallowed, numberAllowed, setpassword])

  return (
    <div className='w-full  max-w-md shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>

        <input
          type='text'
          value={Password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          ref={passRef}
          readOnly
        />

        <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        onClick={copytoclipboard}>
          Copy
        </button>

      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex item-center gap-x-1'>

          <input 
            type="range" 
            min={4}
            max={16}
            value={length}
            className='cusrsor-pointer'
            onChange={(e)=>{setlength(e.target.value)}}
          />

          <label>Length:({length})</label>
        </div>
        <div className='flex items-center gap-x-1'>

          <input
            type='checkbox'
            defaultChecked={numberAllowed}
            onChange={()=>{
              setnumberAllowed((prev)=>!prev);
            }}
          />

          <label>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>

          <input
            type='checkbox'
            defaultChecked={characallowed}
            onChange={()=>{
              setcharacallowed((prev)=>!prev);
            }}
          />
          <label>Chararcter</label>
        </div>
      </div>
    </div>

  )
}

export default App
