const express = require('express')
const app = express()
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/rider/image', express.static('./images'))
app.use('/api/customer/',require('./src/routes/routes'))
const PORT = process.env.PORT || 3009;

app.listen(PORT,()=>{
    console.log(`Run!!! ${PORT}`);
})