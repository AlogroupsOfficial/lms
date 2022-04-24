const express = require('express');
const app = express();
const morgan = require('morgan');
const {readdirSync} = require('fs');
const {error_handler} = require("./middlewares/error_handler");

require('dotenv').config();
app.use(express.json());
app.use(morgan('dev'));
const port = process.env.server_port || 8000


readdirSync('./routes').map((r)=>app.use("/api",require(`./routes/${r}`)));
app.use(error_handler);

app.listen(port, (req,res)=>{
    console.log(`Server is runing on http://localhost:${port}`)
})

