import { useState } from 'react'
import './App.css'

function App() {
  const [pending, setPending] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  return (
    <>
      <div>
        // Navbar
        <div className='bg-red-900 w-full h-full'>
          Hi
        </div>
      </div>
    </>
  )
}

export default App
