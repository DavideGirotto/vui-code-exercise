import express from 'express';
import searchResults from './datasets/searchResults.json'
import autocompleteSuggestions from './datasets/autocompleteSuggestions.json'

const app = express();  

app.get('/products/', (req, res) => {
    console.log(req.query.availability)
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.send(searchResults);
})

app.get('/search/', (req, res) => {
    console.log(req.query.availability)
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.send(req.query.availability === 'true' ? searchResults.filter(r => r.availability !== 0) : searchResults);
})

app.get('/autocomplete/', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.send(autocompleteSuggestions);
})


app.listen(3080, () => {})