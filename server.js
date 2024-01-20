require('dotenv').config();
const express = require('express')
const cors = require('cors')

const PORT = 5080
const API_KEY = process.env.REACT_APP_API_KEY
const GPT_URI = 'https://api.openai.com/v1/chat/completions';

const server = express()

server.use(express.json())
server.use(cors())

server.post('/completions', async (req, res) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'user', content: req.body.message }
            ],
            max_tokens: 100
        })
    }

    try {
        const response = await fetch(GPT_URI, requestOptions)
        const data = await response.json()
        res.send(data)
    } catch (error) {
        console.error(error);
    }
})

server.listen(PORT, () => {
    console.log(`Server is listening on PORT http://localhost:${PORT}`);
})