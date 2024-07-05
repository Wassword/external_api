// Import necessary modules
const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config(); //load envoirnment varaibles from .env file

//express app setup
const app = express();
const PORT =process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//serve statice file as html , css etc
app.use(express.static(path.join(__dirname, 'external_api')));

//set up main route 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'external_api', index.html));
});

app.post('/fetch-data', async (req, res) => {
    const userInput = req.body.query;
    const options = {
        method: 'Post',
        apiUrl: 'https://chatgpt-42.p.rapidapi.com/conversationgpt4-2',
        headers: {
            'Content-Type': 'appilication/json',
            'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
            'x-rapidapi-key': process.env.RAPIDAPI_KEY
        },
        data: {
            messages:[{role:"user", content: userInput }],
            system_prompt: "",
            temperature: 0.7
        }
    };
    try {
        const response = await axios.request(options);
        const data = response.data;
        res.json(data);
    }catch (error) {
    res.status(500).send('Erro fetching date from API');

}
// Event listener for form submission
document.getElementById('query-form').addEventListener('submit', async function(e){
    e.preventDefault();
    const query = document.getElementById('query').value;

    try {
        const response = await axios.psot('/fetch-data', { query});
        const data = response.data;

        //result
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    } catch(error) {
        console.log('Error fetching data', error);
        document.getElementById('result').innerText = 'Error fetchng data from API';
    }
});

});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



