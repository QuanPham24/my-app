import React from "react";
import firebase from "./firebase"
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { signInWithPhoneNumber } from "firebase/auth";

class App extends React.Component{
  handleChange = (e) => {
    const{name,value} = e.target
    this.setState({
      [name]: value
    })
  }

  configureCaptcha = () => {
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
    'size': 'invisible',
    'callback': (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
        this.onSignInSubmit();
        console.log("recaptcha varified")
      }
    }, auth);
  }

  onSignInSubmit = (e) => {
    e.preventDefault()
    this.configureCaptcha()
    const phoneNumber = "+1" + this.state.mobile;
    console.log(phoneNumber)
    const appVerifier = window.recaptchaVerifier;
    
    const auth = getAuth();
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          console.log("Authientication code has been sent to your phone")
          // ...
        }).catch((error) => {
          // Error; SMS not sent
          // ...
          console.log("SMS not send")
        });
  }

  onSubmitAuther = (e) => {
    e.preventDefault()
    const code = this.state.auther;
    console.log(code)
    window.confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log(JSON.stringify(user))
      alert("user is verified")
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
});

  }

  render(){
    return (
      <div>
        <h2>Login form</h2>
        <form onSubmit = {this.onSignInSubmit}>
          <div id = "sign-in-button"></div>
          <input type = "number" name = "mobile" 
              placeholder="Mobile number" required onChange={this.handleChange}/>
          <button type = "submit">Submit</button> 
        </form>

        <h2>Enter authentication</h2>
        <form onSubmit={this.onSubmitAuther}>
          <input type = "number" name = "auther" 
              placeholder="Auth number" required onChange={this.handleChange}/>
          <button type = "submit">Submit</button> 
        </form>
      </div>
    )
  }

}
export default App