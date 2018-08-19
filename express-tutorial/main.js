var express = require('express');
var app = express();

var user = require('./routes/user');

/*
    Middleware
*/


var myLogger = function(req, res, next) {
    console.log(req.url);
    next();
}

app.use(myLogger);

/*
    app. METHOD(PATH, HANDLER)

    METHOD: HTTP 요청 메소드 (GET, POST, DELETE, PUT)
    PATH: 라우트 경로
    HANDLER: 실행 될 콜백 함수
*/

app.get('/', function(req, res){
    res.send('Hello World');
});

// Example:

// app.get('/user/:id', function(req, res){
//     res.send('Received a GET request, param:' + req.params.id);
// });

// app.post('/user', function(req, res){
//     res.json({ success: true });
// });

// app.put('/user', function(req, res){
//     res.status(400).json({ message: 'Hey, you. Bad Request!' });
// });

// app.delete('/user', function(req, res){
//     res.send('Received a DELETE request');
// });

app.use('/user', user);

app.listen(3000, function() {
    console.log('Example App is listening on port 3000');
});