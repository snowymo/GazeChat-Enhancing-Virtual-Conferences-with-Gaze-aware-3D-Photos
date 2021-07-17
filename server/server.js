const fs = require('fs');
const http = require('http');
const https = require('https');
const WebSocket = require('ws');
// const yargs = require('yargs');
// based on examples at https://www.npmjs.com/package/ws 
const WebSocketServer = WebSocket.Server;

// tcp client
var net = require('net');

var client = new net.Socket();
client.connect(24293, '192.168.1.240', function () {
  console.log('Connected');
  client.write('Hello, server! Love, Client.');
});

client.on('data', function (data) {
  // console.log('Received: ' + data);
  if (wss) {
    var chunk = "";
    chunk += data.toString();
    var gazeData = chunk.split(' ');
    wss.broadcast(JSON.stringify({
      "x": gazeData[0], "y": gazeData[1],
      'uuid': 'server', 'dest': 'all',
      'tobii': true
    }));
  }
  //client.destroy(); // kill client after server's response
});

client.on('error', function () {
  console.log("connection error");
});

client.on('close', function () {
  console.log('Connection closed');
});


var env = "remote";
var port = 8600;
var vizOptions = {
  8444: "none", 8445: "frame", 8446: "webgl", 8447: "none",
  8600: "none", 8601: "profile", 8602: "photo3d",
}
var viz = vizOptions[8600];
var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);
myArgs.forEach((arg, index) => {
  if (arg.includes("-")) {
    var command = arg.substr(1);
    switch (command) {
      case 'env':
        env = myArgs[index + 1];
        console.log("update env with " + env)
        break;
      case 'p':
        port = myArgs[index + 1];
        viz = vizOptions[port];
        console.log("update port with " + port + "\t" + viz)
        break;
      case 'v':
        // manually specify viz
        viz = myArgs[index + 1];
        console.log("update viz with " + viz)
        break;
      default:
        break;
    }
  }
});


// Yes, TLS is required
const serverConfig = env == "local" ?
  {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
  } : {
    key: fs.readFileSync('/www/server/panel/vhost/cert/eye.3dvar.com/privkey.pem'),
    cert: fs.readFileSync('/www/server/panel/vhost/cert/eye.3dvar.com/fullchain.pem'),
  };

// ----------------------------------------------------------------------------------------

// Create a server for the client html page
const handleRequest = function (request, response) {
  // Render the single client html file for any request the HTTP server receives
  // console.log('request received: ' + request.url);

  if (request.url === '/webrtc.js') {
    response.writeHead(200, { 'Content-Type': 'application/javascript' });
    response.end(fs.readFileSync('client/webrtc.js'));
  }
  else if (request.url === '/fonts/helvetiker_regular.typeface.json') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(fs.readFileSync('client/fonts/helvetiker_regular.typeface.json'));
  }
  else if (request.url === '/style.css') {
    response.writeHead(200, { 'Content-Type': 'text/css' });
    response.end(fs.readFileSync('client/style.css'));
  } else if (request.url === '/main.js') {
    response.writeHead(200, { 'Content-Type': 'application/javascript' });
    response.end(fs.readFileSync('client/main.js'));
  }
  else if (request.url.endsWith('.png')) {
    // console.log("\tdebug:" + 'client\t' + request.url);
    response.writeHead(200, { 'Content-Type': 'image/png' });
    response.end(fs.readFileSync('client/resources' + request.url));
  } else if (request.url.endsWith('.jpg')) {
    // console.log("\tdebug:" + 'client\t' + request.url);
    response.writeHead(200, { 'Content-Type': 'image/jpeg' });
    response.end(fs.readFileSync('client/resources' + request.url));
  } else if (request.url.endsWith('.gif')) {
    response.writeHead(200, { 'Content-Type': 'image/gif' });
    // console.log("\tdebug:" + 'client' + request.url);
    response.end(fs.readFileSync('client/resources' + request.url));
    // content = get-image-file-contents;     //store image into content
    // imagedata = new Buffer(content).toString('base64');    //encode to base64
    // response.write('<img src="data:image/gif;base64,'+imagedata+'">');//send image
    // response.end();
  }
  else if (request.url.endsWith(".fbx")) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    // console.log("\tdebug:" + 'client' + request.url);
    response.end(fs.readFileSync('client/resources' + request.url));
  } else if (request.url.endsWith(".js")) {
    response.writeHead(200, { 'Content-Type': 'application/javascript' });
    if (request.url.includes("../")) {
      // console.log("debug:" + request.url.replace('../', ''));
      response.end(fs.readFileSync(request.url.replace('../', '')));
    } else {
      // console.log("\tdebug:" + 'client' + request.url);
      response.end(fs.readFileSync('client' + request.url));
    }
  } else if (request.url.endsWith(".map")) {
    response.writeHead(200, { 'Content-Type': 'application/javascript' });
    if (request.url.includes("../")) {
      // console.log("debug:" + request.url.replace('../', ''));
      response.end(fs.readFileSync(request.url.replace('../', '')));
    } else {
      // console.log("\tdebug:" + 'client' + request.url);
      response.end(fs.readFileSync('client' + request.url));
    }
  }
  else {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(fs.readFileSync('client/index.html'));
  }
};

var HTTPS_PORT = port; //default port for https is 443
var HTTP_PORT = HTTPS_PORT - 442; //default port for http is 80
const httpsServer = https.createServer(serverConfig, handleRequest);
httpsServer.listen(HTTPS_PORT);
// console.log("httpsServer:", httpsServer);
// ----------------------------------------------------------------------------------------

// Create a server for handling websocket calls
const wss =
  // argv.env == "local" ? new WebSocketServer({ port: 3448 }) : 
  new WebSocketServer({ server: httpsServer });
// console.log("wss:" + wss.options.host + "-" + wss.options.path + ":" + wss.options.port);

wss.on('connection', function (ws) {
  // specify host addr
  wss.broadcast(JSON.stringify({ 'viz': viz, 'uuid': 'server', 'dest': 'all' }));

  ws.on('message', function (message) {
    // Broadcast any received message to all clients
    // var signal = JSON.parse(message);
    // var type = signal.displayName ? signal.displayName : "";
    // console.log('received: src:%s\t dest:%s\t type:%s', signal.uuid, signal.dest, type);
    // console.log('received::%s', message);
    // if(type != "host")
    wss.broadcast(message);
  });

  ws.on('error', () => ws.terminate());
});

wss.broadcast = function (data) {
  this.clients.forEach(function (client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

console.log('Server running with port ' + HTTPS_PORT);

// ----------------------------------------------------------------------------------------

// Separate server to redirect from http to https
http.createServer(function (req, res) {
  console.log(req.headers['host'] + req.url);
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  res.end();
}).listen(HTTP_PORT);