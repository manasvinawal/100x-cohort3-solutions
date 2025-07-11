// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only 5 request per second
// If a user sends more than 5 requests in a single second, the server
// should block them with a 404.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second

const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();

const limiter = rateLimit({
    windowMs : 1000,
    max : 5,
    message : "Rate limit exceeded",
    statusCode: 202,
    keyGenerator: (req) => {
        return req.headers['user-id']
    },
});

app.use(limiter);
app.get('/user', function(req, res) {
  res.status(200).json({ name: 'manasvi' });
});

app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

app.listen(3000, () => console.log('Server running on port 3000'));