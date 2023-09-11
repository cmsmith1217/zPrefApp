const express = require('express');
const knex = require('knex')
    (require('./knexfile.js')['development']);
const cors = require('cors');
const app = express();
const port = 3001;


app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json('Z Main page')
})

app.get('/inventory', (req, res) => {
    let inventorySearch = req.query;
    let hasQuery = false;
    for (let prop in inventorySearch) {
        if (Object.hasOwn(inventorySearch, prop)) {
            hasQuery = true;
        }
    }
    console.log(hasQuery)

    if (hasQuery === true) {
        let queryKey = Object.keys(inventorySearch)[0]
        let queryVal = Object.values(inventorySearch)[0]

        if ((queryKey === 'user_id') || (queryKey === 'id') || (queryKey === 'quantity')) {
            queryVal = parseInt(queryVal)
        }

        knex('item')
            .select('*').where(`${queryKey}`, 'ilike', `%${queryVal}%`)
            // .select('*').where('item_name', 'ilike', `%${inventorySearch.item_name}%`)
            .then((inventoryData) => res.status(200).json(inventoryData))
            .catch((err) => res.status(500).json(err))
    } else {
        knex('item')
            .select('*')
            .then((inventoryData) => res.status(200).json(inventoryData))
    }
})

app.post('/inventory', (req, res) => {
    const newItemEntry = req.body;
    knex('item')
        .insert(newItemEntry)
        .then(() => {
            res.status(201).json('New item successfully created')
        })
})

app.get('/inventory/:id', (req, res) => {
    itemId = req.params.id;
    console.log(itemId);
    knex('item')
        .select('*').where('id', '=', itemId)
        .then((itemData) => res.status(200).json(itemData))
})

app.listen(port, () => {
    console.log(`express server listening on port ${port}`)
})