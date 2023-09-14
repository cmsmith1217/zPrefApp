import './Login.css';

import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import { useCookies } from 'react-cookie';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const Login = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usersSummary, setUsersSummary] = useState([])
    const [usernameLogin, setUsernameLogin] = useState('')
    const [passwordLogin, setPasswordLogin] = useState('')
    const [sessionCookies, setSessionCookies, removeSessionCookies] = useCookies(['username_token', 'user_id_token'])
    const navigate = useNavigate();

    useEffect(() => {
        usersRefetch();
    },[])

    const usersRefetch = async () => {
        await fetch('http://localhost:3001/users')
            .then((res) => res.json())
            .then((userFetchData) => setUsersSummary(userFetchData))
    }

    const LogIntoAccount = async () => {
        let accountMatch = false;
        for(var element of usersSummary) {
            console.log(element)
            if(element.username === usernameLogin) {
                accountMatch = true;
                if(element.password === passwordLogin) {
                    removeSessionCookies('user_id_token');
                    removeSessionCookies('username_token');
                    setSessionCookies('user_id_token', element.id, { path: '/'});
                    setSessionCookies('username_token', element.username, { path: '/'});
                    navigate('/myinventory');
                    window.location.reload();
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
        <Box
            sx={{
                m: 1,
                width: 512,
                height:512
            }}
        >
            <Paper elevation={3}
                sx={{
                    backgroundColor: 'white'
                }}
            
            >
                <div id='loginContainer'>
                    <h3>Login</h3>
                    <form id='loginCreds'>
                        <TextField className='inputText' label='username' variant="outlined" type='text' value={usernameLogin} onChange={(e) => setUsernameLogin(e.target.value)} placeholder='Username' size='small' style={{gap: '10px', margin: '10px'}}/>
                        <TextField className='inputText' label='password' variant="outlined" type='text' value={passwordLogin} onChange={(e) => setPasswordLogin(e.target.value)} placeholder='Password' size='small' style={{gap: '10px', margin: '10px'}}/>
                    </form>
                    <Button type='submit' onClick={() => LogIntoAccount()} variant='contained' color='success' style={{gap: '10px', margin: '10px'}}>Login</Button>
                </div>

                <div id='createAccountContainer'>
                    <h3>Don't have an account? Create one below!</h3>
                    <div id='createAccountInputName'>
                        <TextField className='inputText' label='First Name' variant="outlined" type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' size='small' style={{gap: '10px', margin: '10px'}}/>
                        <TextField className='inputText' label='Last Name' variant="outlined" type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' size='small' style={{gap: '10px', margin: '10px'}}/>
                    </div>
                    <div id='createAccountUserCreds'>
                        <TextField className='inputText' label='Username' variant="outlined" type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' size='small' style={{gap: '10px', margin: '10px'}}/>
                        <TextField className='inputText' label='Password' variant="outlined" type='text' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' size='small' style={{gap: '10px', margin: '10px'}}/>
                    </div>
                    <Button onClick={() => CreateAccount()} variant='contained' color='success' style={{gap: '10px', margin: '10px'}}>Create Account</Button>
                </div>
            </Paper>
        </Box>
    )
}

export default Login;