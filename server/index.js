const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const { json } = require('express');
const bodyParser = require('body-parser');
require('dotenv').config(); 

// Create a new instance of an Express app
const app = express(); 
// Set the port to either the environment variable PORT or 3000
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());


app.get('/api/to_do_list', cors(), (req, res) => {
  const apiURL = process.env.API_URL;

  const headers = {
    'Content-Type': 'application/json'
  };

  fetch(apiURL, { method: 'GET', headers })
    .then(res => res.json())
    .then(data => {
      res.status(200).json({ results: data });
    })
    .catch(error => {
      res.status(400).send(error);
    });
});


app.post('/api/create_to_do_item', cors(), (req, res) => {
  const toDoTask = req.body; 
  console.log("toDoTask:", toDoTask); 

  const apiURL = process.env.API_URL;

  const headers = {
    'Content-Type': 'application/json'
  };

  fetch(apiURL, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(toDoTask)
  })
    .then(res => res.json())
    .then((data) => console.log(data))
    .catch(error => {
      res.status(400).send(error);
    });
}); 

app.post('/api/edit_to_do_item', cors(), (req, res) => {

  const toDoItem = req.body;

  const headers = {
    'Content-Type': 'application/json'
  };

  fetch(`${process.env.API_URL}/${toDoItem.to_do_list_id}`, {
    method: 'POST',
    body: JSON.stringify(toDoItem),
    headers: headers
  })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(error => console.error(error));
})

// Start the server to listen for incoming requests on the specified port 
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


