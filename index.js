const express = require('express');
const app = express();
const port = 3000;

const url = "https://dev-app.i24.dev";

// Middleware to parse JSON bodies
app.use(express.json());

// Sample in-memory data
let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
];

// Routes
app.get('/', (req, res) => {
  res.send('Cloud API!');
});

app.get('/items', (req, res) => {
  res.json(items);
});

app.get('/product',(req,res)=>{
  res.json([
    //[ 
      { id:1,name:'kin',age: 9},
      { id:2,name:'ken',age: 6}
    //]
  ])
});

app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');
  res.json(item);
});

app.post('/items', (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send('Item not found');

  item.name = req.body.name;
  res.json(item);
});

app.delete('/items/:id', (req, res) => {
  const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
  if (itemIndex === -1) return res.status(404).send('Item not found');

  const deletedItem = items.splice(itemIndex, 1);
  res.json(deletedItem);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on ${url}`);
});
