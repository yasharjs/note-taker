const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// parse incoming string or array
app.use(express.urlencoded({extended: true}));
// parse incoming json data
app.use(express.json());
// access to the public files
app.use(express.static('public'));
// connect the routes 
app.use('/api',apiRoutes);
app.use('/',htmlRoutes);


app.listen(PORT, () =>{
    console.log("API server now on port ",PORT);
})