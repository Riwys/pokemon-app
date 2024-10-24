import { useState } from 'react';
import 'tachyons';
function SignIn({ onRouteChange, loadUser }) {
    const [signInEmail, setSignInEmail] = useState('')
    const [signInPassword, setSignInPassword] = useState('')
    const onEmailChange = (event) => {
        setSignInEmail(event.target.value)
    }
    const onPasswordChange = (event) => {
        setSignInPassword(event.target.value)
    }
    const onSubmitChange = () => {
        fetch('https://pokemon-backend-ff60.onrender.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: signInEmail,
                pwd: signInPassword
            })
        })
        .then(response => response.json())
            .then(user => {
                if(user) {
                    loadUser(user)
                    onRouteChange('home');
                }
            })
    }
    const checkEnterPressed = (event) => {
        if (event.keyCode === 13 || event.which === 13) {
            onSubmitChange();
        }
    }
    return (
        <article className="br2 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
        <main className="pa4 black-80">
        <div className="measure center">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
        <legend className="f4 fw6 ph0 mh0">Sign In</legend>
        <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
        <input 
        className="pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100" 
        type="email" 
        name="email-address"  
        id="email-address" 
        onChange={onEmailChange}
        />
        </div>
        <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
        <input 
        className="b pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100" 
        type="password" 
        name="password"  
        id="password" 
        onChange={onPasswordChange}
        onKeyUp={checkEnterPressed}
        />
        </div>
        </fieldset>
        <div className="">
        <input 
        onClick={onSubmitChange}
        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
        type="submit" 
        value="Sign in" 
        />
        </div>
        <div className="lh-copy mt3">
        <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
        </div>
        </div>
        </main>
        </article>
    );
  }

  export default SignIn;