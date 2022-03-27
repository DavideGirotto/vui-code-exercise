import express from 'express';
import searchResults from './datasets/searchResults.json'

const app = express();

app.get('/search_query/', (req, res) => {
    res.send(searchResults);
})

app.listen(3080, () => {})