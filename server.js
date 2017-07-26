var express = require('express');
var morgan = require('morgan');
var path = require('path');
var http = require('http');

var app = express();
app.use(morgan('combined'));

var posts = '';
var users = '';


var urls = ['http://jsonplaceholder.typicode.com/posts', 'http://jsonplaceholder.typicode.com/users'];
var completed_requests = 0;
var response= {
           posts: posts,
            users: users
        };
urls.forEach(function(url) {
  var body = '';
  http.get(url, function(res) {
    res.on('data', function(chunk){
      body+= chunk;      
    });

    res.on('end', function(){
        if(url == 'http://jsonplaceholder.typicode.com/posts')
      {
         posts = JSON.parse(body);
      }
      else{
          users = JSON.parse(body);
      }
      if (completed_requests++ == urls.length - 1) {
        // To check whether all requests are completed
        response.posts =posts;
        response.users = users;
        console.log(completed_requests);
      }      
    });
  });
})

// Getting the initial page
app.get('/userPostData' , function(req, res){
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
  });
 app.get('/userPosts' , function(req, res){
      res.send(JSON.stringify(response));
  });
  
  // Loading style sheets and js files

 app.get('/src/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'src', 'style.css'));
});

app.get('/src/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'src', 'main.js'));
});

var port = 8080; // Use 8080 for local development 
app.listen(8080, function () {
  console.log(`User post app is listening on port ${port}!`);
});
