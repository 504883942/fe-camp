var http = require('http')
var parseUrl = require('parseurl')
var send = require('send')

var serv = function(req, res) {
  var path = parseUrl(req).pathname;
  send(req, path, {
    root: '.'
  }).pipe(res)
};
var port = process.env.PORT || 1337;
var app = http.createServer(function onRequest (req, res) {
  var path = parseUrl(req).pathname;
  if (path == '/echo') {
    var body = '';
    req.on('data', data => body += data);
    req.on('end', function() {
      res.write(`
<!doctype html>
<pre style="font-size:28px">
  ${req.method} ${req.url}
  ${body}
</pre>
      `);
      res.end();
    });
  } else {
    serv(req, res);
  }

}).listen(port)

console.log('Server started at  http://localhost:'+port)

