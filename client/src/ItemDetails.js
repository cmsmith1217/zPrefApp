import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';


const ItemDetails = () => {
    const { id } = useParams();
    const [itemDetails, setItemDetails] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3001/inventory/${id}`)
            .then((res) => res.json())
            .then((itemData) => setItemDetails(itemData[0]))
    },[])

    if(itemDetails) {
        return (
            <Paper elevation={3} style={{justifyContent: 'center', alignContent: 'center', textAlign: 'center', backgroundColor: 'pink', maxWidth: '920px', marginLeft: '25%', padding: '4px'}}>
                <Card sx={{ 
                                    minWidth: 400,
                                    maxWidth: 840,
                                    m: 2,
                                    padding: 1
                                    }}>
                    <h2>{itemDetails.item_name}</h2> 
                    <div id='itemWrapper'>
                        <p>Item ID: {itemDetails.id}</p>
                        <p>Quantity: {itemDetails.quantity}</p>
                        <p>Description: {itemDetails.description}</p> 
                    </div>
                </Card>
            </Paper>
        )
    }
}
export default ItemDetails;

