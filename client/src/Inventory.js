import { React , useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';


const Inventory = () => {

    const[inventoryList, setInventoryList] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/inventory')
            .then((res) => res.json())
            .then((inventoryData) => setInventoryList(inventoryData))
    },[])

    if(inventoryList.length > 0) {
        return (
            <Paper elevation={3} style={{justifyContent: 'center', alignContent: 'center', textAlign: 'center', backgroundColor: 'pink', maxWidth: '920px', marginLeft: '25%', padding: '4px'}}>
                <h2>Inventory Page</h2> 
                <ul>
                    {inventoryList.map((item) => (

                            <Card sx={{ 
                                minWidth: 400,
                                maxWidth: 840,
                                m: 2,
                                padding: 1,
                                textAlign: 'left'
                                }} id={item.id}>

                                <strong><h3>{item.item_name}</h3></strong>
                                <p>Quantity: {item.quantity}</p>
                                <p>Description: {item.description.length > 100 ? `${item.description.substring(0, 100)}...` : `Description: ${item.description}`}</p>
                                <Button as={Link} to={`/inventory/${item.id}`} variant='contained' color='secondary' style={{gap: '10px', margin: '10px'}} size='medium'>Item Details</Button>
                            </Card>
                        
                    ))}
                </ul>
            </Paper>
        )
    }
}

export default Inventory;

