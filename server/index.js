const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
app.use(cors());
app.use(express.json());
const port = process.env.PORT;
const auth = require('./middleware/auth.js');
const userRoute = require('./Routes/UserRoute');


app.use('/user',auth, userRoute);

app.get('/studio', auth, (req, res) => {
  res.send('Studio route');
});

app.get('/photographer', auth, (req, res) => {
  res.send('Photographer route');
});

app.get('/', (req, res) => {
  res.send('Home route');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))