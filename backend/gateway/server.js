const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/chat', proxy('http://localhost:8001'));
app.use('/customer', proxy('http://localhost:8002'));
app.use('/employee', proxy('http://localhost:8003'));
app.use('/machine', proxy('http://localhost:8004'));
app.use('/notification', proxy('http://localhost:8005'));
app.use('/supportcase', proxy('http://localhost:8006'));

app.listen(8000, (error) => {
    (error) ? console.log('Error from app.listen', error) : console.log(`Server is running on port: 8000`);
});