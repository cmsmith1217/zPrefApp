import React from 'react';
import { Link } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';

const Navbar = () => {

    return (
        <div id='navbar'>
            <Button as={Link} to='/inventory' variant='contained' color='secondary' style={{gap: '10px', margin: '10px'}}>Inventory List</Button>
            <Button as={Link} to='/myinventory' variant='contained' color='secondary' style={{gap: '10px', margin: '10px'}}>My Inventory</Button>
            <Button as={Link} to='/' variant='contained' color='secondary' style={{gap: '10px', margin: '10px'}}>Login Page</Button>
        </div>
    )
}

export default Navbar;