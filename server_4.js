const WebSocket = require('ws');
const PORT = process.env.PORT || 80;
const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message => ${message}`);
	//message состоит из айди игры, имени игрока, типа кубика, кол-ва бросков
	//например: 23452|Icy|20|1
	let answer = message;
	let messageArr = message.split('|'); 
	let randInt;
	for(let i = 1; i <= messageArr[3]; i++){
		randInt = Math.round(Math.random() * (messageArr[2] - 1) + 1);
		answer = answer + '|' + randInt;
	}
	
	//ws.send(messageArr[1] + ', you got ' + randInt + ' on d' + messageArr[2] ); //FOR TEST
	ws.send(answer);
  })
  ws.send('server_awakened');
})