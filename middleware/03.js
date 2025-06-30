//log incoming requests
const express = require('express');
const app = express();

function logRequests(req, res, next){
      const log = `${req.method} ${req.url} - ${new Date().toISOString()}`;
    console.log(log);
    next();
}
app.use(logRequests);
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello, world!' });
});

app.listen(3001, () => {
    console.log("Server is running");
});