const ws = new require('ws');
const PORT = process.env.PORT || 80;
const wss = new WebSocket.Server({ port: PORT });

const gamers = new Set();

http.createServer((req, res) => {
	wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
});

//функция полидайс
function polydice(dice,diceNumber){
	let rolls='';
	for(let i = 1; i <= diceNumber; i++){
		rolls = rolls + '|' + Math.round(Math.random() * (dice - 1) + 1);
	}	
	return rolls;
}

function onSocketConnect(ws) {
  gamers.add(ws);
  ws.on('message', function(message) {
	//message состоит из запрашиваемой функции, айди игры, имени игрока, типа кубика, кол-ва бросков
	//например: dice|23452|Icy|20|2
	let answer;
	//answer возвращает исходное сообщение, добавляя к нему результаты бросков через '|'
	//например: dice|23452|Icy|20|2|15|18
	let messageArr = message.split('|');
	if (messageArr[0] == 'dice'){
		answer = message + polydice(messageArr[3],messageArr[4]);			
	}
		
    for(let gamer of gamers) {
		gamer.send(answer);
    }
  });

  ws.on('close', function() {
    gamers.delete(ws);
  });
}
	
/*wss.on('connection', ws => {
	ws.on('message', message => {
		console.log(`Received message => ${message}`);
		//message состоит из запрашиваемой функции, айди игры, имени игрока, типа кубика, кол-ва бросков
		//например: dice|23452|Icy|20|2
		let answer;
		//answer возвращает исходное сообщение, добавляя к нему результаты бросков через '|'
		//например: dice|23452|Icy|20|2|15|18
		let messageArr = message.split('|'); 
		
		if (messageArr[0] == 'dice'){
			answer = message + polydice(messageArr[3],messageArr[4]);
			ws.send(answer);
		}
	})
	ws.send('server_awakened');
})*/