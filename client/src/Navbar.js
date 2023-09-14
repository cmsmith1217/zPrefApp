import './Navbar.css';

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import { useCookies, CookiesProvider } from 'react-cookie';

const Navbar = () => {
    const [sessionCookies, setSessionCookies, removeSessionCookies] = useCookies(['username_token', 'user_id_token'])
    console.log('cookies:', sessionCookies)

    let myInventoryButton;
    let logoutButton;

    if(sessionCookies.username_token) {
        myInventoryButton = <Button as={Link} to='/myinventory' variant='contained' color='secondary' style={{gap: '10px', margin: '10px'}}>My Inventory</Button>;
        logoutButton = <Button as={Link} onClick={() => { removeSessionCookies('username_token'); removeSessionCookies('user_id_token'); alert('You have been logged out') }} to='/' variant='contained' color='error' style={{gap: '10px', margin: '10px'}}>Logout</Button>;
    }

    return (
        <div id='navbar'>
            <Button as={Link} to='/' variant='contained' color='secondary' style={{gap: '10px', margin: '10px'}}>Login Page</Button>
            <Button as={Link} to='/inventory' variant='contained' color='secondary' style={{gap: '10px', margin: '10px'}}>Inventory List</Button>
            {myInventoryButton}
            {logoutButton}
        </div>
    )
}

export default Navbar;