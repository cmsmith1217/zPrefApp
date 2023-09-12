import { React , useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCookies, CookiesProvider } from 'react-cookie';

const MyInventory = () => {

    const sessionCookies = useCookies(['user_id_token'])
    const[inventoryList, setInventoryList] = useState([])
    console.log('myInventory cookies', sessionCookies[0])
    const myInventoryArrayToRender = [];

    const pushRelevantData = () => {
        for(let element of inventoryList) {
            if(element.user_id === sessionCookies[0].user_id_token) {
                myInventoryArrayToRender.push(element)
            }
        }
        console.log('myinventoryToRender:', myInventoryArrayToRender)
    }

    useEffect(() => {
        fetch('http://localhost:3001/inventory')
            .then((res) => res.json())
            .then((inventoryData) => setInventoryList(inventoryData))
    },[])

    function reFetchInventory() {
        fetch('http://localhost:3001/inventory')
            .then((res) => res.json())
            .then((inventoryData) => setInventoryList(inventoryData))
    }

    const deleteItem = async (idArg) => {
        let url = `http://localhost:3001/inventory?id=${idArg}`
        console.log(url)
        await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })

        reFetchInventory();
    }

    if(inventoryList.length > 0) {
        return (
            <>
                {pushRelevantData()}
                <h2>My Inventory</h2> 
                <ul>
                    {myInventoryArrayToRender.map((item) => (
                        <li id={item.id}>
                            <p>Item Name: {item.item_name}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>{item.description.length > 100 ? `${item.description.substring(0, 100)}...` : item.description}</p>
                            <Button as={Link} to={`/inventory/${item.id}`} variant='contained' color='secondary' style={{gap: '10px', margin: '10px'}} size='medium'>Item Details</Button>
                            <Button variant='contained' color='secondary' style={{gap: '10px', margin: '10px'}} size='small'>Edit Item</Button>
                            <IconButton value={item.id} onClick={(e) => deleteItem(e.currentTarget.value)} aria-label='delete' size='small'><DeleteIcon fontSize='inherit'/></IconButton>
                        </li>
                    )
                    )}
                </ul>
            </>
        )
    }
}

export default MyInventory;

