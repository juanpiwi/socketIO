var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var nicks = [];

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket) {

	socket.on("nick", function(nick) {
		
		nicks.push(nick);
		//socket.emit("nicks", nicks);

		socket.on('chat message', function(msg) {			
			socket.emit('chat message',nick,msg)
		});

		/*socket.on("disconnect", function() {
			nicks.splice(nicks.indexOf(nick), 1);
			socket.emit("nicks", nicks);
		})*/

	});



});

http.listen(3000, function() {
	console.log('listening on *:3000');
});