import { React , useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCookies, CookiesProvider } from 'react-cookie';

const MyInventory = () => {

    const sessionCookies = useCookies(['user_id_token'])
    const [inventoryList, setInventoryList] = useState([])
    const [addItemName, setAddItemName] = useState('')
    const [addItemQuantity, setAddItemQuantity] = useState('')
    const [addItemDescription, setAddItemDescription] = useState('')
    const [editItemId, setEditItemId] = useState(0)
    const [editItemName, setEditItemName] = useState('')
    const [editItemQuantity, setEditItemQuantity] = useState('')
    const [editItemDescription, setEditItemDescription] = useState('')
    const [triggerReRender, setTriggerReRender] = useState(0)

    console.log('myInventory cookies', sessionCookies[0])
    const myInventoryArrayToRender = [];

    const pushRelevantData = () => {
        for(let element of inventoryList) {
            if(element.user_id === sessionCookies[0].user_id_token) {
                console.log(element.editMode)
                console.log(typeof(element.editMode))
                console.log('undefined?????', element.editMode == undefined)
                if(element.editMode == undefined) {
                    console.log('it be undefined');
                    element.editMode = false;
                }
                console.log(element)
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

    const submitItem = async () => {
        await fetch('http://localhost:3001/inventory', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "user_id": sessionCookies[0].user_id_token,
                "item_name": addItemName,
                "description": addItemDescription,
                "quantity": parseInt(addItemQuantity)
            })

        })
        reFetchInventory();
    }

const patchItem = async () => {
    await fetch(`http://localhost:3001/inventory/${editItemId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "item_name": editItemName,
            "description": editItemDescription,
            "quantity": parseInt(editItemQuantity)
        })
    })
    reFetchInventory();
}

    var whichButton;
    const condRenderEditOrRead = (itemArg, index) => {
        // let whichButton;
        console.log('itemArgPassed:', itemArg)
        console.log('index passed', index)
        console.log('editMode:', itemArg.editMode)
        if(itemArg.editMode == false) {
            console.log('editMode false')
            whichButton = <Button value={myInventoryArrayToRender[index].editMode} onClick={() => {myInventoryArrayToRender[index].editMode = true; console.log('bruh wtf', itemArg); setTriggerReRender(Math.random());}} variant='contained' color='secondary' style={{gap: '10px', margin: '10px'}} size='small'>Edit Item</Button>;
            return(
                <li id={itemArg.id}>
                    <p>Item Name: {itemArg.item_name}</p>
                    <p>Quantity: {itemArg.quantity}</p>
                    <p>{itemArg.description.length > 100 ? `${itemArg.description.substring(0, 100)}...` : itemArg.description}</p>
                    <Button as={Link} to={`/inventory/${itemArg.id}`} variant='contained' color='secondary' style={{gap: '10px', margin: '10px'}} size='medium'>Item Details</Button>
                    {whichButton}
                    <IconButton value={itemArg.id} onClick={(e) => deleteItem(e.currentTarget.value)} aria-label='delete' size='small'><DeleteIcon fontSize='inherit'/></IconButton>
                </li>
            )
        } else if(itemArg.editMode == true){
            console.log('editMode true')
            whichButton = <Button value={myInventoryArrayToRender[index].editMode} onClick={() => {
                myInventoryArrayToRender[index].editMode = false;
                console.log(itemArg);
                setEditItemId(itemArg.id);
                console.log('editItemId set to:', editItemId)
                patchItem();
                //setTriggerReRender(Math.random())
            }} variant='contained' color='secondary' style={{gap: '10px', margin: '10px'}} size='small'>Save Item</Button>;
            return(
                <li id={itemArg.id}>
                    <p><input type='text' label='Item Name' placeholder={itemArg.item_name} value={editItemName} onChange={(e) => setEditItemName(e.target.value)}/></p>
                    <p><input type='text' label='Item Name' placeholder={itemArg.quantity} value={editItemQuantity} onChange={(e) => setEditItemQuantity(e.target.value)}/></p>
                    <p><input type='text' label='Item Name' placeholder={itemArg.description} value={editItemDescription} onChange={(e) => setEditItemDescription(e.target.value)}/></p>
                    <Button as={Link} to={`/inventory/${itemArg.id}`} variant='contained' color='secondary' style={{gap: '10px', margin: '10px'}} size='medium'>Item Details</Button>
                    {whichButton}
                    <IconButton value={itemArg.id} onClick={(e) => deleteItem(e.currentTarget.value)} aria-label='delete' size='small'><DeleteIcon fontSize='inherit'/></IconButton>
                </li>
            )
        }
    }

    const renderMyInvList = () => {
        return(
            myInventoryArrayToRender.map((item, index) => (
                condRenderEditOrRead(item, index)
            ))
        )
    }


    if(inventoryList.length > 0) {
        return (
            <>
                {pushRelevantData()}
                <div id='myInventoryWrapper'>
                    <h2>My Inventory</h2> 
                    <ul>
                        {renderMyInvList()}
                    </ul>
                </div>
                <div id='addItemWrapper'>
                    <h3>Add Item to Inventory</h3>
                    <div id='itemNameNQuantityWrapper'>
                        <input type='text' value={addItemName} onChange={(e) => setAddItemName(e.target.value)} placeholder='Item Name'></input>
                        <input type='text' value={addItemQuantity} onChange={(e) => setAddItemQuantity(e.target.value)} placeholder='Quantity'></input>
                    </div>
                    <div id='itemDescriptionWrapper'>
                        <input type='text' value={addItemDescription} onChange={(e) => setAddItemDescription(e.target.value)} placeholder='Description'></input>
                    </div>
                    <Button onClick={() => submitItem()} variant='contained' color='secondary' style={{gap: '10px', margin: '10px'}} size='small'>Submit Item</Button>
                </div>
            </>
        )
    }
}

export default MyInventory;

