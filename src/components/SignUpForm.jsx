import { useState } from "react"

const SignUpForm = ({setToken, setError}) => {
  //State variables 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //Function to check password validity based on regular expressions
  function passwordValidate(pw) {
    var re = {
        'capital' : /[A-Z]/,
        'digit'   : /[0-9]/,
        'special'  : /\W/,
        'full'    : /.{7,}$/
    };
    return re.capital .test(pw) && 
           re.digit   .test(pw) && 
           re.special .test(pw) && 
           re.full    .test(pw);
    }

  //Button handler for the form submit
  const handleSubmit = async(event) => {
    //Prevents the page resetting on submit by preventing the default action
    event.preventDefault();

    //Regular expression to match a good username
    const validUsername = new RegExp('^[a-zA-Z0-9-_]{7,}$');
    //Empty array to hold the errors about the submit
    const badDeets = [];
    //reset the error to prevent looping
    setError(null);

    //for bad usernames
    if(!validUsername.test(username)){
      badDeets.push('Your username must be longer than 7 alphanumeric only characters. ')
    }
    //for bad passwords
    if(!passwordValidate(password)){
      badDeets.push('Your password must contain 8 characters and at least one special character, one letter, and one number.');
    }
    //for empty inputs
    if(username==='' || password===''){
      setError('Please enter both a username and a password!');
      return;
    }
    //If there is an issue with the form
    if(badDeets.length>0){
      setError('Invalid! ' + badDeets.join(''));
      return;
    }

    //If the form was valid, then post it in to the API
    try {
      const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup',
       {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({ username: username, password: password})
        }
      )
      const jsonObj = await response.json();
      setToken(jsonObj.token);
    } catch (error) {
      setError(error.message);
    }
  }


  return (
    <>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:  <input type="text" placeholder="username" onChange={(event)=>{setUsername(event.target.value)}}/>
        </label>
        <label>
          Password:  <input type="text" placeholder="password" onChange={(event)=>{setPassword(event.target.value)}}/>
        </label>
        <button>Submit</button>
      </form>
    </>
  )
} 

export default SignUpForm