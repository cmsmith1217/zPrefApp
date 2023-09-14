import { React , useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCookies, CookiesProvider } from 'react-cookie';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';



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

const patchItem = async (idToPatch) => {
    await fetch(`http://localhost:3001/inventory/${idToPatch}`, {
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
    setEditItemName();
    setEditItemDescription();
    setEditItemQuantity();
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
            whichButton = <Button value={myInventoryArrayToRender[index].editMode} onClick={() => {
                myInventoryArrayToRender[index].editMode = true;
                setEditItemDescription(itemArg.description)
                setEditItemName(itemArg.item_name)
                setEditItemQuantity(itemArg.quantity)
                console.log('bruh wtf', itemArg);
            }} variant='contained' color='secondary' style={{gap: '10px', margin: '10px'}} size='small'>Edit Item</Button>;
            return(
                <Card sx={{ 
                    minWidth: 400,
                    maxWidth: 840,
                    m: 2,
                    padding: 1,
                    textAlign: 'left'
                    }}  id={itemArg.id}>
                    <strong><h3>{itemArg.item_name}</h3></strong>
                    <p>Quantity: {itemArg.quantity}</p>
                    <p>{itemArg.description.length > 100 ? `Description: ${itemArg.description.substring(0, 100)}...` : `Description: ${itemArg.description}`}</p>
                    <Button as={Link} to={`/inventory/${itemArg.id}`} variant='contained' color='secondary' style={{gap: '10px', margin: '10px'}} size='medium'>Item Details</Button>
                    {whichButton}
                    <IconButton value={itemArg.id} onClick={(e) => deleteItem(e.currentTarget.value)} aria-label='delete' size='small'><DeleteIcon fontSize='inherit'/></IconButton>
                </Card>
            )
        } else if(itemArg.editMode == true){
            console.log('editMode true')
            whichButton = <Button value={myInventoryArrayToRender[index].editMode} onClick={() => {
                myInventoryArrayToRender[index].editMode = false;
                console.log(itemArg);
                console.log('editItemId set to:', editItemId)
                patchItem(itemArg.id);
                //setTriggerReRender(Math.random())
            }} variant='contained' color='secondary' style={{gap: '10px', margin: '10px'}} size='small'>Save Item</Button>;
            return(
                <Card sx={{ 
                    minWidth: 400,
                    maxWidth: 840,
                    m: 2,
                    padding: 1,
                    textAlign: 'left'
                    }} id={itemArg.id}>
                    <p><TextField className='inputText' variant="outlined" label='Item Name' type='text' size='small' placeholder={itemArg.item_name} value={editItemName} onChange={(e) => setEditItemName(e.target.value)}/></p>
                    <p><TextField className='inputText' variant="outlined" label='Quantity' type='text' size='small' placeholder={itemArg.quantity} value={editItemQuantity} onChange={(e) => setEditItemQuantity(e.target.value)}/></p>
                    <p><TextField className='inputText' variant="outlined" label='Description' type='text' multiline rows={2} size='small'  style={{width: '90%'}} placeholder={itemArg.description} value={editItemDescription} onChange={(e) => setEditItemDescription(e.target.value)}/></p>
                    <Button as={Link} to={`/inventory/${itemArg.id}`} variant='contained' color='secondary' style={{gap: '10px', margin: '10px'}} size='medium'>Item Details</Button>
                    {whichButton}
                    <IconButton value={itemArg.id} onClick={(e) => deleteItem(e.currentTarget.value)} aria-label='delete' size='small'><DeleteIcon fontSize='inherit'/></IconButton>
                </Card>
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
            <Paper elevation={3} style={{justifyContent: 'center', alignContent: 'center', textAlign: 'center', backgroundColor: 'pink', maxWidth: '920px', marginLeft: '25%', padding: '4px'}}>
                {pushRelevantData()}
                <div id='myInventoryWrapper'>
                    <h2>My Inventory</h2> 
                    <ul>
                        {renderMyInvList()}
                    </ul>
                </div>
                <div id='addItemWrapper'>
                    <h3>Add Item to Inventory</h3>
                    <Card sx={{ 
                    minWidth: 400,
                    maxWidth: 870,
                    marginLeft: 5,
                    m: 2,
                    padding: 1
                    }} id='inputNSubmitWrapper'>
                        <div id='itemNameNQuantityWrapper'>
                            <p><TextField className='inputText' label='Item Name' variant="outlined" size='small' type='text' value={addItemName} style={{gap: '5px', margin: '5px'}} onChange={(e) => setAddItemName(e.target.value)} placeholder='Item Name'/></p>
                            <p><TextField className='inputText' label='Quantity' variant="outlined" size='small' type='text' value={addItemQuantity} style={{gap: '5px', margin: '5px'}} onChange={(e) => setAddItemQuantity(e.target.value)} placeholder='Quantity'/></p>
                        </div>
                        <div id='itemDescriptionWrapper'>
                            <p><TextField className='inputText' label='Description' variant="outlined" multiline rows={2} size='small' style={{width: '90%', gap: '5px', margin: '5px'}} type='text' value={addItemDescription} onChange={(e) => setAddItemDescription(e.target.value)} placeholder='Description'/></p>
                        </div>
                        <Button onClick={() => {
                            submitItem();
                            setAddItemName('');
                            setAddItemDescription('');
                            setAddItemQuantity('');
                        }}
                             variant='contained' color='secondary' style={{gap: '10px', margin: '10px'}} size='small'>Submit Item</Button>
                    </Card>
                </div>
            </Paper>
        )
    }
}

export default MyInventory;

