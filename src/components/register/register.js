import React from 'react';
import { useState } from 'react';
import 'tachyons';
function Register({onRouteChange, loadUser}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const onNameChange = (event) => {
        setName(event.target.value)
    }
    const onEmailChange = (event) => {
        setEmail(event.target.value)
    }
    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    }
    const onSubmitChange = () => {
        fetch('https://pokemon-backend-ff60.onrender.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                name: name,
                pwd: password
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
            console.log(event.keyCode, event.which)
        }
    }
    const moveToNextInput = (event) => {
        if (event.keyCode === 13 || event.which === 13) {
            {let nextInput = document.getElementById("password");
            nextInput.focus();
            }
            console.log(event.keyCode, event.which)
        }
    }
    return (
        <article className="br2 ba b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-5">
        <main className="pa4 black-80">
        <div className="measure center">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
        <legend className="f3 fw6 ph0 mh0">Register</legend>
        <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
        <input 
        className="b pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100" 
        type="text" 
        name="name"  
        id="name" 
        onChange={onNameChange}
        />
        </div>
        <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
        <input 
        className="pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100" 
        type="email" 
        name="email-address"  
        id="email-address" 
        onChange={onEmailChange}
        onKeyUp={moveToNextInput}
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
        value="Register" 
        />
        </div>
        </div>
        </main>
        </article>
    );
  }

  export default Register;