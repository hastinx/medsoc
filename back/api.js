const express = require('express');
const cors = require('cors');
const db = require('./config/db.js')
const path = require('path')
const router = require('./router');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors())

db.connect((err) => {
    if (err) {
        console.log('Database not connected')
    } else {
        console.log('--------------------------------------------')
        console.log('MySQL Connected')
        console.log('--------------------------------------------')
    }
})


for (let routes of router.routes) {
    app.use('/api', routes)
}

app.listen(process.env.PORT, () => console.log(`Miracle on port ${process.env.PORT}`))