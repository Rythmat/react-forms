import { useState} from "react"
import './app.css'

import Authenticate from "./components/Authenticate.jsx"
import SignUpForm from "./components/SignUpForm.jsx"

function App() {
  const [token,setToken] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [user, setUser] = useState('');
  
   return (
    <>
      <div className="envelope">
        <SignUpForm setToken={setToken} setError={setError}/>
        <Authenticate token={token} setError={setError} setSuccessMessage={setSuccessMessage} setUser={setUser}/>
      </div>   
      {error && <p className='error'>{error}</p>}
      { successMessage &&
        <>
          <p className="success">{successMessage}</p>
          <p className="success">Username: {user}</p>
        </>
      }
    </>
    
  )
}

export default App
