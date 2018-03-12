const express = require('express');
const app = express();
const port = 3000;
const pathManager = require('./server/pathManager.js');

// Provide resources
app.use(express.static(pathManager.PUBLIC_BUILD));
app.get('/', ( request, response ) => {
	response.sendFile(pathManager.PUBLIC_BUILD + '/index.html');
});

// Provide random number 
app.get('/rand-number', (request, response) => {
	response.json({
		rand_number: Math.floor(Math.random() * 10) + 1
	});
});

// Listening clients
app.listen( port, () => {
	console.log(`Server is listening on ${port}`);
});

// Handle errors
app.use((err, request, response, next) => {
	console.log(err);
	response.status(500).send('Something broke! Error: ' + err);
});
