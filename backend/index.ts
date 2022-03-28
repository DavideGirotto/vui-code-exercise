import express from 'express';
import searchResults from './datasets/searchResults.json'
import autocompleteSuggestions from './datasets/autocompleteSuggestions.json'

const app = express();  

app.get('/search/', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.send(searchResults);
})

app.get('/autocomplete/', (req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.send(autocompleteSuggestions);
})


app.listen(3080, () => {})