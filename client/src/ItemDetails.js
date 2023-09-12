import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
            <>
                <h2>{itemDetails.item_name}</h2> 
                <div id='itemWrapper'>
                    <p>Item ID: {itemDetails.id}</p>
                    <p>Quantity: {itemDetails.quantity}</p>
                    <p>Description: {itemDetails.description}</p> 
                </div>
            </>
        )
    }
}
export default ItemDetails;

