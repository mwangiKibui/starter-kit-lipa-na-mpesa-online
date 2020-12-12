const express = require('express');

const app = express();

//app configurations
app.use(express.json());

app.use(express.urlencoded({extended:false}));


const PORT = process.env.PORT || 5000;

//listening to a port.

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
});