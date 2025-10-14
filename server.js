//copied the server.js file from the node-backend-simple-json project and added/removed
//also worked on the logic behind this with Shawn and others
const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer(function(req, res) {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }//shawn gave me and others tips to use split, reverse, and join, i used stackoverflow to figure out how to put it all together
  else if (page == '/api') {
    const userWord = params['check']

    if(userWord){
        const neutralize = userWord.toLowerCase()
        const paliChecker = neutralize.split('').reverse().join('') 
        const isPalindrome = neutralize === paliChecker

        const outcomes = {
            true: 'is',
            false: 'is not'
        }
        const outcome = outcomes[isPalindrome]
        res.writeHead(200, {'Content-Type': 'application/json'})
        const objToJson = { userWord, outcome}
        res.end(JSON.stringify(objToJson))
    }else {
        res.writeHead(400, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({error: 'No word provided'}))
    }

  }else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/css'}) //there was no writehead for the css so i added one?
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
