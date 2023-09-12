import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';

const Login = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usersSummary, setUsersSummary] = useState([])
    const [usernameLogin, setUsernameLogin] = useState('')
    const [passwordLogin, setPasswordLogin] = useState('')

    const usersRefetch = async () => {
        await fetch('http://localhost:3001/users')
            .then((res) => res.json())
            .then((userFetchData) => setUsersSummary(userFetchData))
    }

    const LoginMatchSearch = () => {
        let accountMatch = false;
        for(var element of usersSummary) {
            console.log(element)
            if(element.username === usernameLogin) {
                accountMatch = true;
                if(element.password === passwordLogin) {
                    alert(`Login successful for ${element.first_name} ${element.last_name}.`)
                    break
                } else {
                    alert(`Incorrect password for ${element.first_name} ${element.last_name}.`)
                    break
                }
            }
        }
        if(accountMatch === false) {alert('No account found for that username')}
    }

    const LogIntoAccount = async () => {
        LoginMatchSearch()
    }

    const CreateAccount = () => {
        fetch('http://localhost:3001/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "first_name": firstName,
                "last_name": lastName,
                "username": username,
                "password": password
            })
        })
        alert("Account Created!")
        usersRefetch();
    }

    return (
        <>
            <h2>Login Page</h2>
            <div id='loginContainer'>
                <h3>Login</h3>
                <div id='loginCreds'>
                    <input type='text' value={usernameLogin} onChange={(e) => setUsernameLogin(e.target.value)} placeholder='Username'></input>
                    <input type='text' value={passwordLogin} onChange={(e) => setPasswordLogin(e.target.value)} placeholder='Password'></input>
                </div>
                <Button onClick={() => LogIntoAccount()} variant='contained' color='success' style={{gap: '10px', margin: '10px'}}>Login</Button>
            </div>

            <div id='createAccountContainer'>
                <h3>Don't have an account? Create one below!</h3>
                <div id='createAccountInputName'>
                    <input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name'></input>
                    <input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name'></input>
                </div>
                <div id='createAccountUserCreds'>
                    <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username'></input>
                    <input type='text' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'></input>
                </div>
                <Button onClick={() => CreateAccount()} variant='contained' color='success' style={{gap: '10px', margin: '10px'}}>Create Account</Button>
            </div>
        </>
    )
}

export default Login;

