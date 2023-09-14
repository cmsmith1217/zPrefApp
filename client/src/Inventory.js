import { React , useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import Card from '@mui/material/Card';


const Inventory = () => {

    const[inventoryList, setInventoryList] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/inventory')
            .then((res) => res.json())
            .then((inventoryData) => setInventoryList(inventoryData))
    },[])

    if(inventoryList.length > 0) {
        return (
            <>
                <h2>Inventory Page</h2> 
                <ul>
                    {inventoryList.map((item) => (

                            <Card sx={{ 
                                minWidth: 400,
                                maxWidth: 760,
                                m: 2,
                                padding: 1
                                }} id={item.id}>

                                <p>Item Name: {item.item_name}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>{item.description.length > 100 ? `${item.description.substring(0, 100)}...` : item.description}</p>
                                <Button as={Link} to={`/inventory/${item.id}`} variant='contained' color='secondary' style={{gap: '10px', margin: '10px'}} size='medium'>Item Details</Button>
                            </Card>
                        
                    ))}
                </ul>
            </>
        )
    }
}

export default Inventory;

