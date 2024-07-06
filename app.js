// Import necessary modules
const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config(); //load envoirnment varaibles from .env file


// Middleware to parse JSON bodies
app.use(express.json());

const cors=require("cors");
const corsOptions ={
origin:'*', 
credentials:true,            //access-control-allow-credentials:true
optionSuccessStatus:200,
};
app.use(cors(corsOptions));

const options = {
    method: 'GET',
    url: 'https://wildlife-live1.p.rapidapi.com/news',
    params: {
        format: 'json',
        code: 'it'
},
headers: {
    'x-rapidapi-key': 'a14183dbd4msh7e4ab65f0021c4dp166829jsn95fdb07c40c6',
    'x-rapidapi-host': 'wildlife-live1.p.rapidapi.com'
    }
};
// Route to fetch user data from an external API
app.get('/:id',async (req, res) => {
try {
options.params.code = req.params.id; //for country codes


// Making a GET request using axios
const response = await axios.request(options);

// Sending the response data back to the client
res.json(response.data);
} catch (error) {
console.error('Error fetching data:', error);

// Error handling if the API call fails
res.status(500).json({ message: 'Error fetching data' });
}
});
const PORT = 3000;
// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



