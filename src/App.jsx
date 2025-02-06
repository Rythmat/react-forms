import { useState} from "react"

import Authenticate from "./components/Authenticate.jsx"
import SignUpForm from "./components/SignUpForm.jsx"

function App() {
  const [token,setToken] = useState(null);
  
   return (
    <>
      <h1>Hello</h1>
      <SignUpForm setToken={setToken}/>
      <Authenticate token={token}/>
    </>
  )
}

export default App
