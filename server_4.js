const WebSocket = require('ws');
const PORT = process.env.PORT || 80;
const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message => ${message}`);
	ws.send('I got ' + message);
  })
  ws.send('ho!')
})