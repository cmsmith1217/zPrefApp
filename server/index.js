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
    // console.log(hasQuery)

    if (hasQuery === true) {
        let queryKey = Object.keys(inventorySearch)[0]
        let queryVal = Object.values(inventorySearch)[0]

        if ((queryKey === 'user_id') || (queryKey === 'id') || (queryKey === 'quantity')) {
            // console.log('need to parse')
            queryVal = parseInt(queryVal);
            // console.log('parsed', queryVal)
            // console.log(typeof(queryVal))

            knex('item')
            .select('*').where(`${queryKey}`, '=', queryVal)
            .then((inventoryData) => res.status(200).json(inventoryData))
            .catch((err) => res.status(500).json(err))

        } else {
            // console.log('no need to parse')
            knex('item')
            .select('*').where(`${queryKey}`, 'ilike', `%${queryVal}%`)
            .then((inventoryData) => res.status(200).json(inventoryData))
            .catch((err) => res.status(500).json(err))
        }

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

app.delete('/inventory', (req, res) => {
    let idToDelete = parseInt(req.query.id);
    // console.log(req.query)
    // console.log('idToDelete', idToDelete)
    knex('item')
        .where('id', idToDelete)
        .del()
        .then(() => res.status(202).json(`Item entry with id ${idToDelete} has been deleted`))
})

app.get('/inventory/:id', (req, res) => {
    itemId = req.params.id;
    // console.log(itemId);
    knex('item')
        .select('*').where('id', '=', itemId)
        .then((itemData) => res.status(200).json(itemData))
})

app.patch('/inventory/:id', (req, res) => {
    const itemId = req.params.id;
    const patchInfo = req.body;
    knex('item').where('id', '=', itemId)
        .update(patchInfo)
        .then((inventoryData) => res.status(202).json(inventoryData))
})

app.get('/users', (req, res) => {
    knex('user_table')
        .select('*')
        .then((userData) => res.status(200).json(userData))
})

app.post('/users', (req, res) => {
    const newUser = req.body;
    knex('user_table')
        .insert(newUser)
        .then(() => {
            res.status(201).json('New user successfully created')
        })

})

app.listen(port, () => {
    console.log(`express server listening on port ${port}`)
})