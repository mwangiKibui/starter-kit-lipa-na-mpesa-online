const express = require('express');
require('dotenv').config();

const app = express();

//app configurations
app.use(express.json());

app.use(express.urlencoded({extended:false}));


const PORT = process.env.PORT || process.env.APP_PORT;

//listening to a port.

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
});