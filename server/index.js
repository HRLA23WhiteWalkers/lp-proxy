const express = require ('express');
const path = require('path');
const parser = require('body-parser');
const helmet = require('helmet');
const request = require('request');

const proxy = express();
const port = 9000;

proxy.use(helmet());
proxy.use(parser.json());
proxy.use(parser.urlencoded({extended: true}));
proxy.use(express.static(path.join(__dirname, '../')));

proxy.use('/api/rooms/1', (req, res) => {
  request('http://ec2-54-67-115-216.us-west-1.compute.amazonaws.com:9000/api/rooms/1', (error, response, body) => {
    if(response.statusCode === 200) {
      res.status(200).send(body);
    }
  })
})
// proxy.use('/api/pageDetails/data', (req, res) => {
//   request('http://localhost:3018/api/pageDetails/data', (error, response, body) => {
//     if(response.statusCode === 200) {
//       res.status(200).send(body);
//     }
//   })
// })
// proxy.use('/api/amenities', (req, res) => {
//   request('http://localhost:3012/api/amenities', (error, response, body) => {
//     if(response.statusCode === 200) {
//       res.status(200).send(body);
//     }
//   })
// })

proxy.listen(port, () => console.log('Connected on port ' + port + ' ^____^b'));