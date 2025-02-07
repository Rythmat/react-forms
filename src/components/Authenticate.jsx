import { useState } from "react"

const Authenticate = ({token, setError, setSuccessMessage,setUser}) => {
  //function to handle the clicking of the authenticate button
  const handleClick = async(event) => {
    //get our authenication details
    try {
      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                    }
        }
      )
      const jsonObj = await response.json();
      //if the authentication was complete, then display the success message
      if(jsonObj.success){
        setSuccessMessage(jsonObj.message);
        setUser(jsonObj.data.username);
        setError(null);
        
      //otherwise throw an error to be caught  
      }else{
        throw new Error(jsonObj.message);
      }
      
    } catch (error) {
      setError('Error: ' +error.message);
    }
  }

  return (
    <>
      <h2>Authenticate</h2>
      <button onClick={handleClick}>Authenticate Token</button>
    </>
  )
}

export default Authenticate