const express = require('express')
const app = express()
const port = 3000

app.get('/', ( request, response ) => {
	response.end( 'Hello NodeJS Server!' )
})

app.listen( port, ( err ) => {
	if ( err ) {
		return console.log( 'Something bad happened!', err )
	}

	console.log(`Server is listening on ${port}`)
})
